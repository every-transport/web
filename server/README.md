# Server online Dashboard Rental & Charter

Server kecil (Node.js, tanpa dependensi) yang:

- menyimpan data jadwal dan keuangan di server, jadi bisa dibuka dari HP atau komputer mana pun;
- mencadangkan otomatis (satu salinan per jam, 200 salinan terakhir) di folder `data/backups/`;
- melayani `admin.html` dan `sw.js` dari folder `public/`.

Akses dilindungi **kunci akses**. Siapa pun yang punya alamat server dan kunci aksesnya bisa membuka dan mengubah data, jadi bagikan kuncinya hanya ke orang yang dipercaya.

## Isi folder

```
server.js        server (jalankan dengan: node server.js)
package.json
public/
  admin.html     halaman dashboard (sudah terhubung ke server)
  sw.js          untuk notifikasi Android
data/            dibuat otomatis: data.json, backups/, access-key.txt
```

## Menjalankan

Butuh Node.js 18 atau lebih baru.

```
ACCESS_KEY="kunci-rahasia-anda" node server.js
```

Tanpa `ACCESS_KEY`, server membuat kunci acak, mencetaknya di layar, dan menyimpannya di `data/access-key.txt`.

Pengaturan lain (opsional, lewat environment variable):

| Variabel | Fungsi | Bawaan |
|---|---|---|
| `PORT` | port server | 3000 |
| `ACCESS_KEY` | kunci akses | acak |
| `DATA_DIR` | lokasi data dan cadangan | `./data` |
| `ALLOWED_ORIGIN` | domain yang boleh memanggil API dari situs lain | `*` |
| `BACKUP_KEEP` | jumlah salinan cadangan | 200 |

## Membuatnya online

Server harus memakai **https**, karena notifikasi Android dan service worker hanya jalan di https, dan halaman https tidak boleh memanggil server http.

**Opsi A, VPS (Ubuntu):**
1. Pasang Node.js 18+, salin folder ini ke server.
2. Jalankan terus dengan pm2: `ACCESS_KEY="..." pm2 start server.js --name rental`
3. Pasang Caddy atau Nginx sebagai reverse proxy ke port 3000 dengan sertifikat https otomatis (Caddy: `domain-anda.com { reverse_proxy localhost:3000 }`).
4. Arahkan domain, misalnya every-transport.my.id, ke server tersebut.

**Opsi B, layanan hosting Node (Render, Railway, Fly.io, dan sejenisnya):**
1. Unggah folder ini sebagai proyek Node (perintah start: `node server.js`).
2. Atur `ACCESS_KEY`.
3. Pasang **disk/volume persisten** dan arahkan `DATA_DIR` ke sana (misalnya `/data`). Tanpa ini, data hilang setiap server di-restart.

## Memindahkan data yang sudah tercatat

Data lama tersimpan di browser perangkat Anda. Pilih salah satu:

**Jika alamat dashboard tidak berubah** (domain yang sama diarahkan ke server ini): buka dashboard di HP/browser yang menyimpan data lama, lalu Pengaturan > Server online, isi kunci akses, tekan **Sambungkan**. Karena server masih kosong, data di perangkat itu otomatis diunggah.

**Jika alamat berubah** (browser menganggapnya situs baru, jadi datanya tidak terlihat):
- Cara 1: di dashboard lama, Pengaturan > **Unduh cadangan**. Di alamat baru, Pengaturan > **Pulihkan cadangan**, lalu **Sambungkan** ke server.
- Cara 2: ganti `admin.html` dan `sw.js` di situs lama dengan file baru, lalu di Pengaturan > Server online isi **Alamat server** (https://alamat-server-anda) dan kunci akses.

Perangkat lain tinggal membuka dashboard, memasukkan kunci akses sekali, dan data dari server langsung muncul.

## Cara kerja sinkron

- Setiap perubahan dikirim ke server sekitar satu detik setelah disimpan. Perangkat lain mengambil data terbaru tiap 30 detik dan saat aplikasi dibuka kembali.
- Bila dua perangkat mengubah data bersamaan, **yang tersimpan lebih dulu di server menang**; perangkat satunya dimuat ulang dari server dan salinan datanya disimpan otomatis di browser.
- Tanpa internet, aplikasi tetap bisa dipakai. Perubahan dikirim saat tersambung kembali.
- Salinan cadangan server ada di `data/backups/data-TAHUNBULANTANGGAL-JAM.json`. Untuk memulihkan, hentikan server, salin salah satu file cadangan menjadi `data/data.json`, lalu jalankan server lagi.
