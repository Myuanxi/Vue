<style scoped>@import "..";</style>
<template>
	<div class="table">
		<h2>用户管理</h2>
		<div class="search-bar">
			<label for="userId">用户ID</label>
			<input style="background-color: #dddddd" type="text" placeholder="搜索用户" v-model="searchQuery">
			<button @click="searchUser">搜索</button>
		</div>
		<table>
			<thead>
			<tr>
				<th style="width:15%">用户ID</th>
				<th style="width:15%">用户姓名</th>
				<th style="width:10%">购买权限</th>
				<th style="width:10%">出售权限</th>
				<th style="width:10%">用户信誉</th>
				<th style="width:10%">信誉分修改</th>
				<th style="width:15%">通知内容</th>
				<th style="width:10%">发送</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="user in userList" :key="user.id">
				<td style="width:15%">{{ user.id }}</td>
				<td style="width:15%" :userId="user.userId">{{ user.name }}</td>
				<td style="width:10%"><input type="checkbox" v-model="user.canBuy" @change="() => updateUser(user)"></td>
				<td style="width:10%"><input type="checkbox" v-model="user.canSell" @change="() => updateUser(user)"></td>
				<td style="width:10%">{{ user.credit }}</td>
				<td style="width:10%">
					<input type="number" v-model.number="user.credit" @change="() => modifyCredit(user)">
				</td>
				<td style="width:15%"><input type="text" v-model="user.announcement"></td>
				<td style="width:10%"><button @click="() => announceUser(user)">发送</button></td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

const router = useRouter();

interface User {
	id: number;
	userId: string;
	name: string;
	canBuy: boolean;
	canSell: boolean;
	announcement: string;
	credit:number;
}

const searchQuery = ref('');
const userList = ref<Array<User>>([]);

const searchUser = async () => {
	try {
		const response = await axios.get('http://localhost:8080/user/getUserList', {
			params: { query: searchQuery.value },
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
		if (response.data.code === 1) {
			userList.value = response.data.data;
		}
	} catch (error) {
		console.error('Failed to search users:', error);
	}
};

const updateUser = async (user: User) => {
	try {
		const response = await axios.post('http://localhost:8080/user/update', user, {
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
	} catch (error) {
		console.error('Failed to update user:', error);
	}
};

const announceUser = async (user: User) => {
	try {
		const response = await axios.post(`http://localhost:8080/announcement/addAnnouncement`, {
			receiveId: user.id,
			content: user.announcement
		},{
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
	} catch (error) {
		console.error('Failed to announce user:', error);
	}
};

const modifyCredit = async (user: User) => {
	try {
		const response = await axios.post(`http://localhost:8080/user/updateUserCredit`, {
			id: user.id,
			credit: user.credit
		}, {
			headers: {
				"Authorization": sessionStorage.getItem("Authorization")
			}
		});
		if (response.data.msg == 'NOTLOGIN') {
			router.push('/login');
		}
	} catch (error) {
		console.error('Failed to modify credit:', error);
	}
};

onMounted(() => {
	searchUser();
});
</script>