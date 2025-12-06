import { progressAPI } from "../../api/api.js";

export default class ProgressPage {
  constructor() {
    this.title = "Progres Belajar";
  }

  async render() {
    return `
    <!-- Container Halaman -->
    <div class="min-h-screen bg-gray-50 font-sans text-slate-700 pt-16">
      
      <!-- SIDEBAR (Fixed Left) -->
      <!-- Menggunakan class 'fixed' agar menempel di kiri layar -->
      <aside class="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 hidden md:flex flex-col z-20 overflow-y-auto">
          <div class="py-4">
            <nav class="space-y-1">
                <!-- Link 1: Progres Belajar (AKTIF) -->
                <a href="/#/progres" class="bg-gray-100 text-slate-900 font-bold group flex items-center px-6 py-4 text-sm transition-all relative">
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-900"></div>
                    <i class="fa-solid fa-chart-pie mr-4 text-lg w-5 text-center"></i>
                    Progres Belajar
                </a>

                <!-- Link 2: Runtutan Belajar -->
                <a href="/#/runtutan" class="text-gray-600 hover:bg-gray-50 hover:text-slate-900 group flex items-center px-6 py-4 text-sm font-medium transition-all">
                    <i class="fa-regular fa-calendar-check mr-4 text-lg w-5 text-center"></i>
                    Runtutan Belajar
                </a>
                
                <!-- Link 3: Langganan -->
                <a href="/#/langganan" class="text-gray-600 hover:bg-gray-50 hover:text-slate-900 group flex items-center px-6 py-4 text-sm font-medium transition-all">
                    <i class="fa-regular fa-file-lines mr-4 text-lg w-5 text-center"></i>
                    Langganan
                </a>
            </nav>
          </div>
      </aside>

      <!-- MAIN CONTENT -->
      <!-- Margin Left 64 (md:ml-64) PENTING agar konten tidak tertutup sidebar -->
      <main class="md:ml-64 p-6 lg:p-10">
        
        <div class="max-w-full space-y-8">
          
          <!-- Page Header -->
          <div class="flex items-center gap-3">
             <div class="p-2 bg-[#0f172a] rounded text-white">
                <i class="fa-regular fa-calendar-check text-xl"></i>
             </div>
             <div>
                <h2 class="text-xl font-bold text-slate-800">Progres Belajar</h2>
                <p id="header-subtitle" class="text-sm text-gray-500">Memuat data...</p>
             </div>
          </div>

          <!-- SECTION 1: Kelas yang Sedang Dipelajari -->
          <section class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <!-- Header Card -->
            <div class="p-4 bg-[#0f172a] text-white flex items-center gap-3">
               <i class="fa-regular fa-calendar text-lg opacity-90"></i>
               <div>
                   <div class="text-sm font-bold">Kelas yang Sedang Dipelajari</div>
                   <div class="text-xs text-gray-300 font-light">Lanjutkan progres Anda</div>
               </div>
            </div>
            
            <!-- List Container -->
            <div id="in-progress-list" class="flex flex-col min-h-[100px]">
                <div class="p-6 text-center text-gray-400 text-sm">Memuat data...</div>
            </div>
          </section>

          <!-- SECTION 2: Kelas yang Sudah Diselesaikan -->
          <section class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-10">
            <!-- Header Card -->
            <div class="p-4 bg-[#0f172a] text-white flex items-center gap-3">
               <i class="fa-regular fa-calendar-check text-lg opacity-90"></i>
               <div>
                   <div class="text-sm font-bold">Kelas yang Sudah Diselesaikan</div>
                   <div class="text-xs text-gray-300 font-light">Riwayat pencapaian</div>
               </div>
            </div>
            
            <!-- List Container -->
            <div id="completed-list" class="flex flex-col min-h-[100px]">
                 <div class="p-6 text-center text-gray-400 text-sm">Memuat data...</div>
            </div>
          </section>

        </div>
      </main>
    </div>
    `;
  }

  // --- LOGIKA FETCH DATA ---
  async load() {
    // 1. CEK TOKEN DULU: Kalau tidak ada token, jangan panggil API, langsung minta login
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Anda belum login. Silakan login terlebih dahulu.");
        window.location.hash = "/login"; 
        return;
    }

    await this.fetchProgressData();
  }

  async fetchProgressData() {
    const activeContainer = document.querySelector("#in-progress-list");
    const completedContainer = document.querySelector("#completed-list");
    const headerSubtitle = document.querySelector("#header-subtitle");

    if (!activeContainer || !completedContainer) return;

    try {
      // Panggil API
      const data = await progressAPI.getOverview();

      // Debugging: Lihat apa yang dikembalikan backend di Console browser (F12)
      console.log("Data Progress dari Backend:", data);

      const allModules = data.modules || [];
      const overallPercentage = data.percentage || 0;

      if (headerSubtitle) {
        headerSubtitle.textContent = Total Pencapaian: ${overallPercentage}%;
      }

      const activeModules = allModules.filter((m) => m.progress < 100);
      const completedModules = allModules.filter((m) => m.progress >= 100);

      // Helper HTML Item
      const createItemHTML = (module, isCompleted) => {
        const iconClass = isCompleted
          ? "fa-solid fa-circle-check text-green-500"
          : "fa-solid fa-circle-exclamation text-red-500";
        const btnText = isCompleted ? "Lihat Detail" : "Detail Kelas";

        return `
            <div class="flex items-center justify-between p-5 border-b border-gray-100 hover:bg-gray-50 transition last:border-b-0">
                <div class="flex items-center gap-4">
                    <i class="${iconClass} text-lg"></i>
                    <div>
                        <div class="text-slate-700 font-medium text-sm md:text-base">${module.title}</div>
                        <div class="text-xs text-gray-400 mt-1">
                           ${module.progress}% Selesai
                        </div>
                    </div>
                </div>
                <button class="bg-[#0f172a] text-white text-xs px-4 py-2 rounded shadow-sm hover:bg-slate-800 transition whitespace-nowrap ml-4">
                    ${btnText}
                </button>
            </div>
        `;
      };

      // Render Active
      if (activeModules.length > 0) {
        activeContainer.innerHTML = activeModules
          .map((m) => createItemHTML(m, false))
          .join("");
      } else {
        activeContainer.innerHTML = <div class="p-5 text-gray-500 text-sm italic text-center">Tidak ada kelas yang sedang dipelajari.</div>;
      }

      // Render Completed
      if (completedModules.length > 0) {
        completedContainer.innerHTML = completedModules
          .map((m) => createItemHTML(m, true))
          .join("");
      } else {
        completedContainer.innerHTML = <div class="p-5 text-gray-500 text-sm italic text-center">Belum ada kelas yang diselesaikan.</div>;
      }

    } catch (error) {
      console.error("Error fetching progress:", error);
      
      // Pesan error lebih detail
      let msg = "Gagal memuat data.";
      if (error.message.includes("401") || error.message.includes("403")) {
          msg = "Sesi habis. Silakan login ulang.";
      } else if (error.message.includes("Failed to fetch")) {
          msg = "Gagal menghubungi server (Backend mati?).";
      }

      const errorHTML = <div class="p-5 text-red-500 text-sm text-center font-medium">${msg} <br> Cek console (F12) untuk detail.</div>;
      activeContainer.innerHTML = errorHTML;
      completedContainer.innerHTML = errorHTML;
    }
  }
}