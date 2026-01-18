<template>
	<v-container fluid class="fill-height">
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card elevation="8">
					<v-card-title class="text-h5 text-center bg-primary">
						Welcome to HyperGuest
					</v-card-title>
					<v-card-text class="pa-6">
						<v-form @submit.prevent="handleLogin">
							<v-text-field
								v-model="username"
								label="Username"
								variant="outlined"
								density="comfortable"
								:rules="[(v) => !!v || 'Username is required']"
							></v-text-field>

							<v-alert v-if="error" type="error" variant="tonal" class="mb-4">
								{{ error }}
							</v-alert>

							<v-btn
								type="submit"
								block
								color="primary"
								size="large"
								:disabled="!username"
							>
								Login
							</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()
const store = useStore()
const username = ref("")
const error = ref("")

const handleLogin = async () => {
	try {
		error.value = ""
		await store.dispatch("login", username.value)
		router.push("/home")
	} catch (err) {
		error.value =
			err.response?.data?.message || "Login failed. Please try again."
	}
}
</script>

<style scoped>
.fill-height {
	min-height: 100vh;
}
</style>
