import ajax from './ajax'

const BASE_URL = "http://demo.itlike.com/web/xlmc";

export const getHomeData = ()=> ajax(BASE_URL + "/api/homeApi");
export const getCategories = ()=> ajax(BASE_URL + "/api/homeApi/categories");
export const getCategoriesDetail = (preParams) => ajax(BASE_URL+"/api/homeApi/categoriesdetail"+preParams);

// 添加新的地址
export const addUserAddress = (user_id,address_name,address_phone,address_area,address_area_detail, address_post_code, address_tag, province,city, county, areaCode)=> ajax(BASE_URL+'/api/address/add',{user_id,address_name,address_phone,address_area,address_area_detail, address_post_code, address_tag, province,city, county, areaCode},"POST");