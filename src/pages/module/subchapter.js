import { modulesAPI, progressAPI } from "../../api/api.js";

export default class SubchapterPage {
  constructor() {
    this.title = "Subchapter";
  }

  async getHtml() {
    return `
      <div class="min-h-screen bg-gray-50 font-sans">
        <!-- Sidebar dan layout sama seperti sebelumnya -->
        <main class="md:ml-64 pt-24 px-6 pb-12 transition-all duration-300">
          <div class="max-w-4xl mx-auto space-y-6">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-[#0f1742] rounded text-white">
                <i class="fa-solid fa-book-open text-xl"></i>
              </div>
              <div>
                <h2 id="subchapter-title" class="text-2xl font-bold text-[#0f1742]">Memuat Subchapter...</h2>
                <p id="module-name" class="text-sm text-gray-500">...</p>
              </div>
            </div>

            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div id="mini-progress" class="h-2 rounded-full bg-yellow-500 transition-all" style="width: 0%"></div>
            </div>

            <section class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div id="subchapter-content" class="p-6 min-h-[200px] text-gray-700">
                <div class="animate-pulse space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </section>

            <div class="flex justify-between items-center">
              <button id="back-btn" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition text-sm font-medium">
                Kembali ke Modul
              </button>
              <button id="next-btn" class="bg-[#0f1742] text-white px-5 py-2 rounded hover:bg-blue-900 transition text-sm font-medium">
                Selanjutnya
              </button>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.hash = "#/login");

    const hash = window.location.hash;
    const match = hash.match(/#\/subchapter\/(\d+)/);
    if (!match) return;

    const subId = parseInt(match[1]);
    await this.loadSubchapter(subId);
  }

  async loadSubchapter(subId) {
    const titleEl = document.getElementById("subchapter-title");
    const moduleEl = document.getElementById("module-name");
    const contentEl = document.getElementById("subchapter-content");
    const nextBtn = document.getElementById("next-btn");
    const backBtn = document.getElementById("back-btn");
    const miniProgressEl = document.getElementById("mini-progress");

    if (
      !titleEl ||
      !moduleEl ||
      !contentEl ||
      !nextBtn ||
      !backBtn ||
      !miniProgressEl
    )
      return;

    try {
      // Ambil data subchapter beserta module & chapter sekaligus
      const {
        module: moduleData,
        chapter: chapterData,
        subchapter: subchapterData,
        allSubchapters,
      } = await modulesAPI.getSubchapterFull(subId);

      const overviewData = await progressAPI.getOverview();

      // Update header
      titleEl.textContent = subchapterData.title;
      moduleEl.textContent = moduleData.title;

      // Konten
      contentEl.innerHTML =
        subchapterData.content_html || "<p>Konten belum tersedia.</p>";

      // CSS
      if (subchapterData.content_css) {
        const styleEl = document.createElement("style");
        styleEl.innerHTML = subchapterData.content_css;
        document.head.appendChild(styleEl);
      }

      // Ambil semua subchapters di level modul (bukan hanya chapter saat ini)
      const moduleChapters = await modulesAPI.getChapters(moduleData.id);
      const subsPerChapter = await Promise.all(
        moduleChapters.map((ch) =>
          modulesAPI.getSubchapters(moduleData.id, ch.id)
        )
      );
      const moduleSubchapters = subsPerChapter.flat();

      // Mini progress (ambil progress saat ini dari overview)
      const userModuleProgress = overviewData.modules?.find(
        (m) => m.id == moduleData.id
      );
      const existingProgress = userModuleProgress
        ? parseInt(userModuleProgress.progress) || 0
        : 0;
      miniProgressEl.style.width = `${existingProgress}%`;

      // Tombol selanjutnya: hitung progress modul berdasarkan posisi subchapter
      nextBtn.onclick = async () => {
        try {
          // pastikan susunan subchapters di seluruh modul berdasarkan urutan
          const orderedSubs = Array.isArray(moduleSubchapters)
            ? [...moduleSubchapters].sort(
                (a, b) =>
                  (a.order_sequence || 0) - (b.order_sequence || 0) ||
                  a.id - b.id
              )
            : [];

          const currentIndex = orderedSubs.findIndex((s) => s.id === subId);
          const total = Math.max(orderedSubs.length, 1);

          // Infer completed count from existingProgress to avoid double-counting
          const completedCountFromProgress = Math.round(
            (existingProgress * total) / 100
          );

          // If this subchapter wasn't already counted, increment by one; otherwise keep
          const shouldCountThis = currentIndex + 1 > completedCountFromProgress;
          const newCompletedCount = shouldCountThis
            ? completedCountFromProgress + 1
            : completedCountFromProgress;

          const computedProgress = Math.round(
            (newCompletedCount / total) * 100
          );

          // Jangan biarkan progress menurun
          const effectiveProgress = Math.max(
            existingProgress,
            computedProgress
          );

          // Optimistis: update mini progress pada UI dengan nilai efektif
          miniProgressEl.style.width = `${effectiveProgress}%`;

          // Panggil API hanya jika kita menaikkan progress
          if (effectiveProgress > existingProgress) {
            await progressAPI.updateModule(moduleData.id, {
              progress: effectiveProgress,
            });
          }

          // Pilih subchapter selanjutnya berdasarkan posisi index dalam orderedSubs
          const nextSub = orderedSubs[currentIndex + 1];

          if (nextSub) window.location.hash = `#/subchapter/${nextSub.id}`;
          else window.location.hash = `#/module/${moduleData.id}`;
        } catch (err) {
          console.error(err);
          // fallback: kembali ke modul jika terjadi error
          window.location.hash = `#/module/${moduleData.id}`;
        }
      };

      // Tombol kembali
      backBtn.onclick = () => {
        window.location.hash = `#/module/${moduleData.id}`;
      };
    } catch (err) {
      console.error(err);
      contentEl.innerHTML = `<p class="text-red-500 text-sm text-center">Gagal memuat subchapter.</p>`;
      nextBtn.style.display = "none";
      backBtn.style.display = "none";
      miniProgressEl.style.width = `0%`;
    }
  }
}
