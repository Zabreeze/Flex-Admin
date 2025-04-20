<template>
  <div>
    我是登录
    <button @click="login">点我登录</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IndexLogin',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { loginApi } from '../../api/modules/auth'
const data = ref({
  username: 'admin',
  password: '123456',
})

const login = async () => {
  console.log('点击了登录')
  const result = await loginApi(data)
  console.log(result)
}
</script>

<style></style>
