<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md md:w-1/2">
      <h2 class="text-2xl font-bold text-gray-800 text-center md:text-left mb-4">
        Sign In to Open the World
      </h2>

      <p class="text-gray-600 text-sm mb-6 text-center md:text-left">
        If you don't have an account,<br />
        you can <a class="text-blue-600 hover:underline" @click="goRegister">Register here</a>.
      </p>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <div class="border-b border-gray-300 py-2">
            <input
              type="text"
              placeholder="username"
              v-model="loginForm.username"
              class="w-full px-1 py-1 outline-none text-sm"
              @blur="validateUsername"
            />
          </div>
          <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <div class="border-b border-gray-300 py-2">
            <input
              type="password"
              placeholder="password"
              v-model="loginForm.password"
              class="w-full px-1 py-1 outline-none text-sm"
              @blur="validatePassword"
            />
          </div>
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors"
          :disabled="!isFormValid"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
        >
          Sign In
        </button>
      </form>

      <div class="relative mt-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-2 bg-white text-xs text-gray-500">or continue with</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IndexLogin',
}
</script>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { PageEnum } from '@/enums/pageEnum'

const useStore = useAuthStore()
const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
})

const errors = reactive({
  username: '',
  password: '',
})

const validateUsername = () => {
  if (!loginForm.username.trim()) {
    errors.username = 'username is required'
    return false
  }
  errors.username = ''
  return true
}

const validatePassword = () => {
  if (loginForm.password.length <= 6) {
    errors.password = 'password must be longer than 6 characters'
    return false
  }
  errors.password = ''
  return true
}

const isFormValid = computed(() => {
  return (
    loginForm.username.trim() !== '' &&
    loginForm.password.length > 6 &&
    !errors.username &&
    !errors.password
  )
})

const login = async () => {
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()

  if (!isUsernameValid || !isPasswordValid) {
    return
  }

  try {
    const res = await useStore.login(loginForm)
    router.push({ path: PageEnum.BASE_HOME })
  } catch (error) {
    console.log('Login failed')
  }
}

const goRegister = () => {
  router.push(PageEnum.BASE_REGISTER)
}
</script>

<style scoped>
/* 响应式设计 */
@media (min-width: 768px) {
  .min-h-screen {
    display: flex;
    flex-direction: row;
  }

  .max-w-md {
    max-width: 500px;
  }
}
</style>
