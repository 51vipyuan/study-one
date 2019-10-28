<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper" >
        <!-- slides -->
        <swiper-slide v-for="(carousel, index) in carousel_list" :key="index">
            <img :src="carousel.icon_url"/>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
<!--        <div class="swiper-pagination"  slot="pagination"></div>-->
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
<!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "Carousel",
        props: {
            carousel_list:Array
        },
        data(){
            return {
                swiperOption:{
                    notNextTick: true,
                    //分页
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    //循环
                    loop : true,
                    // 切换时长
                    autoplay: {
                        delay: 1000
                    },
                    // 速度
                    speed: 600,
                    on: {

                    }
                }
            }
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.swiper;
            }
        },
        components:{
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    #swiper {
        width: 100%;
        height: 14rem;
        background-color: transparent;
    }
    #swiper img {
        width: 100%;
        height: 100%;
    }

    #swiper >>> .swiper-pagination-bullet-active{
        background-color: #75a342 ;
    }

</style>