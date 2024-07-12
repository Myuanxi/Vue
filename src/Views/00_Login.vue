<template name="Login">
	<div>
		<h1 align="center">八爪鱼校园二手物品流转平台后台管理系统</h1>

		<div class="login-container">
			<h2>管理员登录</h2>
			<form @submit.prevent="login">
				<label for="id">管理员ID:</label>
				<input type="text" v-model="id" required>
				<label for="password">密码:</label>
				<input type="password" v-model="password" required>
				<button type="submit">登录</button>
			</form>
			<div id="message">{{ message }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const id = ref('');
const password = ref('');
const message = ref('');
const kind = ref(0);

const login = async () => {
	try {
		const response = await axios.post('http://localhost:8080/user/login', {
			id: id.value,
			password: password.value,
			kind: kind.value
		});

		if (response.data.code === 1) {
			// 登录成功，通知父组件
			const emit = defineEmits(['login']);
			emit('login');
		} else {
			message.value = response.data.message;
		}
	} catch (error) {
		console.error('Error:', error);
		message.value = '登录失败，请稍后再试。';
	}
	emit('login');
};
</script>

<style scoped>
.login-container {
	background-color: rgb(160, 244, 244);
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	width: 300px;
	margin: 0 auto;
}

h2 {
	margin-bottom: 20px;
	text-align: center;
}

label {
	display: block;
	margin-bottom: 5px;
}

input {
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 3px;
}

button {
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	border: none;
	color: white;
	border-radius: 3px;
	cursor: pointer;
}

button:hover {
	background-color: #0056b3;
}

#message {
	margin-top: 10px;
	color: red;
	text-align: center;
}
</style>