export default class RegisterPage {
  render() {
    return `
      <main class="w-full max-w-5xl mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 gap-10 px-5 py-10">

        <section class="bg-gray-100 w-full h-[420px] rounded">
          <img src="/image/register.png" alt="Register Illustration" class="w-full h-full object-cover rounded">
        </section>

        <section class="flex flex-col justify-center">
          <h1 class="text-2xl font-semibold mb-5">Daftar Sekarang</h1>

          <form id="registerForm" class="flex flex-col space-y-4">

            <div>
              <label class="block mb-1 font-medium">Nama</label>
              <input type="text" id="regNama"
                placeholder="Masukkan nama lengkap"
                class="border rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required>
            </div>

            <div>
              <label class="block mb-1 font-medium">Email</label>
              <input type="email" id="regEmail"
                placeholder="Masukkan email"
                class="border rounded-lg w-full px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required>
            </div>

            <div>
              <label class="block mb-1 font-medium">Password</label>
              <input type="password" id="regPassword"
                placeholder="Masukkan password"
                class="border rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required>
            </div>

            <div>
              <label class="block mb-1 font-medium">Alamat Domisili</label>
              <input type="text" id="regAlamat"
                placeholder="Masukkan alamat lengkap"
                class="border rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            </div>

            <div class="flex items-center gap-2 mt-2">
              <input type="checkbox" id="agree" class="w-4 h-4" required>
              <label for="agree" class="text-sm text-red-500">
                Saya setuju dengan <a href="#" class="underline">Syarat dan Kebijakan Privasi</a>.
              </label>
            </div>

            <button type="submit"
              class="bg-[#0b114f] text-white w-full py-2 rounded-lg mt-3 hover:bg-blue-900 transition">
              Daftar
            </button>

          </form>
        </section>

      </main>
    `;
  }

  afterRender() {
    const form = document.getElementById("registerForm");

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("regNama").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const city = document.getElementById("regAlamat").value;

        try {
          const response = await fetch(
            "https://api.rakasatriaefendi.site/api/auth/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
                city,
              }),
            }
          );

          const result = await response.json();
          console.log(result);

          if (!response.ok) {
            alert(`Gagal registrasi: ${result.message}`);
            return;
          }

          alert("Registrasi Berhasil!");

          window.location.hash = "#/login";
        } catch (error) {
          console.error(error);
          alert("Terjadi error koneksi ke server.");
        }
      });
    }
  }
}
