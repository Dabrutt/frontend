import { modulesAPI, progressAPI } from "../../api/api.js";

export default class ModulePage {
  constructor() {
    this.title = "Module";
  }

  async getHtml() {
    return `
      <div class="min-h-screen bg-gray-50 font-sans p-6">
        <div class="max-w-4xl mx-auto mt-10 space-y-6">
          <!-- Header -->
          <div>
            <h2 id="module-title" class="text-2xl font-bold text-[#0f1742]">Memuat Modul...</h2>
            <p id="module-desc" class="text-sm text-gray-500">...</p>
          </div>

          <!-- Subchapter List -->
          <div id="subchapter-list" class="bg-white rounded-lg shadow-sm overflow-hidden">
            <p class="text-gray-400 text-sm text-center p-6">Memuat subchapter...</p>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    // Cek login
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    // Ambil ID modul dari URL hash
    const hash = window.location.hash;
    const match = hash.match(/#\/module\/(\d+)/);
    if (!match) return;

    const moduleId = match[1];
    await this.loadModule(moduleId);
  }

  async loadModule(moduleId) {
    const titleEl = document.getElementById("module-title");
    const descEl = document.getElementById("module-desc");
    const subListEl = document.getElementById("subchapter-list");

    try {
      // Ambil data modul & progres user
      const moduleData = await modulesAPI.getById(moduleId);
      const overviewData = await progressAPI.getOverview();

      // Ambil semua chapter + subchapters
      const chapters = await modulesAPI.getChapters(moduleId);
      for (const chapter of chapters) {
        chapter.subchapters = await modulesAPI.getSubchapters(
          moduleId,
          chapter.id
        );
      }

      // Gabungkan semua subchapters
      const subchapters = chapters.flatMap((ch) => ch.subchapters);

      // Update header
      if (titleEl)
        titleEl.textContent = moduleData.title || "Modul Tanpa Judul";
      if (descEl) descEl.textContent = moduleData.description || "";

      // Hitung progress modul dari overview (gunakan loose equality untuk aman)
      const moduleProgressObj = overviewData.modules?.find(
        (m) => m.id == moduleData.id
      );
      const moduleProgress = moduleProgressObj
        ? parseInt(moduleProgressObj.progress)
        : 0;

      // Render subchapters
      if (subchapters.length === 0) {
        subListEl.innerHTML = `<p class="text-gray-400 text-sm text-center p-6">Modul ini belum memiliki subchapter.</p>`;
        return;
      }

      const subHTML = subchapters
        .map((sub) => {
          // tampilkan progress modul yang sama untuk setiap subchapter
          const progress = moduleProgress;
          const btnText = progress >= 100 ? "Ulas Kembali" : "Mulai";

          return `
            <div class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition last:border-b-0">
              <div>
                <div class="font-semibold text-slate-800">${sub.title}</div>
                <div class="text-xs text-gray-500 mt-1">${progress}% selesai</div>
              </div>
              <button 
                onclick="window.location.hash='#/subchapter/${sub.id}'"
                class="bg-[#0f1742] text-white text-xs font-medium px-4 py-2 rounded hover:bg-blue-900 transition">
                ${btnText}
              </button>
            </div>
          `;
        })
        .join("");

      subListEl.innerHTML = subHTML;
    } catch (err) {
      console.error(err);
      subListEl.innerHTML = `<p class="text-red-500 text-sm text-center p-6">Gagal memuat modul. Periksa koneksi internet Anda.</p>`;
    }
  }
}
