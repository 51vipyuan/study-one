<template>
    <div id="order">
        <!--导航栏-->
        <van-nav-bar
                title="填写订单"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>

        <!--收货地址-->
        <van-contact-card
                :type="address_type"
                add-text="选择收货地址"
                :name="address_name"
                :tel="address_phone"
                @click="chooseAddress"
                style="margin-top: 3rem"
        ></van-contact-card>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" :value="arriveDate" @click="showDatePopup" is-link></van-cell>
            <router-link :to="{path: '/confirmOrder/orderDetail'}">
                <van-cell :value="`共${goodsCount}件`" is-link :center=true>
                    <template slot="title">
                        <img v-for="(goods, index) in threeShopCart" :key="index" :src="goods.small_image" alt="" style="width: 3rem;">
                    </template>
                </van-cell>
            </router-link>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text" style="text-align: right" placeholder="选填，备注您的特殊需求！" v-model="notice">
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" :value="`¥${totalPrice}`"></van-cell>
            <van-cell title="配送费" :value="`¥${disPrice}`"></van-cell>
        </van-cell-group>

        <van-submit-bar
                :price="totalPrice*100 + disPrice*100"
                button-text="提交订单"
                label="实付"
                @submit="onSubmit">
        </van-submit-bar>

        <!--弹出日期组件-->
        <van-popup v-model="dateShow" round position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="onDateCancel"
                @confirm="onDateConfirm"
            >
            </van-datetime-picker>
        </van-popup>

        <!--支付二维码-->
        <van-popup  v-model="isPay" round position="center">
            <qriously :value="qrcode" :size="200" />
        </van-popup>

        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Moment from 'moment'
    export default {
        data(){
            return {
                address_name : null,
                address_phone : null,
                address_type : 'add',
                address_id : null,

                // 2. 日期
                dateShow: false,
                minDate: new Date(),
                maxDate: new Date(2021, 10, 1),
                currentDate: new Date(),
                // 3. 送达时间
                arriveDate: '请选择送达时间',
                // 4. 备注
                notice: null,

                isPay: false, // 是否显示二维码蒙版
                qrcode: null, // 生成二维码的URL地址
            }
        },
        computed:{
            ...mapState(['shopCart']),
            // 商品总件数
            goodsCount(){
                let selectedGoodsCount = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        selectedGoodsCount += 1;
                    }
                });
                return selectedGoodsCount;
            },
            // 商品总价
            totalPrice(){
                let totalPrice = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        totalPrice += goods.price * goods.num;
                    }
                });
                return totalPrice.toFixed(2);
            },
            // 取购物车中前三件选中的
            threeShopCart(){
                let shopCart = [];
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        shopCart.push(goods);
                    }
                });
                return shopCart.slice(0, 3);
            },
            // 配送费
            disPrice(){
                // 商品总价 > 40 免配送费  <40 6元
                if(this.totalPrice > 40){
                    return 0;
                }else {
                    return 6;
                }
            }
        },
        methods:{
            // 点击左边
            onClickLeft(){
                this.$router.back();
            },
            // 选择地址
            chooseAddress(){
                this.$router.push('/order/myAddress');
            },
            // 提交订单
            onSubmit(){
                this.$router.push('/order/orderDetail');
            },
            // 送达时间
            showDatePopup(){
                this.dateShow = true;
            },
            onDateCancel(){
                this.dateShow = false;
            },
            onDateConfirm(value){
                this.dateShow = false;
                this.arriveDate = Moment(value).format('YYYY-MM-DD hh:mm');
            }
        }
    }
</script>

<style scoped>
    #order {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }

    /*转场动画*/
    .router-slider-enter-active, .router-slider-leave-active {
        transition: all 0.3s;
    }

    .router-slider-enter, .router-slider-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>