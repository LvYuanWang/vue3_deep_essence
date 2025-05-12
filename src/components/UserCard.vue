<template>
  <div class="userCard-container">
    <div class="img-box">
      <img :src="avatar" alt="User Avatar" class="avatar" />
    </div>
    <div class="userCard-content">
      <h2 class="userCard-name">{{ name }}</h2>
      <span>{{ email }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/50',
  },
})
</script>

<style scoped>
.userCard-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #ededed;
  margin-bottom: 10px;
  gap: 10px;
}

.img-box {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.userCard-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.userCard-name {
  font-size: 1.2em;
  margin: 0;
}
</style>
