import { createRouter, createWebHistory } from "vue-router";

import Editor from "./components/Editor";

const routes = [
    {
        path: "/",
        name: "editor",
        component: Editor,
    },
    {
        path: "/:id",
        name: "editor-id",
        component: Editor,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;