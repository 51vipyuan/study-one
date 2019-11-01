<template>
    <div id="addAddress">
        <!--导航栏-->
        <van-nav-bar
                title="添加地址"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            style="margin-top: 2.875rem"
            />
    </div>
</template>

<script>
    import {Toast} from 'vant'

    import areaList from './../../../../config/area'

    export default {
        data(){
            return {
                areaList:areaList,
                searchResult: []
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            onSave(){
                Toast('save');
            },
            onDelete(){
                Toast('delete');
            },
            onChangeDetail(val){

            }
        }
    }
</script>

<style scoped>
    #addAddress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 999;
    }
</style>