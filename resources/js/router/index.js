import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/views/HomeView.vue";
import store from '@/stores'

const routes = [
    {
        meta: {
            title: "Login",
            middleware: "guest",
        },
        path: "/",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
    },
    {
        // Document title tag
        // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
        meta: {
            title: "Dashboard", middleware: "auth",
        },
        path: "/dashboard",
        name: "dashboard",
        component: Home,
    },
    {
        meta: {
            middleware: "auth"
        },
        path: "/clients",
        children: [
            {
                meta: {
                    title: "Clients",
                    middleware: "auth",
                },
                path: "",
                name: "clients",
                component: () => import("@/views/Clients.vue"),
            },
            {
                meta: {
                    title: "New client",
                    middleware: "auth",
                },
                path: "new",
                name: "addClient",
                component: () => import("@/views/AddClient.vue"),
            },
        ]
    },
    {
        meta: {
            middleware: "auth",
        },
        path: "/backup-restore",
        children: [
            {
                meta: {
                    title: "Backup/Restore",
                    middleware: "auth",
                },
                path: "",
                name: "backuprestore",
                component: () => import("@/views/BackupRestore.vue"),
            },
            {
                meta: {
                    title: "Create Backup",
                    middleware: "auth",
                },
                path: "new",
                name: "createBackup",
                component: () => import("@/views/CreateBackup.vue"),
            },
        ]
    },
    {
        meta: {
            title: "Profile", middleware: "auth",
        },
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
    },
    {
        meta: {
            title: "Error",middleware: "auth",
        },
        path: "/error",
        name: "error",
        component: () => import("@/views/ErrorView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {top: 0};
    },
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware === "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router;
