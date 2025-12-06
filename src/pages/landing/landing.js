export default class LandingPage {
  render() {
    return `
      <!-- Hero Section -->
      <section 
        class="flex items-center min-h-screen px-5 md:px-10 pt-[100px] pb-10 text-[#333]"
      >
        <div class="flex-1 max-w-[600px]">
          <h1 class="text-[2.5rem] font-bold leading-tight mb-5">Bangun Karirmu Sebagai</h1>
          <h1 class="text-[2.5rem] font-bold leading-tight mb-5">Developer Profesional</h1>
          <p class="text-lg opacity-90 mb-8">Mulai belajar terarah dengan learning path</p>

          <button 
            id="btnBelajar"
            class="bg-[#0b114f] text-white px-8 py-3 rounded-full text-lg font-semibold 
            transition-all duration-300 hover:bg-blue-900 hover:-translate-y-0.5 
            hover:shadow-[0_10px_20px_#c6c9f5]"
          >
            Belajar Sekarang
          </button>
        </div>

        <div class="flex-1 text-center hidden md:block">
          <img 
            src="/image/homepage-hero.png" 
            alt="Feature"
            class="max-w-full"
          />
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 px-5 bg-white">
        <div class="text-center max-w-[800px] mx-auto mb-16">
          <h1 class="text-4xl font-bold text-[#333] mb-5">Kenapa LearnFlow Berbeda</h1>
          <p class="text-lg text-[#666] leading-relaxed">
            Saatnya bijak memilih sumber belajar. Tak hanya materi yang terjamin,
          </p>
          <p class="text-lg text-[#666] leading-relaxed">
            Dicoding Academy juga memiliki reviewer profesional yang akan mengulas kode Anda.
          </p>
        </div>

        <div class="flex flex-col md:flex-row items-center max-w-[1200px] mx-auto gap-16">

          <div class="flex-1">
            <div class="space-y-4">
              <p class="bg-[#f8f9fa] p-4 px-6 rounded-xl border-l-4 border-[#05165B] font-medium hover:translate-x-2">
                Kurikulum standar industri global
              </p>
              <p class="bg-[#f8f9fa] p-4 px-6 rounded-xl border-l-4 border-[#05165B] font-medium hover:translate-x-2">
                Belajar fleksibel sesuai jadwal anda
              </p>
              <p class="bg-[#f8f9fa] p-4 px-6 rounded-xl border-l-4 border-[#05165B] font-medium hover:translate-x-2">
                Code review dari developer expert
              </p>
              <p class="bg-[#f8f9fa] p-4 px-6 rounded-xl border-l-4 border-[#05165B] font-medium hover:translate-x-2">
                Alumni terpercaya di berbagai perusahaan
              </p>
            </div>
          </div>

          <div class="flex-1 text-center">
            <img 
              src="/image/feature-1-landing-page.png" 
              alt="Feature" 
              class="max-w-full h-auto rounded-2xl"
            />
          </div>

        </div>
      </section>
    `;
  }

  afterRender() {
    const btn = document.getElementById("btnBelajar");
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.hash = "#/dashboard";
      });
    }
  }
}
