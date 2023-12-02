import { Router } from "./router.js";

const router = new Router();

router.add("/", "/assets/pages/home.html");
router.add("/universo", '/assets/pages/universe.html');
router.add("/exploracao", "/assets/pages/exploration.html");
router.add(404, "/assets/pages/404.html");

router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();