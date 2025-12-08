import LandingPage from "../src/pages/landing/landing.js";
import LoginPage from "../src/pages/login/login.js";
import RegisterPage from "../src/pages/register/register.js";
import RuntutanPage from "../src/pages/dashboard/runtutan.js";
import ProgressPage from "../src/pages/dashboard/progress.js";
import LanggananPage from "../src/pages/dashboard/langganan.js";
import ProfilePage from "../src/pages/profile/profile.js";

const routes = {
  "/": new LandingPage(),
  login: new LoginPage(),
  register: new RegisterPage(),
  runtutan: new RuntutanPage(),
  progress: new ProgressPage(),
  langganan: new LanggananPage(),
  profile: new ProfilePage(),
};

export default routes;
