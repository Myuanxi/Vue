<style scoped>@import "..";</style>
<template>
	<div class="table">
		<table>
			<thead>
			<tr>
				<th style="width: 10%">
					<input v-model="goodId" placeholder="商品编号"/>
				</th>
				<th style="width: 57%">
					<input v-model="goodName" placeholder="商品名称"/>
				</th>
				<th style="width: 8%">
					<select v-model = "type">
						<option value = "商品种类">商品品类</option>
						<option value = "食品零食">食品零食</option>
						<option value = "洗漱日化">洗漱日化</option>
						<option value = "钱包服饰">钱包服饰</option>
						<option value = "书籍资料">书籍资料</option>
						<option value = "学习用品">学习用品</option>
						<option value = "电子数码">电子数码</option>
						<option value = "电器家具">电器家具</option>
						<option value = "代步工具">代步工具</option>
						<option value = "体育器材">体育器材</option>
						<option value = "其他">其他</option>
					</select>
				</th>
				<th style="width: 8%">商品价格</th>
				<th style="width: 9%">
					<input type="text" v-model="userId" placeholder="卖家账户"/>
				</th>
				<th style="width: 8%">卖家姓名</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="good in goodList" :key="good.goodId">
				<td style="width: 10%">{{ good.goodId }}</td>
				<td style="width: 57%">{{ good.goodName }}</td>
				<td style="width: 8%">{{ good.type }}</td>
				<td style="width: 8%">{{ good.price }}</td>
				<td style="width: 9%">{{ good.sellerId }}</td>
				<td style="width: 8%">{{ good.sellerName }}</td>
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
	import {onMounted, ref, watch} from "vue";
	import type { Good } from "@/type";
	import {useRouter} from "vue-router";

	const router = useRouter();
	let goodId = ref("");
	let goodName = ref("");
	let userId = ref("");
	let type = ref("商品种类");
	let pageNum = ref(1);
	let msg = "0"

	let goodList = ref<Good[]>([]);

	async function getDataGood() {
		try {
			let response = await axios.get('http://localhost:8080/good/getGoodList',{
				params:{
					goodId:goodId.value,//编号
					goodName:goodName.value,//名字
					userId: userId.value,//发布者ID
					goodType: type.value,//种类
					pageNum: pageNum.value,//页数
				},
				headers:{
					"Authorization":sessionStorage.getItem("Authorization")
				}
			});
			if(response.data.msg=='NOTLOGIN'){
				router.push('/login');
			}
			goodList.value = response.data.data;
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

	watch(type, () => {
		getDataGood();
	})

	onMounted(() => {
		getDataGood();
	});
</script>