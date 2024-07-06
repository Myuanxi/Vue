<style scoped>@import '@';</style>
<template>
	<div class ="app">
		<div class="header">
			<h2>八爪鱼校园二手物品流转平台</h2>
		</div>
		<div class="container">
			<div class="sidebar">
				<RouterLink to="/" active-class="active">用户管理</RouterLink>
				<RouterLink to="/manageReport" active-class="active">举报内容</RouterLink>
				<RouterLink to="/manageAnnouncement" active-class="active">公告发布</RouterLink>
				<RouterLink to="/dataAll" active-class="active">数据报表</RouterLink>
				<RouterLink to="/dataUsers" active-class="active">用户日志</RouterLink>
				<RouterLink to="/dataOrder" active-class="active">订单管理</RouterLink>
				<RouterLink to="/dataProduct" active-class="active">物品管理</RouterLink>
			</div>
			<div class="main-content">
				<RouterView></RouterView>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>