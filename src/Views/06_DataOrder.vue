<style scoped>@import "..";</style>
<template>
	<div>
		<table>
			<thead>
			<tr>
				<th style="width: 9%">
					<input type="text" v-model="orderId" placeholder="订单编号"/>
				</th>
				<th style="width: 9%">
					<input type="text" v-model="payId" placeholder="卖家编号"/>
				</th>
				<th style="width: 9%">卖家姓名</th>
				<th style="width: 9%">
					<input type="text" v-model="buyerId" placeholder="卖家编号"/>
				</th>
				<th style="width: 9%">买家姓名</th>
				<th style="width: 9%">
					<input type="text" v-model="goodId" placeholder="物品编号"/>
				</th>
				<th style="width: 9%">交易金额</th>
				<th style="width: 9%">支付时间</th>
				<th style="width: 9%">到货时间</th>
				<th style="width: 9%">到款时间</th>
				<th style="width: 10%">
					<select v-model = "state"><!--已支付，交易中，交易完成，退款-->
						<option value = "全部">全部</option>
						<option value = "已支付">已支付</option>
						<option value = "交易中">交易中</option>
						<option value = "交易完成">交易完成</option>
						<option value = "退款">退款</option>
					</select>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="order in orderList" :key="order.id">
				<td style="width: 9%">{{ order.id }}</td>
				<td style="width: 9%">{{ order.sellerId }}</td>
				<td style="width: 9%">{{ order.sellerName }}</td>
				<td style="width: 9%">{{ order.buyerId }}</td>
				<td style="width: 9%">{{ order.buyerName }}</td>
				<td style="width: 9%">{{ order.goodId }}</td>
				<td style="width: 9%">{{ order.price }}</td>
				<td style="width: 9%">{{ order.timePayed }}</td>
				<td style="width: 9%">{{ order.timeEnd }}</td>
				<td style="width: 9%">{{ order.timePayBack }}</td>
				<td style="width: 10%">{{ order.state }}</td>
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
	import {onMounted, ref, watch} from "vue";
	import type { Order } from "@/type";

	let orderId = ref("")
	let payId = ref("");
	let buyerId = ref("");
	let goodId = ref("");
	let state = ref("全部");
	let pageNum = ref(1);
	let msg = "0"

	let orderList = ref<Order[]>([]);

	async function getDataOrder() {
		try {
			let response = await axios.get('https://your-api-endpoint.com/data',{
				params:{
					pageNum: pageNum.value,
				}
			});

			orderList.value = response.data.data;
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

	watch(pageNum, (value) => {
		if (value < 1) {
			pageNum.value = 1;
		}
		getDataOrder();
	})

	watch(orderId,() => {
		payId.value = "";
		buyerId.value = "";
		goodId.value = "";
		state.value = "";
		getDataOrder()
	})

	watch(payId,() => {
		orderId.value = "";
		getDataOrder()
	})

	watch(buyerId,() => {
		buyerId.value = "";
		getDataOrder()
	})

	watch(goodId,() => {
		goodId.value = "";
		getDataOrder()
	})

	watch(state,() => {
		state.value = "";
		getDataOrder()
	})


	onMounted(() => {
		getDataOrder();
	});
</script>