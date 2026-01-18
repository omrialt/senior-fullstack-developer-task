<template>
	<v-app-bar color="primary" density="comfortable" elevation="2">
		<v-app-bar-title> User Management </v-app-bar-title>

		<v-spacer></v-spacer>

		<v-btn v-for="link in accessibleLinks" :key="link.path" :to="link.path" variant="text">
			{{ link.name }}
		</v-btn>
	</v-app-bar>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const allLinks = [
	{
		name: "Home",
		path: "/home",
		roles: ["Admin", "Editor", "User"],
	},
	{
		name: "Editor",
		path: "/editor",
		roles: ["Admin", "Editor"],
	},
	{
		name: "Admin",
		path: "/admin",
		roles: ["Admin"],
	},
]

const accessibleLinks = computed(() => {
	const userRoles = store.state.user?.roles || []
	return allLinks.filter((link) =>
		link.roles.some((role) => userRoles.includes(role))
	)
})
</script>

<style scoped>
.v-btn {
	text-transform: none;
}
</style>
