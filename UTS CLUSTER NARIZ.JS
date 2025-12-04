document.addEventListener('DOMContentLoaded', () => {
  // Basic site data (articles & gallery)
  const articles = [
    {
      id: 'a1',
      title: 'Launching NARIZ Cluster: Hunian Modern untuk Keluarga',
      date: '2025-11-01',
      excerpt: 'NARIZ Cluster resmi dibuka — menghadirkan rumah 2 lantai modern, lingkungan hijau, serta fasilitas lengkap...',
      content: `<p>NARIZ Cluster adalah proyek perumahan premium yang berfokus pada kualitas hidup keluarga. Unit dirancang modern dengan ventilasi optimal, taman bermain, serta area serbaguna. Fasilitas umum meliputi clubhouse, jogging track, serta sistem keamanan 24 jam.</p><p>Keunggulan investasi: lokasi berkembang, akses mudah ke jalan utama, dan desain arsitektur yang timeless.</p>`
    },
    {
      id: 'a2',
      title: 'Open House Mingguan & Diskon Booking',
      date: '2025-10-15',
      excerpt: 'Setiap akhir pekan kami mengadakan open house. Dapatkan diskon booking khusus selama promo bulan ini...',
      content: `<p>Kunjungi unit show unit kami setiap Sabtu & Minggu jam 09.00-16.00. Tim marketing akan memandu tur dan menjelaskan paket pembayaran serta skema KPR yang tersedia.</p>`
    },
    {
      id: 'a3',
      title: 'Fitur & Fasilitas: Kenyamanan yang Terjamin',
      date: '2025-09-30',
      excerpt: 'Fasilitas yang tersedia mencakup clubhouse, area olahraga, taman komunitas, hingga jaringan internet fiber-ready...',
      content: `<p>NARIZ Cluster dibangun dengan infrastruktur modern: jaringan listrik terintegrasi, sumur resapan, serta ruang terbuka hijau yang luas.</p>`
    }
  ];

  const galleryImages = [
    {alt:'Activity 1', src:generatePlaceholder('Activity+1', '#f94144')},
    {alt:'Activity 2', src:generatePlaceholder('Activity+2', '#f3722c')},
    {alt:'House 1', src:generatePlaceholder('Unit+1', '#f9c74f')},
    {alt:'House 2', src:generatePlaceholder('Unit+2', '#90be6d')},
    {alt:'Clubhouse', src:generatePlaceholder('Clubhouse', '#577590')},
    {alt:'Playground', src:generatePlaceholder('Playground', '#43aa8b')}
  ];

  // Utilities
  function generatePlaceholder(text = 'Image', color = '#888') {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='50%' font-size='28' fill='#fff' text-anchor='middle' font-family='Arial'>${text}</text></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  // DOM refs
  const contentEl = document.getElementById('content');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // Visitor stats (simple localStorage simulation)
  const visTodayEl = document.getElementById('vis-today');
  const visTotalEl = document.getElementById('vis-total');
  const todayKey = 'nariz_visitors_' + new Date().toISOString().slice(0,10);
  const totalKey = 'nariz_visitors_total';
  let today = Number(localStorage.getItem(todayKey) || 0);
  let total = Number(localStorage.getItem(totalKey) || 0);
  today += 1; total += 1;
  localStorage.setItem(todayKey, today);
  localStorage.setItem(totalKey, total);
  visTodayEl.textContent = today;
  visTotalEl.textContent = total;

  // Clock widget
  function updateClock(){
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    document.getElementById('clock').textContent = `${hh}:${mm}:${ss}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Hash routing
  function navigate() {
    const hash = location.hash.replace(/^#/, '') || 'home';


    if (hash.startsWith('article/')) {
      const id = hash.split('/')[1];
      renderArticleDetail(id);
    } else if (hash.startsWith('about/')) {
      const sub = hash.split('/')[1];
      renderAbout(sub);
    } else {
      switch(hash) {
        case 'home': renderHome(); break;
        case 'gallery': renderGallery(); break;
        case 'registration': renderRegistration(); break;
        case 'contact': renderContact(); break;
        case 'blog': renderBlog(); break;
        case 'privacy': renderPrivacy(); break;
        case 'terms': renderTerms(); break;
        default: renderHome(); break;
      }
    }
    // focus content for accessibility
    contentEl.focus();
  }

  // Renderers
  function renderHome(){
    contentEl.innerHTML = `
      <section>
        <h2>Selamat datang di NARIZ Cluster</h2>
        <p class="lead">Hunian premium yang dirancang untuk kualitas hidup keluarga — nyaman, aman, dan bernilai investasi.</p>
        <div class="cards" aria-live="polite">
          ${articles.map(a => `
            <article class="card" aria-labelledby="art-${a.id}">
              <div class="thumb" style="background-image:url('${generatePlaceholder(a.title, '#3a86ff')}')"></div>
              <div class="body">
                <div class="meta">${a.date}</div>
                <h4 id="art-${a.id}"><a href="#article/${a.id}" data-link>${a.title}</a></h4>
                <p>${a.excerpt}</p>
                <a class="read-more" href="#article/${a.id}" data-link>Read More →</a>
              </div>
            </article>
          `).join('')}
        </div>

        <h3 style="margin-top:22px">Unit Unggulan</h3>
        <p>Kami menawarkan berbagai tipe rumah: 2 lantai modern, cluster terbatas, serta pilihan kavling untuk custom build.</p>
      </section>
    `;
  }

  function renderBlog(){
    contentEl.innerHTML = `
      <section>
        <h2>Berita & Pengumuman</h2>
        <div class="cards">
          ${articles.map(a => `
            <article class="card">
              <div class="thumb" style="background-image:url('${generatePlaceholder(a.title, '#8338ec')}')"></div>
              <div class="body">
                <div class="meta">${a.date}</div>
                <h4><a href="#article/${a.id}" data-link>${a.title}</a></h4>
                <p>${a.excerpt}</p>
                <a class="read-more" href="#article/${a.id}" data-link>Read More</a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderArticleDetail(id){
    const art = articles.find(x => x.id === id);
    if (!art) {
      contentEl.innerHTML = `<h2>Artikel tidak ditemukan</h2><p>Maaf, artikel yang Anda cari tidak tersedia.</p>`;
      return;
    }
    contentEl.innerHTML = `
      <article>
        <h2>${art.title}</h2>
        <div class="meta">${art.date} · NARIZ Cluster</div>
        <div class="article-body" style="margin-top:12px">${art.content}</div>
        <p><a href="#blog" data-link>← Kembali ke Berita</a></p>
      </article>
    `;
  }

  function renderAbout(sub = 'profile'){
    const sections = {
      profile: `<h3>Profil NARIZ Cluster</h3><p>NARIZ Cluster merupakan pengembangan perumahan modern yang fokus pada komunitas dan kualitas arsitektur.</p>`,
      history: `<h3>Sejarah</h3><p>Didirikan oleh developer lokal pada 2024, NARIZ mulai dikembangkan untuk memenuhi kebutuhan hunian menengah ke atas.</p>`,
      vision: `<h3>Visi & Misi</h3><p><strong>Visi:</strong> Menjadi pilihan utama hunian keluarga yang nyaman. <strong>Misi:</strong> Menghadirkan desain berkualitas, fasilitas lengkap, dan layanan profesional.</p>`,
      structure: `<h3>Struktur Organisasi</h3><p>Founder: Ir. Nariz Santoso; Kepala Pengembangan: Ms. Dewi; Marketing: Tim NARIZ</p>`
    };
    contentEl.innerHTML = `
      <section>
        <h2>About NARIZ Cluster</h2>
        <nav aria-label="About subpages" style="margin-bottom:12px;">
          <a class="btn secondary" href="#about/profile" data-link>Profil</a>
          <a class="btn secondary" href="#about/history" data-link>Sejarah</a>
          <a class="btn secondary" href="#about/vision" data-link>Visi & Misi</a>
          <a class="btn secondary" href="#about/structure" data-link>Struktur</a>
        </nav>
        <div>${sections[sub] || sections.profile}</div>
      </section>
    `;
  }

  function renderGallery(){
    contentEl.innerHTML = `
      <section>
        <h2>Gallery</h2>
        <p>Foto kegiatan, unit show, dan fasilitas.</p>
        <div class="gallery-grid">
          ${galleryImages.map(g => `
            <figure><img src="${g.src}" alt="${g.alt}"></figure>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderRegistration(){
    contentEl.innerHTML = `
      <section>
        <h2>Formulir Pendaftaran Unit</h2>
        <p>Isi data di bawah untuk melakukan reservasi atau mendapat informasi unit lebih lanjut.</p>
        <form id="reg-form" class="form" onsubmit="return false;">
          <input class="input" name="name" placeholder="Nama Lengkap" required>
          <input class="input" name="email" type="email" placeholder="Email" required>
          <input class="input" name="phone" placeholder="Nomor Telepon" required>
          <select class="input" name="unit">
            <option value="">Pilih Tipe Unit...</option>
            <option>Type A - 2 Lantai</option>
            <option>Type B - 1 Lantai</option>
            <option>Kavling</option>
          </select>
          <textarea name="note" placeholder="Pesan / kebutuhan tambahan"></textarea>
          <div style="display:flex; gap:10px;">
            <button id="reg-submit" class="btn" type="submit">Kirim Pendaftaran</button>
            <button type="reset" class="btn secondary">Reset</button>
          </div>
          <div id="reg-msg" aria-live="polite" style="margin-top:8px;"></div>
        </form>
      </section>
    `;

    const form = document.getElementById('reg-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // CONTOH SIMULASI
      document.getElementById('reg-msg').innerHTML = '<strong>Terima kasih!</strong> Pendaftaran Anda telah diterima. Tim kami akan menghubungi via email/telepon.';
      form.reset();
    });

    // support pressing enter to send
    form.querySelector('#reg-submit').addEventListener('click', () => form.dispatchEvent(new Event('submit', {cancelable:true})));
  }

  function renderContact(){
    contentEl.innerHTML = `
      <section>
        <h2>Contact Us</h2>
        <p>Hubungi kami untuk informasi lebih lanjut.</p>
        <div style="display:grid; grid-template-columns: 1fr 320px; gap:18px;">
          <div>
            <form id="contact-form" class="form" onsubmit="return false;">
              <input class="input" name="name" placeholder="Nama" required>
              <input class="input" name="email" type="email" placeholder="Email" required>
              <input class="input" name="institution" placeholder="Institusi (opsional)">
              <textarea name="message" placeholder="Pesan" required></textarea>
              <button class="btn" type="submit">Kirim Pesan</button>
              <div id="contact-msg" style="margin-top:8px;" aria-live="polite"></div>
            </form>

            <h3 style="margin-top:18px">Informasi Kontak</h3>
            <p>Email: <a href="mailto:info@narizcluster.example">info@narizcluster.example</a><br>Phone: +62 812-3456-7890</p>
            <p>Sosial: <a href="#">Facebook</a> · <a href="#">Instagram</a> · <a href="#">LinkedIn</a></p>
          </div>

          <div style="background:#fbfcff; border-radius:12px; padding:12px;">
            <h4>Office</h4>
            <p>Jl. Contoh No.99, Kota Contoh<br>Jam: Mon - Sat, 09:00 - 17:00</p>
            <div style="border-radius:8px; overflow:hidden;">
              <!-- Mini map placeholder -->
              <img src="${generatePlaceholder('Map+Location', '#577590')}" alt="Map location" />
            </div>
          </div>
        </div>
      </section>
    `;

    const cform = document.getElementById('contact-form');
    cform.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('contact-msg').innerHTML = 'Pesan terkirim. Terima kasih, kami akan merespon dalam 1-2 hari kerja.';
      cform.reset();
    });
  }

  function renderPrivacy(){
    contentEl.innerHTML = `<h2>Privacy Policy</h2><p>Kami menghormati privasi Anda. Data yang dikumpulkan hanya untuk keperluan administrasi penjualan dan komunikasi.</p>`;
  }

  function renderTerms(){
    contentEl.innerHTML = `<h2>Terms & Conditions</h2><p>Syarat dan ketentuan berlaku untuk semua transaksi dan registrasi pada NARIZ Cluster.</p>`;
  }

  // attach link interception for internal navigation
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-link]');
    if (a) {
      e.preventDefault();
      const href = a.getAttribute('href') || '#home';
      location.hash = href.replace(/^#/, '');
    }
  });

  // initial navigation
  window.addEventListener('hashchange', navigate);
  navigate();
});
