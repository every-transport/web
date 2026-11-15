'use strict';
/*
  Server online untuk Dashboard Rental & Charter.
  - Menyimpan data jadwal dan keuangan di satu file JSON (tanpa database, tanpa dependensi).
  - Mencadangkan otomatis: satu salinan per jam, 200 salinan terakhir disimpan.
  - Melayani admin.html dan sw.js dari folder public/.
  - Akses API dilindungi kunci akses (ACCESS_KEY).
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const DATA_FILE = path.join(DATA_DIR, 'data.json');
const KEY_FILE = path.join(DATA_DIR, 'access-key.txt');
const PUBLIC_DIR = path.join(__dirname, 'public');
const ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const KEEP = parseInt(process.env.BACKUP_KEEP, 10) || 200;
const MAX_BODY = 30 * 1024 * 1024;

fs.mkdirSync(BACKUP_DIR, { recursive: true });

/* ---------- Kunci akses ---------- */
let ACCESS_KEY = (process.env.ACCESS_KEY || '').trim();
if (!ACCESS_KEY) {
  try { ACCESS_KEY = fs.readFileSync(KEY_FILE, 'utf8').trim(); } catch (e) {}
  if (!ACCESS_KEY) {
    ACCESS_KEY = crypto.randomBytes(9).toString('base64url');
    fs.writeFileSync(KEY_FILE, ACCESS_KEY + '\n', { mode: 0o600 });
  }
}

/* ---------- Data ---------- */
let state = { version: 0, updatedAt: null, data: null };
try {
  const s = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  if (s && typeof s.version === 'number') state = s;
} catch (e) {}

function stamp(d) {
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours());
}
function backupCurrent() {
  if (!fs.existsSync(DATA_FILE)) return;
  const f = path.join(BACKUP_DIR, 'data-' + stamp(new Date()) + '.json');
  if (!fs.existsSync(f)) fs.copyFileSync(DATA_FILE, f);
  const all = fs.readdirSync(BACKUP_DIR).filter(n => /^data-.*\.json$/.test(n)).sort();
  all.slice(0, Math.max(0, all.length - KEEP)).forEach(n => { try { fs.unlinkSync(path.join(BACKUP_DIR, n)); } catch (e) {} });
}
function persist() {
  backupCurrent();
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state));
  fs.renameSync(tmp, DATA_FILE);
}

/* ---------- Pembatas percobaan kunci salah ---------- */
const fails = new Map();
const ipOf = req => String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
function blocked(ip) {
  const f = fails.get(ip);
  return !!(f && f.n >= 10 && Date.now() - f.t < 15 * 60 * 1000);
}
function noteFail(ip) {
  const f = fails.get(ip);
  if (!f || Date.now() - f.t > 15 * 60 * 1000) fails.set(ip, { n: 1, t: Date.now() });
  else { f.n++; f.t = Date.now(); }
}
function authorized(req) {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!m) return false;
  const a = Buffer.from(m[1]), b = Buffer.from(ACCESS_KEY);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/* ---------- Util ---------- */
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '86400');
}
function json(res, code, obj) {
  const s = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(s);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('too large'), { code: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8'
};
function serveStatic(req, res, pathname) {
  if (pathname === '/') { res.writeHead(302, { Location: '/admin.html' }); return res.end(); }
  let file;
  try { file = path.normalize(path.join(PUBLIC_DIR, decodeURIComponent(pathname))); } catch (e) { res.writeHead(400); return res.end(); }
  if (!file.startsWith(PUBLIC_DIR + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Tidak ditemukan'); }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': (ext === '.html' || path.basename(file) === 'sw.js') ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(buf);
  });
}

/* ---------- Server ---------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  try {
    if (p.startsWith('/api/')) {
      cors(res);
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
      if (p === '/api/ping') return json(res, 200, { ok: true, app: 'rental-sync' });

      const ip = ipOf(req);
      if (blocked(ip)) return json(res, 429, { error: 'Terlalu banyak percobaan. Coba lagi 15 menit lagi.' });
      if (!authorized(req)) { noteFail(ip); return json(res, 401, { error: 'Kunci akses salah.' }); }

      if (p === '/api/data' && req.method === 'GET') {
        const since = parseInt(url.searchParams.get('since'), 10);
        if (state.data != null && since === state.version) return json(res, 200, { changed: false, version: state.version });
        return json(res, 200, { changed: true, version: state.version, updatedAt: state.updatedAt, data: state.data });
      }
      if (p === '/api/data' && req.method === 'PUT') {
        let body;
        try { body = JSON.parse(await readBody(req)); } catch (e) { return json(res, e.code === 413 ? 413 : 400, { error: 'Data tidak valid atau terlalu besar.' }); }
        const d = body && body.data;
        if (!d || typeof d !== 'object' || !Array.isArray(d.bookings) || !Array.isArray(d.vehicles)) return json(res, 400, { error: 'Format data tidak dikenali.' });
        if (body.baseVersion !== state.version) return json(res, 409, { error: 'Data di server lebih baru.', version: state.version, updatedAt: state.updatedAt, data: state.data });
        state = { version: state.version + 1, updatedAt: new Date().toISOString(), data: d };
        persist();
        return json(res, 200, { ok: true, version: state.version, updatedAt: state.updatedAt });
      }
      if (p === '/api/export' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': 'attachment; filename="cadangan-rental.json"', 'Cache-Control': 'no-store' });
        return res.end(JSON.stringify(state.data || {}));
      }
      return json(res, 404, { error: 'Tidak ditemukan.' });
    }
    if (p === '/healthz') { res.writeHead(200); return res.end('ok'); }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
    serveStatic(req, res, p);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) json(res, 500, { error: 'Kesalahan server.' }); else res.end();
  }
});

server.listen(PORT, () => {
  console.log('Server berjalan di port ' + PORT);
  console.log('Data      : ' + DATA_FILE);
  console.log('Cadangan  : ' + BACKUP_DIR);
  console.log('Kunci akses: ' + ACCESS_KEY + (process.env.ACCESS_KEY ? '  (dari ACCESS_KEY)' : '  (disimpan di ' + KEY_FILE + ')'));
});
