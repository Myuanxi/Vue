<style scoped>@import "@";</style>

<template>
	<div class="app">
		<RouterView></RouterView>

		</div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import LoginComponent from '@/Views/00_Login.vue';
</script>