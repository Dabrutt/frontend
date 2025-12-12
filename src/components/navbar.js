export const navbar = `
<header class="navbar fixed top-0 z-50 w-full bg-white border-b border-gray-200 h-16 transition-all">
  <div class="container mx-auto h-full px-4 md:px-8 flex items-center justify-between max-w-6xl">
    
    <!-- LEFT: LOGO -->
    <a href="#/" class="flex items-center gap-2">
      <!-- Menggunakan placeholder jika gambar tidak ada -->
        <img src="/image/learnflow-header-logo.png" alt="Dicoding Logo" class="h-8 w-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'" />
      <span class="font-bold text-xl text-slate-800 hidden">dicoding</span>
    </a>

    <!-- CENTER: NAV LINKS (Termasuk Login & Register) -->
    <nav class="nav-links hidden md:block">
      <ul class="flex gap-6 text-sm font-medium text-gray-600">
        <li>
            <a href="#/" class="hover:text-slate-900 transition-colors" data-link>Home</a>
        </li>
        <li>
            <a href="#/runtutan" class="hover:text-slate-900 transition-colors" data-link>Dashboard</a>
        </li>
        <!-- Tombol Login & Register Tetap Ada -->
        <li>
            <a href="#/login" class="hover:text-slate-900 transition-colors" data-link>Login</a>
        </li>
        <li>
            <a href="#/register" class="hover:text-slate-900 transition-colors" data-link>Register</a>
        </li>
      </ul>
    </nav>

    <!-- RIGHT: PROFILE ICONS -->
    <div class="profile-icons flex items-center gap-4">
      
      <!-- Icon Notifikasi -->
      <div class="notif relative cursor-pointer text-slate-600 hover:text-slate-900">
        <i class="fa-solid fa-bell text-xl"></i>
        <span class="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
      </div>

      <!-- Icon Profile (Circular) -->
      <div class="profile cursor-pointer">
        <a href="#/profile">
            <!-- ID ini digunakan untuk update foto via JS -->
            <img id="nav-profile-img" src="https://ui-avatars.com/api/?name=Guest" alt="Profile" class="w-8 h-8 rounded-full border border-gray-300 object-cover hover:ring-2 hover:ring-blue-500 transition-all">
        </a>
      </div>

    </div>
  </div>
</header>
`;
