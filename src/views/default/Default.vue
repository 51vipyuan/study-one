<template>
    <div id="default">

        <van-tabbar v-model="active" active-color="green">
            <van-tabbar-item replace to="/default/home">
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active ? home_icon.active : home_icon.normal">
            </van-tabbar-item>
            <van-tabbar-item replace to="/default/category">
                <span>分类</span>
                <img slot="icon" slot-scope="props" :src="props.active ? category_icon.active : category_icon.normal">
            </van-tabbar-item>
            <van-tabbar-item replace to="/default/cart" :info="goodsNum">
                <span>购物车</span>
                <img slot="icon" slot-scope="props" :src="props.active ? cart_icon.active : cart_icon.normal">
            </van-tabbar-item>
            <van-tabbar-item replace to="/default/mine">
                <span>我的</span>
                <img slot="icon" slot-scope="props" :src="props.active ? mine_icon.active : mine_icon.normal">
            </van-tabbar-item>
        </van-tabbar>
        <router-view/>
    </div>

</template>

<script>
    import {mapState } from 'vuex'

    export default {
        name: "Default",
        data() {
            return {
                active: Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
                home_icon: {
                    normal: require('@/images/tabbar/home_default.png'),
                    active: require('@/images/tabbar/home_selected.png')
                },
                category_icon: {
                    normal: require('@/images/tabbar/category_default.png'),
                    active: require('@/images/tabbar/category_selected.png')
                },
                cart_icon: {
                    normal: require('@/images/tabbar/shoppingcart_default.png'),
                    active: require('@/images/tabbar/shoppingcart_selected.png')
                },
                mine_icon: {
                    normal: require('@/images/tabbar/mine_default.png'),
                    active: require('@/images/tabbar/mine_selected.png')
                }
            }
        },
        watch:{
            active(value){
                console.log(value);
                let tabBarActiveIndex = value > 0?value:0;
                // 缓存到本地
                sessionStorage.setItem('tabBarActiveIndex', value);
            }
        },
        computed:{
            ...mapState(['shopCart']),
            goodsNum(){
                let num = 0;
                if(this.shopCart){
                    Object.values(this.shopCart).forEach((goods,index)=>{
                        num += goods.num;
                    });
                }
                return num;
            }
            
        }
    }
</script>

<style lang="less" scoped>
    #default {
        width: 100%;
        height: 100%;
        background-color: yellow;
    }

</style>