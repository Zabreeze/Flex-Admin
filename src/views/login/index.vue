<template>
  <div class="login-container">
    <div class="welcome-container">
      <h1>
        欢迎登录
        <br />
        管理系统
      </h1>
      <h1>Flexi Admin</h1>
    </div>
    <div class="login-form-container">
      <form action="">
        <div>
          <input type="text" placeholder="用户名" />
        </div>
        <div>
          <input type="password" placeholder="密码" />
        </div>
        <div @click="login">
          <input type="submit" value="登录" />
        </div>
      </form>
    </div>
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

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-container {
  flex: 1 0 60%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.welcome-container::before {
  content: '';
  position: absolute;
  top: 15%;
  left: 0;
  width: 280px;
  height: 100px;
  background: linear-gradient(to right, red, #c471ed, #f64f5f);
  z-index: -1;
  filter: blur(70px);
}

.login-form-container {
  flex: 1 0 40%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  div {
    position: relative;
    input {
      font-size: 16px;
      width: 100%;
    }
  }
}
</style>
