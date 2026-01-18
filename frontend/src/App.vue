<template>
	<v-app>
		<Navbar v-if="showNavbar" />
		<v-main>
			<v-container>
				<router-view />
			</v-container>
		</v-main>
		<v-footer v-if="showNavbar">
			<v-spacer></v-spacer>
			<v-btn @click="handleLogout" color="error" variant="elevated"> Logout </v-btn>
			<v-spacer></v-spacer>
		</v-footer>
	</v-app>
</template>

<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import Navbar from "./components/Navbar.vue"

const route = useRoute()
const router = useRouter()
const store = useStore()
const showNavbar = computed(() => route.path !== "/")

const handleLogout = () => {
	store.dispatch("logout")
	router.push("/")
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
