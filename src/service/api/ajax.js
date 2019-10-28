import axios from 'axios'

export default function ajax(url = '', params = {},type = 'GET') {
    let promise;

    return new Promise((resolve, reject) => {
        if (type.toUpperCase() == 'GET'){
            let paramsStr = '';
            if (params){
                Object.keys(params).forEach(name => {
                    paramsStr += name + "=" + params[name]+"&";
                })
                if (paramsStr){
                    paramsStr.substr(0,paramsStr.lastIndexOf("&"));
                    url += "?"+paramsStr;
                }
            }
            promise = axios.get(url);
        } else if (type.toUpperCase() === 'POST'){
            promise = axios.post(url, params);
        }
        // 处理结果返回
        promise.then((response)=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        })
    })

    return promise;
}