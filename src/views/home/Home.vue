<template>
    <div id="home">
        <div>
            <!--头定位-->
            <Header/>
            <!--轮播图-->
            <Carousel :carousel_list="carousel_list"/>
            <!--导航-->
            <Nav :nav_list="nav_list"/>
            <!--秒杀-->
            <FlaseSale :flash_sale_product_list="flash_sale_product_list"/>
            <!--猜你喜欢-->
            <YouLike :you_like_product_list="you_like_product_list"/>
            <!--返回顶部-->
            <MarkPage v-if="showBackStatus" :scrollToTop="scrollToTop"/>
        </div>
    </div>
</template>

<script>
    import {getHomeData} from "../../service/api/index";

    import Header from "./components/header/Header";
    import Carousel from "./components/carousel/Carousel";
    import Nav from "./components/nav/Nav";
    import FlaseSale from "./components/flashSale/FlaseSale";
    import YouLike from "./components/youLike/YouLike";
    import MarkPage from "./components/markPage/MarkPage";

    // 3. 引入处理返回顶部的函数
    import {showBack, animate} from "@/config/global";

    export default {
        name: "Home",

        data(){
          return {
              // 首页轮播图
              carousel_list:[],
              // 导航
              nav_list:[],
              // 秒杀
              flash_sale_product_list:[],
              // 你喜欢的
              you_like_product_list:[],
              showBackStatus:false
          }
        },

        created(){
          this.reqData();
        },


        components: {
            Header,
            Carousel,
            Nav,
            FlaseSale,
            YouLike,
            MarkPage
        },

        methods:{
            async reqData(){
                let res = await getHomeData();
                console.info(res);
                if (res.success) {
                    this.carousel_list = res.data.list[0].icon_list;
                    this.nav_list = res.data.list[2].icon_list;
                    this.flash_sale_product_list = res.data.list[3].product_list;
                    this.you_like_product_list = res.data.list[12].product_list;

                    // 开始监听滚动, 到达一定位置就显示返回顶部按钮
                    showBack((status)=>{
                        // console.log(status);
                        this.showBackStatus = status;
                    });
                }
            },
            // 1. 滚回顶部
            scrollToTop() {
                // 做缓动动画返回顶部
                let docB = document.documentElement || document.body;
                animate(docB, {scrollTop: '0'}, 400, 'ease-out');
            },
        }
    }

</script>

<style lang="less" scoped>
    #home{
        width: 100%;
        height: 300rem;
        background-color: #f5f5f5;
    }

</style>