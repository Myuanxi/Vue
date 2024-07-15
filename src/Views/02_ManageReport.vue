<style scoped>@import "..";</style>
<template>
	<div class="body">
		<table>
			<thead>
			<tr>
				<th>用户ID</th>
				<th>举报信息ID</th>
				<th>举报内容</th>
				<th>举报类型
					<select v-model="type">
						<option value="0">所有类型</option>
						<option value="1">帖子</option>
						<option value="2">评论</option>
					</select>
					<button @click="fetchReports">筛选</button>
				</th>
				<th>被举报帖子/评论ID</th>
				<th>举报人ID</th>
				<th>操作</th>
				<th>状态
					<select v-model="state">
						<option value="">所有状态</option>
						<option value="未处理">未处理</option>
						<option value="已处理">已处理</option>
					</select>
					<button @click="fetchReports">筛选</button>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="report in reports" :key="report.id">
				<td>{{ report.id }}</td>
				<td>{{ report.reportId }}</td>
				<td>{{ report.detail }}</td>
				<td>{{ report.type }}</td>
				<td>{{ report.reportedId }}</td>
				<td>{{ report.informerId }}</td>
				<td>
					<div class="button-container">
						<button @click="deleteBeReported(report.reportId)">删除被举报内容</button>
						<button @click="deleteReport(report.id)">未发现问题</button>
					</div>
				</td>
				<td>{{ report.state }}</td>
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

interface Report {
	id: number;
	reportId: number;
	detail: string;
	type: number;
	reportedId: number;
	informerId: string;
	state: string;
}

const reports = ref<Report[]>([]);
const state = ref<string>('');
const type = ref<number>(0);

const fetchReports = async () => {
	try {
		const response = await axios.get('http://localhost:8080/report/getReports', {
			params: { selectType: type.value, selectState: state.value },
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if (response.data.code === 1) {
			reports.value = response.data.data;
		}
	} catch (error) {
		console.error('Failed to fetch reports:', error);
	}
};

const deleteBeReported = async (reportId: number) => {
	try {
		const response = await axios.delete(`http://localhost:8080/report/deleteBeReported`, {
			params: { reportId },
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
		fetchReports();
	} catch (error) {
		console.error('Failed to delete reported content:', error);
	}
};

const deleteReport = async (id: number) => {
	try {
		const response = await axios.delete(`http://localhost:8080/report/deleteReport`, {
			params: { id },
			headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
		});
		if(response.data.msg=='NOTLOGIN'){
			router.push('/login');
		}
		fetchReports();
	} catch (error) {
		console.error('Failed to delete report:', error);
	}
};

onMounted(() => {
	fetchReports();
});
</script>