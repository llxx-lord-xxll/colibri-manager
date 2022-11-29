import { createRouter, createWebHashHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
{
    path: "/clients",
    children: [
        {
            meta: {
                title: "Clients",
            },
            path: "",
            name: "clients",
            component: () => import("@/views/Clients.vue"),
        },
        {
            meta: {
                title: "New client",
            },
            path: "new",
            name: "addClient",
            component: () => import("@/views/AddClient.vue"),
        },
    ]
},
    {
        meta: {
            title: "Backup/Restore",
        },
        path: "/backup-restore",
        children: [
            {
                meta: {
                    title: "Clients",
                },
                path: "",
                name: "backuprestore",
                component: () => import("@/views/BackupRestore.vue"),
            },
            {
                meta: {
                    title: "Create Backup",
                },
                path: "new",
                name: "createBackup",
                component: () => import("@/views/CreateBackup.vue"),
            },
            ]
    },

  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
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
    return savedPosition || { top: 0 };
  },
});

export default router;
