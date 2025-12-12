export default class LanggananPage {
  render() {
    return `
        <!-- CONTAINER UTAMA -->
        <!-- pt-16 ditambahkan agar konten tidak tertutup oleh Navbar fixed Anda -->
        <div class="flex min-h-screen bg-white text-slate-800 pt-16 font-sans">
        
        <!-- SIDEBAR (Fixed Left) -->
        <!-- Menggunakan class 'fixed' agar menempel di kiri layar -->
        <aside class="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 hidden md:flex flex-col z-20 overflow-y-auto">
            <div class="py-4">
                <nav class="space-y-1">
                    <!-- Link 1: Progres Belajar (NON-AKTIF) -->
                    <a href="#/runtutan" class="text-gray-600 hover:bg-gray-50 hover:text-slate-900 group flex items-center px-6 py-4 text-sm font-medium transition-all">
                        <i class="fa-solid fa-chart-pie mr-4 text-lg w-5 text-center"></i>
                        Runtutan Belajar
                    </a>

                    <!-- Link 2: Runtutan Belajar (NON-AKTIF) -->
                    <a href="#/progress" class="text-gray-600 hover:bg-gray-50 hover:text-slate-900 group flex items-center px-6 py-4 text-sm font-medium transition-all">
                        <i class="fa-regular fa-calendar-check mr-4 text-lg w-5 text-center"></i>
                        Progress Belajar
                    </a>
                    
                    <!-- Link 3: Langganan (AKTIF - Style Diubah Sesuai Gambar) -->
                    <a href="#/langganan" class="bg-gray-100 text-slate-900 font-bold group flex items-center px-6 py-4 text-sm transition-all relative">
                        <!-- Garis Indikator Aktif di Kiri -->
                        <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-900"></div>
                        <i class="fa-regular fa-file-lines mr-4 text-lg w-5 text-center"></i>
                        Langganan
                    </a>
                </nav>
            </div>
        </aside>

        <!-- MAIN CONTENT (Right Side) -->
        <!-- md:ml-64 digunakan untuk memberi ruang agar tidak tertutup sidebar -->
        <main class="flex-1 w-full md:ml-64 p-6 md:p-8 overflow-y-auto">
            
            <!-- Page Title & Icon -->
            <div class="flex items-center gap-3 mb-6">
                <div class="bg-[#0f1742] text-white p-2 rounded flex items-center justify-center w-10 h-10">
                    <i class="fa-regular fa-file-lines text-lg"></i>
                </div>
                <h1 class="text-xl font-bold text-slate-900">Langganan</h1>
            </div>

            <!-- Grey Placeholder Box (Banner) -->
            <div class="w-full h-48 bg-gray-200 rounded-md mb-8 border-2 border-solid border-gray-300 overflow-hidden">
                <img src="/image/langganan-banner.png" alt="Banner Langganan" class="w-full h-full object-cover rounded-md">
            </div>

            <!-- SECTION 1: Status Langganan -->
            <div class="mb-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <!-- Card Header -->
                <div class="bg-[#0f1742] text-white px-6 py-4">
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-calendar text-xl"></i>
                        <div>
                            <h2 class="font-semibold text-base">Status Langganan Anda</h2>
                            <p class="text-xs text-gray-300">Lorem Ipsum</p>
                        </div>
                    </div>
                </div>
                
                <!-- Card Body -->
                <div class="bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <i class="fa-regular fa-file-lines text-2xl text-slate-900"></i>
                        <p class="text-slate-700 text-sm md:text-base">
                            Anda belum berlangganan LearnFlow. Pilih paket langganan dan mulai lah perjalanan Anda menjadi developer profesional.
                        </p>
                    </div>
                    <button class="whitespace-nowrap bg-[#0f1742] hover:bg-blue-900 text-white text-sm font-medium py-2.5 px-6 rounded transition-colors cursor-pointer">
                        Pilih Paket Langganan
                    </button>
                </div>
            </div>

            <!-- SECTION 2: Daftar Paket -->
            <div class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <!-- Card Header -->
                <div class="bg-[#0f1742] text-white px-6 py-4">
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-file-lines text-xl"></i>
                        <h2 class="font-semibold text-base">Paket Yang Di Daftarkan</h2>
                    </div>
                </div>

                <!-- List Container -->
                <div class="bg-white p-6 space-y-4">
                    
                    <!-- Item 1: Paket Biasa -->
                    <div class="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center gap-4 w-full">
                            <div class="bg-red-50 p-2 rounded text-red-500 shrink-0">
                                <i class="fa-solid fa-lock text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 text-lg">Paket Biasa</h3>
                                <p class="text-sm text-gray-600">Mendapatkan Akses Kelas Selama 1 Bulan</p>
                            </div>
                        </div>
                        <button class="w-full md:w-auto bg-[#0f1742] hover:bg-blue-900 text-white text-sm font-medium py-2 px-6 rounded transition-colors whitespace-nowrap cursor-pointer">
                            Progress Kelas
                        </button>
                    </div>

                    <!-- Item 2: Paket Premium -->
                    <div class="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center gap-4 w-full">
                            <div class="bg-red-50 p-2 rounded text-red-500 shrink-0">
                                <i class="fa-solid fa-lock text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 text-lg">Paket Premium</h3>
                                <p class="text-sm text-gray-600">Mendapatkan Akses Kelas Selama 3 Bulan</p>
                            </div>
                        </div>
                        <button class="w-full md:w-auto bg-[#0f1742] hover:bg-blue-900 text-white text-sm font-medium py-2 px-6 rounded transition-colors whitespace-nowrap cursor-pointer">
                            Progress Kelas
                        </button>
                    </div>

                    <!-- Item 3: Paket VIP -->
                    <div class="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center gap-4 w-full">
                            <div class="bg-red-50 p-2 rounded text-red-500 shrink-0">
                                <i class="fa-solid fa-lock text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 text-lg">Paket VIP</h3>
                                <p class="text-sm text-gray-600">Mendapatkan Akses Kelas Selama 6 Bulan</p>
                            </div>
                        </div>
                        <button class="w-full md:w-auto bg-[#0f1742] hover:bg-blue-900 text-white text-sm font-medium py-2 px-6 rounded transition-colors whitespace-nowrap cursor-pointer">
                            Progress Kelas
                        </button>
                    </div>

                </div>
            </div>

            <!-- Bottom Spacer -->
            <div class="h-10"></div>
        </main>
        </div>
    `;
  }
}
