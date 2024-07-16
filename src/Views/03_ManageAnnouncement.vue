<style scoped>@import "..";</style>
<template>
	<div class="main-content">
		<form @submit.prevent="submitAnnouncement">
			<div>
				<label for="content">内容:</label>
				<textarea id="content" v-model="newAnnouncement.content" required></textarea>
			</div>
			<button type="submit">发布公告</button>
		</form>
		<div class="announcement-list">
			<h3>历史公告</h3>
			<div v-for="announcement in announcements" :key="announcement.id" class="announcement-item">
				<h4>{{ announcement.time }}</h4>
				<p>{{ announcement.content }}</p>
				<small>{{ new Date(announcement.createdAt).toLocaleString() }}</small>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

const router = useRouter();

interface Announcement {
	id: number;
	time: string;
	content: string;
	createdAt: string;
}

const announcements = ref<Announcement[]>([]);
const newAnnouncement = ref<{ content: string }>({
	content: ''
});

const fetchAnnouncements = async () => {
	try {
		const response = await axios.get('http://localhost:8080/announcement/getAnnouncement',{
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
		if (response.data.code === 1) {
			announcements.value = response.data.data;
		}
	} catch (error) {
		console.error('Failed to fetch announcements:', error);
	}
};

const submitAnnouncement = async () => {
	try {
		const response = await axios.post('http://localhost:8080/announcement/addAnnouncement', newAnnouncement.value,{
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
		newAnnouncement.value.content = '';
		fetchAnnouncements();
	} catch (error) {
		console.error('Failed to submit announcement:', error);
	}
};

onMounted(() => {
	fetchAnnouncements();
});
</script>

<style scoped>
.main-content {
	padding: 20px;
}
.announcement-list {
	margin-top: 20px;
}
.announcement-item {
	border: 1px solid #ddd;
	padding: 10px;
	margin-bottom: 10px;
}
</style>