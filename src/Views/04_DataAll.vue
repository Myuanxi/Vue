<style scoped>@import "..";</style>
<template>

	<div class="control-All">
		<select v-model = "time">
			<option :value = "7" @click="getDataAll">近 7 天（可选）</option>
			<option :value = "10" @click="getDataAll">近 10 天</option>
			<option :value = "15" @click="getDataAll">近 15 天</option>
			<option :value = "30" @click="getDataAll">近 30 天</option>
		</select>
	</div>

	<div>
		<canvas id="myChart"></canvas>
	</div>

</template>

<script setup lang="ts">
import axios from "axios";
import {reactive, onMounted, ref, watch} from "vue";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { type Data } from "@/type";

let dataList: Data[] = reactive([]);
let data: Data[] = [];

let time = ref(7);
let myChart: Chart | null = null;

async function getDataAll() {
	//从后端获取data
	try {
		let response = await axios.get('http://localhost:8080/data/getData',{
			params:{
				time: time.value,
			}
		});
		data = response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	for (let index = 0; index < time.value; index++) {
		dataList.push(data[index]);
	}
	drawChart();
	dataList.length = 0;
}


function drawChart() {
	const ctx = document.getElementById('myChart') as HTMLCanvasElement;

	if (myChart) {
		myChart.destroy(); // 销毁旧的图表实例喵
	}

	myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dataList.map(item => (item.time)),
			datasets: [
				{
					label: '交易量',
					data: dataList.map(item => item.transaction),
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
					fill: false
				},
				{
					label: '交易金额',
					data: dataList.map(item => item.amount),
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1,
					fill: false
				},
				{
					label: '登录量',
					data: dataList.map(item => item.login),
					borderColor: 'rgba(255, 206, 86, 1)',
					borderWidth: 1,
					fill: false
				}
			]
		},
		options: {
			scales: {
				x: {
					beginAtZero: true
				},
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

onMounted(() => {
	getDataAll();
});

watch(time, () => {
	getDataAll();
})

</script>


