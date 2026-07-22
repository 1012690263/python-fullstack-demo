<template>
  <div class="container">
    <h1>🚀 全栈 Demo 应用（Python 版）</h1>
    
    <div class="status-card">
      <h2>后端状态</h2>
      <p v-if="health.status === 'ok'" class="success">
        ✅ 连接正常 | {{ health.timestamp }}
      </p>
      <p v-else class="error">❌ {{ health.message || '连接失败' }}</p>
    </div>

    <div class="form-card">
      <h2>添加用户</h2>
      <input v-model="newUser.name" placeholder="姓名" />
      <input v-model="newUser.email" placeholder="邮箱" />
      <button @click="addUser" :disabled="loading">添加</button>
    </div>

    <div class="list-card">
      <h2>用户列表</h2>
      <button @click="fetchUsers" :disabled="loading">🔄 刷新</button>
      <ul>
        <li v-for="user in users" :key="user.id">
          <strong>{{ user.name }}</strong> — {{ user.email }}
          <button class="delete-btn" @click="deleteUser(user.id)">删除</button>
        </li>
      </ul>
      <p v-if="users.length === 0" class="empty">暂无用户，请添加</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// ⚠️ 注意：Python 后端端口是 5000
// const API_URL = 'http://localhost:5000/api'
const API_URL = '/api'

const health = ref({})
const users = ref([])
const newUser = ref({ name: '', email: '' })
const loading = ref(false)

const fetchHealth = async () => {
  try {
    const res = await fetch(`${API_URL}/health`)
    health.value = await res.json()
  } catch (err) {
    health.value = { status: 'error', message: err.message }
  }
}

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/users`)
    users.value = await res.json()
  } finally {
    loading.value = false
  }
}

const addUser = async () => {
  if (!newUser.value.name || !newUser.value.email) return
  loading.value = true
  try {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser.value)
    })
    newUser.value = { name: '', email: '' }
    await fetchUsers()
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  loading.value = true
  try {
    await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' })
    await fetchUsers()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHealth()
  fetchUsers()
})
</script>

<style>
.container { max-width: 600px; margin: 40px auto; padding: 20px; font-family: system-ui; }
h1 { text-align: center; color: #333; }
.status-card, .form-card, .list-card { 
  background: #f5f5f5; border-radius: 12px; padding: 20px; margin: 20px 0; 
}
.success { color: #22c55e; }
.error { color: #ef4444; }
.empty { color: #999; font-style: italic; }
input { padding: 10px; margin: 5px; border: 1px solid #ddd; border-radius: 6px; width: 200px; }
button { 
  padding: 10px 20px; background: #3b82f6; color: white; border: none; 
  border-radius: 6px; cursor: pointer; margin: 5px;
}
button.delete-btn {
  background: #ef4444; padding: 5px 12px; font-size: 12px; float: right;
}
button:disabled { opacity: 0.5; cursor: not-allowed; }
button:hover:not(:disabled) { opacity: 0.9; }
ul { list-style: none; padding: 0; }
li { padding: 10px; border-bottom: 1px solid #e5e5e5; overflow: hidden; }
</style>