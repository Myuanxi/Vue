<style scoped>@import "..";</style>
<template>
	<div class="body">
		<table>
			<thead>
			<tr>

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
						<option value=1>未处理</option>
						<option value=2>已处理</option>
					</select>
					<button @click="fetchReports">筛选</button>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="report in reports" :key="report.id">
				<td>{{ report.id }}</td>
				<td>{{ report.detail }}</td>
				<td><div v-if="report.type==1">帖子</div><div v-if="report.type==2">评论</div></td>
				<td>{{ report.reportedId }}</td>
				<td>{{ report.informerId }}</td>
				<td >
					<div class="button-container" v-if="report.state !== 2">
						<button @click="deleteBeReported(report.id,report)" v-if="report.type==2 && report.state == 1">删除被举报内容</button>
						<button @click="deleteReport(report.id,report)" style="float: right" v-if="report.state == 1">已处理</button>
					</div>
				</td>
				<td><div v-if="report.state==1">未处理</div><div v-if="report.state==2">已处理</div></td>
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
	state: number;
	credit:number;
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

const deleteBeReported = async (id: number,report: Report) => {
	try {
		const response = await axios.post(`http://localhost:8080/report/remove`, report, {
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

const deleteReport = async (id: number,report: Report) => {
	try {
		const response = await axios.post(`http://localhost:8080/report/updateReport`, report, {
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

const updateReportState = async (report: Report) => {
	report.state = 2;
};

onMounted(() => {
	fetchReports();
});
</script>