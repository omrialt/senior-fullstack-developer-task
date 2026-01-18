import { createStore } from "vuex"
import axios from "axios"

export default createStore({
	state: {
		user: null,
	},
	getters: {
		isAuthenticated: (state) => !!state.user,
		currentUser: (state) => state.user,
		isAdmin: (state) => state.user?.roles?.includes("Admin") || false,
		isEditor: (state) =>
			state.user?.roles?.includes("Editor") ||
			state.user?.roles?.includes("Admin") ||
			false,
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user
		},
		CLEAR_USER(state) {
			state.user = null
		},
	},
	actions: {
		async login({ commit }, username) {
			try {
				const response = await axios.post(`/api/users/login/${username}`)
				commit("SET_USER", response.data)
				return response.data
			} catch (error) {
				commit("CLEAR_USER")
				throw error
			}
		},
		async fetchUserData({ commit }, username) {
			try {
				const response = await axios.get("/api", {
					headers: {
						token: username,
					},
				})
				commit("SET_USER", response.data)
				return response.data
			} catch (error) {
				commit("CLEAR_USER")
				throw error
			}
		},
		logout({ commit }) {
			commit("CLEAR_USER")
		},
	},
	modules: {},
})
