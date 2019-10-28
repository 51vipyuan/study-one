<template>
    <div id="category">
        <Header/>
        <div class="listWrapper">
            <div class="leftWrapper">
<!--                <Nav :categoriesData="categoriesData"/>-->
                <ul class="wrapper" >
                    <li class="categoryItem " v-for="(categorie, index) in categoriesData"
                        :class="{selected:currentIndex == index}"
                        :key="categorie.id" @click="clickLeftLi(index)" ref="menuList">
                        <span class="textWrapper">{{categorie.name}}</span>
                    </li>
                </ul>
            </div>
            <ContentView :categoriesDetailData="categoriesDetailData"/>
        </div>
    </div>
</template>

<script>

    import Header from "./components/header/Header";
    import Nav from "./components/nav/Nav";
    import ContentView from "./components/content/ContentView";

    // 2. 引入滚动组件
    import BScroll from 'better-scroll'

    import {getCategories,getCategoriesDetail} from './../../service/api/index';

    export default {
        name: "Category",

        data(){
          return {
              currentIndex:0,
              // 左边列表数据
              categoriesData: [],
              // 右边详情信息
              categoriesDetailData:[]
          }
        },

        created() {
            this.initData();
            // 初始化滚动框
            this.$nextTick(()=>{
                this.leftScroll = new BScroll('.leftWrapper', {
                    probeType: 3,
                    click: true,
                    scrollY: true,
                    tap: true,
                    mouseWheel:true
                })
            })
        },

        components:{
            Header,
            Nav,
            ContentView
        },

        methods: {
            async initData() {
                let leftRes = await getCategories();
                // console.log(leftRes);
                if (leftRes.success){
                    this.categoriesData = leftRes.data.cate;
                }
                let detailsRes = await getCategoriesDetail('/lk001');
                if (detailsRes.success) {
                    this.categoriesDetailData = detailsRes.data.cate;
                }
                // console.log(detailsRes);
            },
            // 处理左边的点击
            async clickLeftLi(index){
                // 改变索引
                this.currentIndex = index;
                let menuList = this.$refs.menuList;
                let el = menuList[index];
                console.log(el);
                // 滚动到对应元素上
                this.leftScroll.scrollToElement(el, 300);
                // 获取右边的数据
                let rightRes = await getCategoriesDetail(`/lk00${index + 1}`);
                if (rightRes.success) {
                    this.categoriesDetailData = rightRes.data.cate;
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    #category{
        width: 100%;
        height: 100%;
        background-color: gold;
    }

    .listWrapper {
        display: flex;
        position: absolute;
        top: 2.75rem;
        bottom: 3rem;
        width: 100%;
        overflow: hidden;
    }

    .leftWrapper {
        background-color: #F4F4F4;
        width: 5.3125rem;
        flex: 0 0 5.3125rem;
    }

    .categoryItem {
        position: relative;
        padding: 0.75rem 0;
        border-bottom: solid 1px #E8E9E8;
    }

    .categoryItem .textWrapper {
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }
    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #3cb963;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }
        .wrapper .categoryItem {
            background: #fff;
        }
    }

</style>