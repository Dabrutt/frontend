import "./style.css";

document.querySelector("#app").innerHTML = `
      <!-- Navbar -->
      <header class="navbar">
        <div class="container">
          <a href="#">
            <img src="../../public/image/dicoding-header-logo.png" alt="Dicoding Logo" />
          </a>
          <nav class="nav-links">
            <ul>
              <li><a href="#" class="active">Home</a></li>
              <li><a href="#">Academy</a></li>
            </ul>
          </nav>
          <div class="profile-icons">
            <div class="profile"></div>
            <div class="notif"></div>
          </div>
        </div>
      </header>
      
      <section class="hero">
        <div class="hero-text">
          <h1>Bangun Karirmu Sebagai</h1>
          <h1>Developer Profesional</h1>
          <p>Mulai belajar terarah dengan learning path</p>
          <button class="cta">Belajar Sekarang</button>
        </div>
        <div class="hero-image">
          <img src="../../public/image/homepage-hero.png" alt="Feature" />
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="feature-head">
          <h1>Kenapa Dicoding Academy Berbeda</h1>
          <p>Saatnya bijak memilih sumber belajar. Tak hanya materi yang terjamin,</p>
          <p>Dicoding Academy juga memiliki reviewer profesional yang akan mengulas kode Anda.</p>
        </div>
        <div class="feature-main">
        <div class="features-text">
          <div class="feature-box">
            <p>Kurikulum standar industri global</p>
            <p>Belajar fleksibel sesuai jadwal anda</p>
            <p>Code review dari developer expert</p>
            <p>Alumni terpercaya di berbagai perusahaan</p>
          </div>
        </div>
        <div class="features-image">
          <img src="../../public/image/feature-1-landing-page.png" alt="Feature" />
        </div>
        </div>
      </section>
`;
