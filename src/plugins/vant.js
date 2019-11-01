import Vue from 'vue';

//顶部导航
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);


import { Toast } from 'vant';
Vue.use(Toast);

// 弹出框
import { Dialog } from 'vant';
Vue.use(Dialog);


import { NavBar } from 'vant';
Vue.use(NavBar);

// Cell 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

//Grid 宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard).use(ContactList).use(ContactEdit);

import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

import { Popup } from 'vant';
Vue.use(Popup);

import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

// AddressList 地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);

// 地址编辑
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);