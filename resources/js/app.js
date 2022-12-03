import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useMainStore } from "./stores/main.js";
import { useStyleStore } from "./stores/style.js";
import store from '@/stores'
import { darkModeKey, styleKey } from "./config.js";

import "./../../resources/css/main.css";

/* Init Pinia */
const pinia = createPinia();
const app = createApp(App)
app.use(router).use(pinia).mount("#app");
app.use(store)

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
    (!localStorage[darkModeKey] &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    localStorage[darkModeKey] === "1"
) {
    styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Colibri Manager";

/* Set document title from route meta */
router.afterEach((to) => {
    document.title = to.meta?.title
        ? `${to.meta.title} — ${defaultDocumentTitle}`
        : defaultDocumentTitle;
});

