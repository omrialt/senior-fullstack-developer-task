import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import store from "../store"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("../views/Home.vue"),
		meta: { authRequired: true },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { authRequired: true, isAdminPage: true },
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { authRequired: true, isEditorPage: true },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = store.getters.isAuthenticated

	if (to.meta.authRequired && !isAuthenticated) {
		next({ name: "Login" })
	} else if (to.meta.isAdminPage && !store.getters.isAdmin) {
		next({ name: "Home" })
	} else if (to.meta.isEditorPage && !store.getters.isEditor) {
		next({ name: "Home" })
	} else {
		next()
	}
})

export default router
