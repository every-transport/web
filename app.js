/* ==========================================
   EVERY TRANSPORT - MAIN JS
   ========================================== */

// ===== DATA =====
let vehicles = JSON.parse(localStorage.getItem('et_vehicles')) || [
  {
    name: "Toyota Avanza",
    capacity: "7 Penumpang",
    price: "Rp 350.000 / hari",
    desc: "Kendaraan keluarga terpopuler yang nyaman untuk perjalanan wisata keluarga kecil. Cocok untuk rute dalam kota maupun antar kota.",
    features: ["AC Double Blower", "Audio System", "Bagasi Luas", "GPS Tracker", "Kursi Nyaman"],
    photo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80",
    category: "MPV"
  },
  {
    name: "Toyota Innova Reborn",
    capacity: "7 Penumpang",
    price: "Rp 450.000 / hari",
    desc: "SUV premium yang elegan dan bertenaga. Pilihan terbaik untuk perjalanan bisnis maupun wisata keluarga yang menginginkan kenyamanan ekstra.",
    features: ["AC Dual Zone", "Audio Premium", "Kursi Kulit", "GPS", "Bagasi XL", "USB Charger"],
    photo: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    category: "SUV Premium"
  },
  {
    name: "Toyota Hiace Commuter",
    capacity: "15 Penumpang",
    price: "Rp 700.000 / hari",
    desc: "Minibus tangguh untuk rombongan sedang. Ideal untuk wisata kelompok, perjalanan komunitas, dan tour group dengan konfigurasi bangku yang fleksibel.",
    features: ["Full AC", "Audio System", "Kursi Ergonomis", "Bagasi Atas", "GPS Tracker"],
    photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
    category: "Minibus"
  },
  {
    name: "Toyota Hiace Premio",
    capacity: "14 Penumpang",
    price: "Rp 850.000 / hari",
    desc: "Versi premium dari Hiace dengan interior mewah. Kursi captain seat yang lega, entertainment system canggih, dan finishing premium untuk perjalanan eksklusif.",
    features: ["Captain Seat", "AC Individual", "LCD TV", "USB Charging", "Meja Makan", "Tirai Privasi"],
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Minibus Premium"
  },
  {
    name: "Isuzu Elf",
    capacity: "12 Penumpang",
    price: "Rp 600.000 / hari",
    desc: "Minibus bertenaga diesel yang irit dan handal untuk berbagai medan. Cocok untuk wisata pegunungan seperti Bromo, Lawu, dan destinasi lainnya.",
    features: ["AC Dingin", "Audio Bluetooth", "Mesin Diesel", "Tanki Besar", "Suspensi Kuat"],
    photo: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
    category: "Minibus"
  },
  {
    name: "Big Bus Pariwisata",
    capacity: "45-50 Penumpang",
    price: "Rp 3.500.000 / hari",
    desc: "Bus besar berkapasitas penuh untuk rombongan besar. Dilengkapi toilet, karaoke, dan fasilitas lengkap untuk perjalanan jauh yang nyaman dan menyenangkan.",
    features: ["Toilet Onboard", "Karaoke System", "Full AC", "Reclining Seat", "TV LCD", "Kulkas Mini", "Bagasi Besar"],
    photo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    category: "Bus Besar"
  },
  {
    name: "Medium Bus",
    capacity: "25-30 Penumpang",
    price: "Rp 1.800.000 / hari",
    desc: "Bus menengah yang ideal untuk rombongan keluarga besar, arisan, atau tour group. Konfigurasi kursi nyaman dengan lorong yang lega.",
    features: ["Full AC", "Audio System", "Reclining Seat", "Bagasi Besar", "GPS Tracker", "USB Charging"],
    photo: "https://images.unsplash.com/photo-1522159698025-071104a1ddbd?w=600&q=80",
    category: "Bus Menengah"
  }
];

const wisataData = [
  {
    name: "Gunung Bromo",
    location: "Probolinggo, Jawa Timur",
    province: "jatim",
    type: "alam",
    desc: "Ikon wisata Jawa Timur yang memukau. Kawah aktif dengan lautan pasir dan pemandangan matahari terbit yang legendaris. Spot foto terbaik di Puncak Penanjakan.",
    img: "https://images.unsplash.com/photo-1542618138-cebe8e06f7ba?w=600&q=80",
    details: {
      "Lokasi": "Kab. Probolinggo, Pasuruan, Lumajang",
      "Ketinggian": "2.329 mdpl",
      "Waktu Terbaik": "Apr - Nov",
      "Jarak dari Magetan": "~200 km"
    }
  },
  {
    name: "Kawah Ijen",
    location: "Banyuwangi, Jawa Timur",
    province: "jatim",
    type: "alam",
    desc: "Danau kawah sulfur terbesar di dunia dengan api biru (blue fire) yang hanya ada dua di dunia. Fenomena alam langka yang wajib dikunjungi.",
    img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80",
    details: {
      "Lokasi": "Banyuwangi & Bondowoso",
      "Ketinggian": "2.386 mdpl",
      "Blue Fire": "Tengah Malam - Subuh",
      "Jarak dari Magetan": "~330 km"
    }
  },
  {
    name: "Makam Sunan Giri",
    location: "Gresik, Jawa Timur",
    province: "jatim",
    type: "religi",
    desc: "Makam salah satu Wali Songo yang berjasa menyebarkan Islam di Nusantara. Destinasi ziarah utama di Jawa Timur yang selalu ramai dikunjungi peziarah.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    details: {
      "Lokasi": "Gresik, Jawa Timur",
      "Buka": "24 Jam",
      "Masuk": "Gratis",
      "Jarak dari Magetan": "~180 km"
    }
  },
  {
    name: "Taman Nasional Baluran",
    location: "Situbondo, Jawa Timur",
    province: "jatim",
    type: "alam",
    desc: 'Dijuluki "Afrika kecil van Java" karena savana luas dengan padang rumput kering dan satwa liar seperti banteng, merak, dan rusa yang berkeliaran bebas.',
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
    details: {
      "Lokasi": "Situbondo, Jawa Timur",
      "Area": "25.000 Hektar",
      "Satwa": "Banteng, Merak, Rusa",
      "Jarak dari Magetan": "~280 km"
    }
  },
  {
    name: "Masjid Agung Demak",
    location: "Demak, Jawa Tengah",
    province: "jateng",
    type: "religi",
    desc: "Masjid tertua di Indonesia yang dibangun oleh Wali Songo. Landmark bersejarah Islam di Jawa dengan arsitektur Jawa-Islam yang khas dan sarat nilai sejarah.",
    img: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
    details: {
      "Lokasi": "Demak, Jawa Tengah",
      "Dibangun": "1474 M",
      "Buka": "24 Jam",
      "Jarak dari Magetan": "~170 km"
    }
  },
  {
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    province: "jateng",
    type: "alam",
    desc: "Candi Buddha terbesar di dunia, Warisan Budaya UNESCO, dan keajaiban arsitektur kuno yang memukau. Dikelilingi perbukitan hijau dan pemandangan alam yang spektakuler.",
    img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
    details: {
      "Lokasi": "Magelang, Jawa Tengah",
      "Dibangun": "±800 M",
      "UNESCO": "World Heritage",
      "Jarak dari Magetan": "~200 km"
    }
  },
  {
    name: "Dieng Plateau",
    location: "Wonosobo, Jawa Tengah",
    province: "jateng",
    type: "alam",
    desc: "Dataran tinggi mistis dengan kawah belerang berwarna-warni, candi Hindu tertua di Jawa, dan fenomena embun upas (embun beku) yang unik setiap musim kemarau.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    details: {
      "Lokasi": "Wonosobo & Banjarnegara",
      "Ketinggian": "~2.000 mdpl",
      "Suhu": "10-15°C",
      "Jarak dari Magetan": "~215 km"
    }
  },
  {
    name: "Makam Sunan Kudus",
    location: "Kudus, Jawa Tengah",
    province: "jateng",
    type: "religi",
    desc: "Kompleks makam Sunan Kudus dengan menara Kudus yang ikonik, perpaduan arsitektur Islam dan Hindu yang unik. Salah satu dari sembilan makam Wali Songo.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
    details: {
      "Lokasi": "Kudus, Jawa Tengah",
      "Buka": "24 Jam",
      "Masuk": "Gratis",
      "Jarak dari Magetan": "~185 km"
    }
  },
  {
    name: "Kawah Putih",
    location: "Bandung, Jawa Barat",
    province: "jabar",
    type: "alam",
    desc: "Danau kawah eksotis berwarna toska-putih di ketinggian 2.430 mdpl. Dikelilingi kabut tipis dan pemandangan yang sangat fotogenik dengan suhu dingin yang menyegarkan.",
    img: "https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?w=600&q=80",
    details: {
      "Lokasi": "Ciwidey, Bandung Selatan",
      "Ketinggian": "2.430 mdpl",
      "Suhu": "8-22°C",
      "Jarak dari Magetan": "~450 km"
    }
  },
  {
    name: "Pantai Pangandaran",
    location: "Ciamis, Jawa Barat",
    province: "jabar",
    type: "alam",
    desc: "Pantai terbaik di Jawa Barat dengan pasir bersih, ombak sedang, dan Green Canyon yang memukau. Cocok untuk keluarga dengan fasilitas lengkap dan pemandangan sunset yang indah.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    details: {
      "Lokasi": "Pangandaran, Jawa Barat",
      "Aktivitas": "Surfing, Snorkeling",
      "Waktu Terbaik": "Apr - Sep",
      "Jarak dari Magetan": "~480 km"
    }
  },
  {
    name: "Masjid Agung Bandung",
    location: "Bandung, Jawa Barat",
    province: "jabar",
    type: "religi",
    desc: "Masjid megah di jantung kota Bandung bersebelahan dengan Alun-alun Kota. Arsitektur modern dengan menara kembar yang menjadi landmark ikonik kota Kembang.",
    img: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80",
    details: {
      "Lokasi": "Alun-alun Bandung",
      "Buka": "24 Jam",
      "Kapasitas": "15.000 Jamaah",
      "Jarak dari Magetan": "~440 km"
    }
  },
  {
    name: "Gunung Lawu",
    location: "Magetan, Jawa Timur",
    province: "jatim",
    type: "alam",
    desc: "Gunung suci di perbatasan Jawa Timur-Tengah dengan jalur pendakian via Cemoro Sewu (Magetan). Tersedia spot glamping, telaga Sarangan di kaki gunung yang indah.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    details: {
      "Lokasi": "Magetan & Karanganyar",
      "Ketinggian": "3.265 mdpl",
      "Base Camp": "Cemoro Sewu, Magetan",
      "Jarak dari Magetan": "~20 km"
    }
  }
];

const testimonials = [
  { name: "Budi Santoso", trip: "Wisata Bromo 3 Hari", text: "Pelayanan luar biasa! Driver ramah, kendaraan bersih dan nyaman. Perjalanan ke Bromo jadi sangat berkesan. Sudah 3x booking dan selalu puas!", stars: 5 },
  { name: "Siti Rahmawati", trip: "Ziarah Wali Songo", text: "Every Transport menjadi pilihan utama keluarga kami untuk ziarah. Bus bersih, tepat waktu, dan sopir hafal semua rute. Amanah dan profesional!", stars: 5 },
  { name: "Hendro Prasetyo", trip: "Tour Borobudur-Prambanan", text: "Pertama kali sewa bus di sini untuk reuni kantor 40 orang. Fasilitasnya lengkap, ada karaoke dan toilet. Perjalanan jadi sangat seru dan nyaman!", stars: 5 },
  { name: "Dewi Kurnia", trip: "Wisata Kawah Ijen", text: "Booking Innova untuk 6 orang ke Ijen. Driver sangat membantu dan tau spot foto terbaik. Harga juga transparan, tidak ada biaya tambahan. Highly recommended!", stars: 5 },
  { name: "Ahmad Fauzi", trip: "Dieng Plateau Trip", text: "Pesan Hiace Premio untuk keluarga besar 12 orang. Kursi captain seat-nya super nyaman! Perjalanan ke Dieng jadi sangat mewah. Terima kasih Every Transport!", stars: 5 },
  { name: "Rina Listiani", trip: "Bandung 4D3N", text: "Sewa Big Bus untuk arisan RT kami, 42 orang. Fasilitasnya WOW! Karaoke, AC dingin, dan sopir yang sabar. Bikin trip bareng jadi makin seru!", stars: 5 },
  { name: "Dimas Arif", trip: "Wisata Keluarga Bali", text: "Family trip ke Bali pakai Innova Reborn. Mobilnya kinclong dan bensin full. Driver sangat profesional dan hafal jalan. Pasti balik lagi!", stars: 5 },
  { name: "Yuliana Wati", trip: "Wisata Religi Jatim", text: "Every Transport pilihan terbaik untuk ziarah keluarga. Tepat waktu, kendaraan nyaman, harga fair. Sudah 5x pakai jasa ini dan tidak pernah kecewa!", stars: 5 }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticles();
  initNavbar();
  renderArmada();
  renderWisata();
  renderTestimonials();
  initStats();
  initScrollReveal();
  populateBookingSelect();
  initWisataFilter();
  initAdmin();
  initBookingDate();
});

// ===== LOADER =====
function initLoader() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.setProperty('--dur', (6 + Math.random() * 8) + 's');
    p.style.setProperty('--delay', (Math.random() * 8) + 's');
    p.style.setProperty('--dx', ((Math.random() - 0.5) * 100) + 'px');
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    container.appendChild(p);
  }
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  // Smooth close on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

window.closeMenu = () => {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navMobile').classList.remove('open');
};

// ===== STATS COUNTER =====
function initStats() {
  const statNums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.count;
        let count = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) { count = target; clearInterval(timer); }
          entry.target.textContent = Math.floor(count);
        }, 25);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const targets = document.querySelectorAll('.section-header, .armada-card, .wisata-card, .why-card, .visi-box, .misi-box, .booking-left, .booking-form, .contact-item, .testi-card');
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 0.08 + 's';
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => observer.observe(el));
}

// ===== ARMADA =====
function renderArmada() {
  const grid = document.getElementById('armadaGrid');
  grid.innerHTML = vehicles.map((v, i) => `
    <div class="armada-card reveal" onclick="openArmadaModal(${i})">
      <div class="armada-img-wrap">
        <img class="armada-img" src="${v.photo}" alt="${v.name}" loading="lazy" 
          onerror="this.src='https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80'">
        <div class="armada-badge">${v.category}</div>
      </div>
      <div class="armada-body">
        <div class="armada-name">${v.name}</div>
        <div class="armada-capacity">👥 ${v.capacity}</div>
        <div class="armada-desc">${v.desc.substring(0,100)}...</div>
        <div class="armada-price">
          <span class="armada-price-val">${v.price}</span>
          <button class="armada-detail-btn">Detail →</button>
        </div>
      </div>
    </div>
  `).join('');
  initScrollReveal();
}

function openArmadaModal(index) {
  const v = vehicles[index];
  document.getElementById('modalImg').src = v.photo;
  document.getElementById('modalImg').onerror = function() { this.src = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80'; };
  document.getElementById('modalName').textContent = v.name;
  document.getElementById('modalCapacity').textContent = `👥 ${v.capacity}`;
  document.getElementById('modalDesc').textContent = v.desc;
  document.getElementById('modalPrice').textContent = v.price;
  document.getElementById('modalFeatures').innerHTML = v.features.map(f => `<span class="modal-feat-tag">${f}</span>`).join('');
  const msg = encodeURIComponent(`Halo Every Transport, saya ingin booking ${v.name} (${v.capacity}). Mohon info ketersediaan dan harga lengkapnya.`);
  document.getElementById('modalBook').href = `https://wa.me/6281234567890?text=${msg}`;
  document.getElementById('armadaModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.closeModal = () => {
  document.getElementById('armadaModal').classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('click', e => {
  if (e.target === document.getElementById('armadaModal')) closeModal();
  if (e.target === document.getElementById('wisataModal')) closeWisataModal();
});

// ===== WISATA =====
function renderWisata() {
  const grid = document.getElementById('wisataGrid');
  grid.innerHTML = wisataData.map((w, i) => `
    <div class="wisata-card reveal" data-province="${w.province}" data-type="${w.type}" onclick="openWisataModal(${i})">
      <div class="wisata-img-wrap">
        <img class="wisata-img" src="${w.img}" alt="${w.name}" loading="lazy">
        <div class="wisata-tags">
          <span class="wisata-tag">${w.province === 'jatim' ? 'Jatim' : w.province === 'jateng' ? 'Jateng' : 'Jabar'}</span>
          <span class="wisata-tag">${w.type === 'alam' ? '🏔️ Alam' : '🕌 Religi'}</span>
        </div>
      </div>
      <div class="wisata-body">
        <div class="wisata-name">${w.name}</div>
        <div class="wisata-location">📍 ${w.location}</div>
        <div class="wisata-desc">${w.desc.substring(0, 100)}...</div>
      </div>
    </div>
  `).join('');
}

function initWisataFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.wisata-card').forEach(card => {
        const match = filter === 'all' ||
          card.dataset.province === filter ||
          card.dataset.type === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeUp 0.4s ease forwards';
          });
        }
      });
    });
  });
}

function openWisataModal(index) {
  const w = wisataData[index];
  document.getElementById('wModalImg').src = w.img;
  document.getElementById('wModalName').textContent = w.name;
  document.getElementById('wModalDesc').textContent = w.desc;
  document.getElementById('wModalProvince').textContent = 
    w.province === 'jatim' ? 'Jawa Timur' : w.province === 'jateng' ? 'Jawa Tengah' : 'Jawa Barat';
  document.getElementById('wModalType').textContent = w.type === 'alam' ? '🏔️ Wisata Alam' : '🕌 Wisata Religi';
  document.getElementById('wModalDetails').innerHTML = Object.entries(w.details).map(([k, v]) => `
    <div class="modal-detail-item"><span>${k}</span><strong>${v}</strong></div>
  `).join('');
  const msg = encodeURIComponent(`Halo Every Transport, saya tertarik untuk wisata ke ${w.name} (${w.location}). Mohon info paket perjalanan dan harganya.`);
  document.getElementById('wModalBook').href = `https://wa.me/6281234567890?text=${msg}`;
  document.getElementById('wisataModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.closeWisataModal = () => {
  document.getElementById('wisataModal').classList.remove('open');
  document.body.style.overflow = '';
};

// ===== TESTIMONIALS =====
let testiIndex = 0;
let testiAuto;

function renderTestimonials() {
  const track = document.getElementById('testiTrack');
  const dots = document.getElementById('testiDots');

  track.innerHTML = testimonials.map(t => `
    <div class="testi-card">
      <div class="testi-quote">"</div>
      <div class="testi-text">${t.text}</div>
      <div class="testi-footer">
        <div class="testi-avatar">${t.name[0]}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-trip">${t.trip}</div>
        </div>
        <div class="testi-stars" style="margin-left:auto">${'★'.repeat(t.stars)}</div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = testimonials.map((_, i) => `
    <button class="testi-dot ${i === 0 ? 'active' : ''}" onclick="goTesti(${i})"></button>
  `).join('');

  startTestiAuto();
}

function goTesti(i) {
  testiIndex = i;
  const track = document.getElementById('testiTrack');
  const cardWidth = track.children[0].offsetWidth + 24;
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
  const offset = Math.min(i * cardWidth, maxScroll);
  track.style.transform = `translateX(-${offset}px)`;
  document.querySelectorAll('.testi-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
  resetTestiAuto();
}

function startTestiAuto() {
  testiAuto = setInterval(() => {
    testiIndex = (testiIndex + 1) % testimonials.length;
    goTesti(testiIndex);
  }, 4000);
}

function resetTestiAuto() {
  clearInterval(testiAuto);
  startTestiAuto();
}

// Touch swipe
let touchStartX = 0;
document.getElementById('testiTrack')?.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.getElementById('testiTrack')?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    testiIndex = diff > 0
      ? Math.min(testiIndex + 1, testimonials.length - 1)
      : Math.max(testiIndex - 1, 0);
    goTesti(testiIndex);
  }
});

// ===== BOOKING =====
function populateBookingSelect() {
  const sel = document.getElementById('fVehicle');
  vehicles.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.capacity})`;
    sel.appendChild(opt);
  });
}

function initBookingDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('fDate').min = today;
}

window.submitBooking = () => {
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const vehicle = document.getElementById('fVehicle').value;
  const date = document.getElementById('fDate').value;
  const time = document.getElementById('fTime').value;
  const passenger = document.getElementById('fPassenger').value;
  const destination = document.getElementById('fDestination').value.trim();
  const pickup = document.getElementById('fPickup').value.trim();
  const notes = document.getElementById('fNotes').value.trim();

  if (!name || !phone || !vehicle || !date || !destination) {
    alert('Mohon lengkapi field yang wajib diisi (*)');
    return;
  }

  const msg = `*BOOKING EVERY TRANSPORT*\n\n` +
    `👤 *Nama:* ${name}\n` +
    `📱 *WA:* ${phone}\n` +
    `🚌 *Kendaraan:* ${vehicle}\n` +
    `👥 *Penumpang:* ${passenger || '-'}\n` +
    `📅 *Tanggal:* ${date}\n` +
    `🕐 *Jam:* ${time || '-'}\n` +
    `🗺️ *Tujuan:* ${destination}\n` +
    `📍 *Jemput:* ${pickup || '-'}\n` +
    `📝 *Catatan:* ${notes || '-'}\n\n` +
    `Mohon konfirmasi ketersediaan dan harga. Terima kasih! 🙏`;

  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
};

// ===== ADMIN =====
let isLoggedIn = false;
let editIndex = -1;

function initAdmin() {
  // Check hash
  const checkHash = () => {
    if (window.location.hash === '#admin') {
      openAdmin();
    }
  };
  window.addEventListener('hashchange', checkHash);
  checkHash();
}

window.openAdmin = () => {
  document.getElementById('admin').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeAdmin = () => {
  document.getElementById('admin').classList.remove('open');
  document.body.style.overflow = '';
  history.pushState('', document.title, window.location.pathname);
};

window.adminLogin = () => {
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;
  if (user === 'admin' && pass === 'admin123') {
    isLoggedIn = true;
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminVehicles();
  } else {
    alert('Username atau password salah!');
  }
};

window.switchTab = (tab) => {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');
  event.target.classList.add('active');
  document.getElementById(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`).style.display = 'block';
  if (tab === 'addVehicle' && editIndex === -1) clearForm();
};

function renderAdminVehicles() {
  document.getElementById('adminVehicleList').innerHTML = vehicles.map((v, i) => `
    <div class="vehicle-item">
      <img src="${v.photo}" alt="${v.name}" onerror="this.src='https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&q=80'">
      <div class="vehicle-item-info">
        <h4>${v.name}</h4>
        <p>${v.capacity} · ${v.price}</p>
      </div>
      <div class="vehicle-item-actions">
        <button class="btn-edit" onclick="editVehicle(${i})">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteVehicle(${i})">🗑️</button>
      </div>
    </div>
  `).join('');
}

window.editVehicle = (i) => {
  editIndex = i;
  const v = vehicles[i];
  document.getElementById('editName').value = v.name;
  document.getElementById('editCapacity').value = v.capacity;
  document.getElementById('editPrice').value = v.price;
  document.getElementById('editDesc').value = v.desc;
  document.getElementById('editPhoto').value = v.photo;
  document.getElementById('editFeatures').value = v.features.join(', ');
  document.getElementById('editIndex').value = i;
  document.getElementById('addVehicleTitle').textContent = 'Edit Kendaraan';
  switchTab('addVehicle');
  document.querySelectorAll('.admin-tab')[1].classList.add('active');
  document.querySelectorAll('.admin-tab')[0].classList.remove('active');
};

window.deleteVehicle = (i) => {
  if (confirm(`Hapus ${vehicles[i].name}?`)) {
    vehicles.splice(i, 1);
    saveVehicles();
    renderAdminVehicles();
    renderArmada();
    populateBookingSelect();
  }
};

window.saveVehicle = () => {
  const name = document.getElementById('editName').value.trim();
  const capacity = document.getElementById('editCapacity').value.trim();
  const price = document.getElementById('editPrice').value.trim();
  const desc = document.getElementById('editDesc').value.trim();
  const photo = document.getElementById('editPhoto').value.trim();
  const features = document.getElementById('editFeatures').value.split(',').map(f => f.trim()).filter(Boolean);
  const idx = parseInt(document.getElementById('editIndex').value);

  if (!name) { alert('Nama kendaraan wajib diisi'); return; }

  const vehicle = {
    name,
    capacity: capacity || '7 Penumpang',
    price: price || 'Hubungi Kami',
    desc: desc || 'Kendaraan nyaman untuk perjalanan wisata.',
    photo: photo || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80',
    features: features.length ? features : ['AC', 'Audio System'],
    category: capacity.includes('45') || capacity.includes('50') ? 'Bus Besar' :
               capacity.includes('25') || capacity.includes('30') ? 'Bus Menengah' :
               capacity.includes('15') || capacity.includes('14') ? 'Minibus' : 'MPV'
  };

  if (idx >= 0) {
    vehicles[idx] = vehicle;
  } else {
    vehicles.push(vehicle);
  }

  saveVehicles();
  renderAdminVehicles();
  renderArmada();

  // Refresh booking select
  const sel = document.getElementById('fVehicle');
  sel.innerHTML = '<option value="">-- Pilih Armada --</option>';
  vehicles.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.capacity})`;
    sel.appendChild(opt);
  });

  cancelEdit();
  alert('Kendaraan berhasil disimpan!');
};

window.cancelEdit = () => {
  editIndex = -1;
  document.getElementById('editIndex').value = -1;
  document.getElementById('addVehicleTitle').textContent = 'Tambah Kendaraan';
  clearForm();
  switchTab('vehicles');
  document.querySelectorAll('.admin-tab')[0].classList.add('active');
  document.querySelectorAll('.admin-tab')[1].classList.remove('active');
};

function clearForm() {
  ['editName', 'editCapacity', 'editPrice', 'editDesc', 'editPhoto', 'editFeatures'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function saveVehicles() {
  localStorage.setItem('et_vehicles', JSON.stringify(vehicles));
}

// ===== ESC KEY =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeWisataModal();
    closeAdmin();
  }
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
});
