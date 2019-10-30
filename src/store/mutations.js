import {
    ADD_GOODS,
    INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS,
    SELECTED_All_GOODS,
    CLEAR_CART
} from "./mutations-type"

import {getStore,removeStore,setStore} from './../config/global'
import Vue from 'vue'

export default {
    // 往购物车里添加数据
    [ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}){
        let shopCart = state.shopCart;
        // 判断商品是否存在
        if(shopCart[goodsId]) {
            shopCart[goodsId]['num']++;
        } else {
            shopCart[goodsId] = {
                "num":1,
                "id":goodsId,
                "name":goodsName,
                "small_image":smallImage,
                "price":goodsPrice,
                "checked":true
            }
        }
        // 产生新对象
        state.shopCart = {...shopCart};
        //存入本地
        setStore("shopCart",state.shopCart);
        console.log(JSON.stringify(state));
    },
    // 页面初始化，获取购物车的数据（本地）
    [INIT_SHOP_CART](state){
        let initCart = getStore("shopCart");
        if(initCart){
            state.shopCart = JSON.parse(initCart);
        }
    },
    // 购物车移除商品
    [REDUCE_CART](state,{goodsId}){
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];
        if(goods){
            if(goods['num']>0){
                goods['num']--;
                if(goods['num'] === 0){
                    delete shopCart[goodsId];
                }
            } else{
                goods = null;
            }
            state.shopCart = {...shopCart};
            setStore('shopCart',state.shopCart);
        }
    },
    [SELECTED_SINGER_GOODS](state,{goodsId}){
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];
        if(goods){
            if(goods.checked){
                goods.checked = !goods.checked;
            } else {
                Vue.set(goods, "checked", true);
            }
            state.shopCart = {...shopCart};
            setStore('shopCart', state.shopCart);
        }
    },
    [SELECTED_All_GOODS](state,{isSelected}){
        console.log(isSelected);
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((goods,index)=>{
            goods.checked = !isSelected;
        });
        state.shopCart = {...shopCart};
    }


}

