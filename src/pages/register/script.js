import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="register-container">
    <div class="image-placeholder">
      <img src=https://i.pinimg.com/474x/6b/01/38/6b013853077a4f3ad7e374810c49531b.jpg />
    </div>


    <div class="form-section">
      <h2>Daftar Sekarang</h2>
      <form id="register-form">
        <input type="text" placeholder="Nama" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="text" placeholder="Asal Kota" required />

        <div class="terms">
          <input type="checkbox" id="agree" required />
          <label for="agree">
            <strong class="warning-text">Saya setuju dengan Syarat dan Kebijakan Privasi.</strong>
          </label>
        </div>

        <button type="submit" class="btn-login">Login</button>
      </form>
    </div>
  </div>
`;

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Registrasi berhasil!');
});
