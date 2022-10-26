<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <ul>
    <li><RouterLink to="/">Home</RouterLink></li>
    <li><RouterLink to="/about">About</RouterLink></li>
  </ul>
  <RouterView />
</template>

<style scoped>
</style>
