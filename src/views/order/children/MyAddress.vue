<template>
    <div id="myAddress">
        <!--导航栏-->
        <van-nav-bar
                title="我的地址"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="onBackAddress"
                style="margin-top: 3rem"
        ></van-address-list>

        <!--出口出口出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    // import {getUserAddress} from './../../../service/api/index'
    import {mapState} from 'vuex'
    import PubSub from 'pubsub-js'
    export default {
        data(){
            return {
                chosenAddressId: '1',
                list: []
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            onAdd(){
                // Toast('新增地址');
                this.$router.push({
                    path:'/order/myAddress/addAddress'
                });
            },
            onEdit(item, index){
                // Toast('编辑地址：'+index);
                this.$router.push('/order/myAddress/editAddress');
            },
            // 返回选中的地址
            onBackAddress(item, index){
                if(item){
                    // 发布地址数据
                    PubSub.publish('userAddress', item);
                    // 返回上一级界面
                    this.$router.back();
                }
            }
        }
    }
</script>

<style scoped>
    #myAddress{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        /* z-index: 200; */
    }

    /*转场动画*/
    .router-slider-enter-active, .router-slider-leave-active{
        transition: all 0.3s;
    }

    .router-slider-enter, .router-slider-leave-active{
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

</style>