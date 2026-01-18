<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" md="8">
				<v-card elevation="4">
					<v-card-title class="text-h4 text-center pa-6 bg-error">
						Admin Dashboard
					</v-card-title>
					<v-card-text class="text-center pa-8">
						<p class="text-h5">Welcome, {{ username }}!</p>
						<p class="text-subtitle-1 mt-2">You have full administrative access</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const username = computed(() => store.state.user?.username || "Admin")
</script>
