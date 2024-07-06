<style scoped>@import "..";</style>
<template>
	<div>
		<table>
			<thead>
			<tr>
				<th style="width: 17%">
					<input type="text" v-model="goodId" placeholder="商品编号（可填）"/>
				</th>
				<th style="width: 17%">
					<input type="text" v-model="goodName" placeholder="商品名称（可填）"/>
				</th>
				<th style="width: 16%">
					<select v-model = "goodType">
						<option value = "商品品类">商品品类（可选）</option>
						<option value = "登录">食品零食</option>
						<option value = "购物">洗漱日化</option>
						<option value = "出售">钱包服饰</option>
						<option value = "发帖">书籍资料</option>
						<option value = "登录">学习用品</option>
						<option value = "购物">电子数码</option>
						<option value = "出售">电器家具</option>
						<option value = "发帖">代步工具</option>
						<option value = "登录">体育器材</option>
						<option value = "购物">票卡转让</option>
						<option value = "出售">仙女集市</option>
						<option value = "发帖">其他</option>
					</select>
				</th>
				<th style="width: 16%">商品价格</th>
				<th style="width: 17%">
					<input type="text" v-model="userId" placeholder="卖家账户（可填）"/>
				</th>
				<th style="width: 17%">卖家姓名</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="good in goodList" :key="good.goodId">
				<td style="width: 17%">{{ good.goodId }}</td>
				<td style="width: 17%">{{ good.goodName }}</td>
				<td style="width: 16%">{{ good.goodState }}</td>
				<td style="width: 16%">{{ good.price }}</td>
				<td style="width: 17%">{{ good.sellerId }}</td>
				<td style="width: 17%">{{ good.sellerName }}</td>
			</tr>
			</tbody>
		</table>
	</div>
	<div class = "control">
		<div class = "control">
			<button @click = "isBegin">上一页</button>
			<button @click = "isEnd">下一页</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import axios from "axios";
	import {onMounted, reactive, ref, watch} from "vue";
	import type { Good } from "@/type";

	let goodId = ref("");
	let goodName = ref("");
	let userId = ref("");
	let goodType = ref("商品品类");
	let pageNum = ref(1);
	let msg = "0"

	let goodList = ref<Good[]>([]);

	async function getDataGood() {
		try {
			let response = await axios.get('https://your-api-endpoint.com/data',{
				params:{
					goodId:goodId.value,
					goodName:goodName.value,
					userId: userId.value,
					goodType: goodType.value,
					pageNum: pageNum.value,
				}
			});
			goodList = ref(response.data.data);
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
		getDataGood();
	})

	watch(goodId, () => {
		getDataGood();
	})

	watch(goodName, () => {
		getDataGood();
	})

	watch(userId, () => {
		getDataGood();
	})

	watch(goodType, () => {
		getDataGood();
	})

	onMounted(() => {
		getDataGood();
	});
</script>