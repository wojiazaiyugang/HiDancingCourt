<template>
	<view>
    <!-- 上方搜索 -->
		<view class="search">
			<view class="searchIput">
				<input type="text" placeholder="输入你要搜索的内容" placeholder-style='color:grey' v-model="inputs">
				<image src='@/static/search.png' />
			</view>
		</view>
    
		<view class="dataInfo">
			<view class="dataList" v-for="(item,index) in searchData" :key="index" @click="clicks">
				<checkbox-group @change="checkClick(item)">
					<checkbox :checked="item.checked" />
				</checkbox-group>
				<view class="details">
					<view class="img">
						<image :src="item.url"></image>
					</view>
					<view class="text">
						<text>{{item.name}}</text>
						<text>{{item.trip}}</text>
						<text>￥{{item.price}}/张</text>
					</view>
				</view>
				<view class="action">
					<text @click="reduce(item)">-</text>
					<text>{{item.num}}</text>
					<text @click="add(item)">+</text>
				</view>
			</view>
		</view>
		<view class="buy">
			<view class="checked">
				<checkbox-group @tap="checkAll">
					<checkbox :checked="allChecked" />
				</checkbox-group>
				<text>全选</text>
			</view>
			<view class="total">
				<view class="price">
					<text>总计：</text>
					<text>￥{{totalPrice}}</text>
				</view>
				<view class="bill">
					<text>结算</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				allChecked: false,
				inputs: "",
				list: [{
						trip: "飞机-轮船-国际火车",
						num: 1,
						checked: false, 
						price: 149,
						name: '波兰斯维诺乌伊希切',
						url: "https://img-blog.csdnimg.cn/2ebd84257f154cb8848aab94dd663bb4.png",
					},
					{
						trip: "飞机-轮船-国际火车",
						num: 1,
						checked: false,
						price: 240,
						name: '冰岛尼斯湖',
						url: "https://img-blog.csdnimg.cn/6cc01905e7e942bdadb574af1079ae15.png",
					},
					{
						trip: "飞机-轮船-汽车-火车",
						num: 1,
						checked: false,
						price: 410,
						name: '云南西双版纳',
						url: "https://img-blog.csdnimg.cn/23ad5958b6534375b42cee837eeaefbf.png",
					},
					{
						trip: "飞机-轮船-汽车-火车",
						num: 1,
						checked: false,
						price: 500,
						name: '阿尔卑斯雪山',
						url: "https://img-blog.csdnimg.cn/8717f0e8d2b64efebcdc9c506a39bd61.png",
					},
				],
			}
		},
		computed: {
			totalPrice() {
				//总计金额
				var str = 0;
				for (var i = 0; i < this.searchData.length; i++) {
					if (this.searchData[i].checked) {
						str += this.searchData[i].num * this.searchData[i].price;
					}
				}
				return str;
			},
			searchData: function() {
				//模糊查询
				if (!this.inputs) {
					return this.list;
				}
				return this.list.filter((item) => {
					return item.name.includes(this.inputs);
				});
			},
		},
		methods: {
      clicks() {
        // console.log('123')
        // console.log(this.searchData)
      },
			add(item) { //加加
				let num = item.num
				item.num = num + 1
			},
			reduce(item) { //减减
				let num = item.num
				if (num > 1) {
					num -= 1
				} else if (num = 1) {
					uni.showToast({
						title: "该宝贝不能减少了哟~"
					})
				}
				item.num = num
			},
			// 单个商品的选择
			checkClick(item) {
        console.log(item)
				item.checked = !item.checked
				if (!item.checked) {
					this.allChecked = false
				} else {
					// 判断每一个商品是否是被选择的状态
					const goods = this.list.every(item => {
						return item.checked === true
					})
					if (goods) {
						this.allChecked = true
					} else {
						this.allChecked = false
					}
				}
			},
			//全选、全不选
			checkAll() {
				this.allChecked = !this.allChecked
				if (this.allChecked) {
					this.list.map(item => {
						item.checked = true
					})
				} else {
					this.list.map(item => {
						item.checked = false
					})
				}
			}
		}
	}
</script>
 
 
<style>

 
	.search {
		padding-top: 20rpx;
	}
 
	.search .searchIput {
		background-color: #e6e6e6;
		width: 95%;
		margin: 0 auto;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 50rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
 
	.search .searchIput input {
		font-size: 26rpx;
		width: 100%;
		color: grey;
	}
 
	.search .searchIput image {
		width: 34rpx;
		height: 34rpx;
	}
 
 
 
	.dataInfo {
		width: 95%;
		margin: 0 auto;
	}
 
	.dataInfo .dataList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid #F1F1F1;
		padding: 25rpx 0;
	}
 
	.dataInfo .dataList .details {
		display: flex;
		align-items: center;
		flex: 1;
		font-size: 0;
	}
 
	.dataInfo .dataList .details .img image {
		width: 200rpx;
		height: 140rpx;
		padding: 0 20rpx;
	}
 
	.dataInfo .dataList .details .text text {
		color: #000;
		font-size: 23rpx;
		display: block;
		padding: 10rpx 0;
	}
 
	.dataInfo .dataList .details .text text:last-child {
		color: red;
		font-size: 25rpx;
	}
 
	.dataInfo .dataList .action text {
		font-size: 25rpx;
		color: #000;
		border: 1px solid #C8C7CC;
		display: inline-block;
		line-height: 50rpx;
		width: 60rpx;
		text-align: center;
		box-sizing: border-box;
	}
 
	.dataInfo .dataList .action text:nth-child(2) {
		border-left: none;
		border-right: none;
	}
 
	.buy {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 50%;
		bottom: 0;
		width: 95%;
		transform: translate(-50%, 0);
	}
 
	.buy .checked {
		display: flex;
		align-items: center;
	}
 
	.buy .checked text {
		font-size: 25rpx;
		color: #000;
		padding: 0 12rpx;
	}
 
	.buy .total {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
 
	.buy .total .price {
		padding-right: 20rpx;
 
	}
 
	.buy .total .price text {
		font-size: 27rpx;
		color: #C8C7CC;
		display: inline-block;
	}
 
	.buy .total .price text:last-child {
		color: red;
		font-weight: bold;
	}
 
	.buy .total .bill text {
		font-size: 25rpx;
		color: #fff;
		display: inline-block;
		background-color: red;
		line-height: 70rpx;
		width: 150rpx;
		text-align: center;
	}
</style>
