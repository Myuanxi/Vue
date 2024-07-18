<style scoped> @import "..";</style>
<template>
	<div class="table">
		<table>
			<thead>
			<tr>
				<th style="width: 25%">
					<input type="text" v-model="userId" placeholder="用户编号（可填）"/>
				</th>
				<th style="width: 25%">用户姓名</th>
				<th style="width: 25%">
					<select v-model = "select">
						<option value = "执行">执行（可选）</option>
						<option value = "登陆">登陆</option>
						<option value = "购物">购物</option>
						<option value = "出售">出售</option>
						<option value = "发帖">发帖</option>
					</select>
				</th>
				<th style="width: 25%">时间</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="user in userList" :key="user.id">
				<td style="width: 25%" :userId = user.userId>{{ user.userId }}</td>
				<td style="width: 25%">{{ user.name }}</td>
				<td style="width: 25%">{{ user.state }}</td>
				<td style="width: 25%">{{ user.time }}</td>
			</tr>
			</tbody>
		</table>
	</div>

	<div class = "control">
		<button @click = "isBegin">上一页</button>
		<button @click = "isEnd">下一页</button>
	</div>
</template>

<script setup lang="ts">
	import axios from "axios";
	import {onMounted,  ref, watch} from "vue";
	import type { User } from "@/type";
	import {useRouter} from "vue-router";

	const router = useRouter();
	let userId = ref("");
	let select = ref("执行");
	let pageNum = ref(1);
	let msg = "0"

	let userList = ref<User[]>([])

	async function getDataUser() {
		//从后端获取users
		try {
			let response = await axios.get('http://localhost:8080/log/getLogs',{
				params:{
					userId:userId.value,
					select:select.value,
					pageNum:pageNum.value
				},
				headers:{
					"Authorization":sessionStorage.getItem("Authorization")
				}
			});
			if(response.data.msg=='NOTLOGIN'){
				router.push('/login');
			}
			userList.value = response.data.data;
			msg = response.data.msg;

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function isEnd() {
		if(msg === "0") {
			pageNum.value++;
		}
	}

	function isBegin() {
		if(pageNum.value > 1) {
			pageNum.value--;
		}
	}

	watch(pageNum, async () => {
		pageNum.value = 1;
		getDataUser();
	})

	watch(userId, () => {
		pageNum.value = 1;
		getDataUser();
	})

	watch(select, () => {
		pageNum.value = 1;
		getDataUser();
	})

	onMounted(() => {
		pageNum.value = 1;
		getDataUser();
	});
</script>
