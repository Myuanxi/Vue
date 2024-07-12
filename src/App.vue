<style scoped>@import "@";</style>

<template>
	<div class="app">
		<div class="head" v-if="isLoggedIn">
			<button @click="isLoggedIn = false" style="
				float: right;
				background-color: red;
				height: 30px;
				width: 80px;
				color: white;
				border: white;
				border-radius: 15px;

			">退出登录</button>
			<h1>&emsp;&emsp;&emsp;&emsp;&emsp;八爪鱼校园二手物品流转平台</h1>
		</div>

		<div class="main" v-if="isLoggedIn">
			<div class="tag">
				<RouterLink to="/" active-class="active">用户管理</RouterLink>
				<RouterLink to="/manageReport" active-class="active">举报内容</RouterLink>
				<RouterLink to="/manageAnnouncement" active-class="active">公告发布</RouterLink>
				<RouterLink to="/dataAll" active-class="active">数据报表</RouterLink>
				<RouterLink to="/dataUsers" active-class="active">用户日志</RouterLink>
				<RouterLink to="/dataOrder" active-class="active">订单管理</RouterLink>
				<RouterLink to="/dataProduct" active-class="active">物品管理</RouterLink>
			</div>

			<div class="body">
				<RouterView></RouterView>
			</div>
		</div>

		<div v-else>
			<LoginComponent @login="handleLogin"></LoginComponent>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { ref } from 'vue';
import LoginComponent from '@/Login.vue';

const isLoggedIn = ref(false);

const handleLogin = () => {
	isLoggedIn.value = true;
};
</script>