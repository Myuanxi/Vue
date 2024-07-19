<style scoped>@import "..";</style>
<template>
	<div class="table">
		<table>
			<thead>
			<tr>
				<th style="width: 8%">
					<input type="text" v-model="orderId" placeholder="订单编号"/>
				</th>
				<th style="width: 9%">
					<input type="text" v-model="payId" placeholder="卖家编号"/>
				</th>
				<th style="width: 8%">卖家姓名</th>
				<th style="width: 9%">
					<input type="text" v-model="buyerId" placeholder="买家编号"/>
				</th>
				<th style="width: 8%">买家姓名</th>
				<th style="width: 10%">
					<input type="text" v-model="goodId" placeholder="物品编号"/>
				</th>
				<th style="width: 8%">交易金额</th>
				<th style="width: 11%">支付时间</th>
				<th style="width: 11%">到货时间</th>
				<th style="width: 11%">到款时间</th>
				<th style="width: 7%">
					<select v-model = "state">
						<option value = "全部">全部</option>
						<option value = "已支付">已支付</option>
						<option value = "交易中">交易中</option>
						<option value = "交易已完成">交易已完成</option>
						<option value = "退款">退款</option>
					</select>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="order in orderList" :key="order.id">
				<td style="width: 8%">{{ order.id }}</td>
				<td style="width: 9%">{{ order.good.sellerId }}</td>
				<td style="width: 8%">{{ order.good.sellerName }}</td>
				<td style="width: 9%">{{ order.buyer.id }}</td>
				<td style="width: 8%">{{ order.buyer.name }}</td>
				<td style="width: 10%">{{ order.good.goodId }}</td>
				<td style="width: 8%">{{ order.good.price }}</td>
				<td style="width: 11%">{{ order.payTime }}</td>
				<td style="width: 11%">{{ order.payBackTime }}</td>
				<td style="width: 11%">{{ order.endTime }}</td>
				<td style="width: 7%">{{ order.state }}</td>
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
	import {useRouter} from "vue-router";

	const router = useRouter();
	let orderId = ref("")
	let payId = ref("");
	let buyerId = ref("");
	let goodId = ref("");
	let state = ref("全部");
	let pageNum = ref(1);
	let msg = "0"
	let id = ref("")
	let orderList = ref<Order[]>([]);

	async function getDataOrder() {
		try {
			let response = await axios.get('http://localhost:8080/order/getOrderList',{
				params:{
					orderId:orderId.value,//订单编号
					sellerId:payId.value,//卖家编号
					buyerId:buyerId.value,//买家编号
					goodId:goodId.value,//商品
					state:state.value,//订单状态
					pageNum: pageNum.value,
				},
				headers:{
				"Authorization":sessionStorage.getItem("Authorization")
			}
			});
			if(response.data.msg=='NOTLOGIN'){
				router.push('/login');
			}
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
		pageNum.value = 1;
		getDataOrder()
	})

	watch(payId,() => {
		pageNum.value = 1;
		getDataOrder()
	})

	watch(buyerId,() => {
		pageNum.value = 1;
		getDataOrder()
	})

	watch(goodId,() => {
		pageNum.value = 1;
		getDataOrder()
	})

	watch(state,() => {
		pageNum.value = 1;
		getDataOrder()
	})

	onMounted(() => {
		pageNum.value = 1;
		getDataOrder();
	});
</script>