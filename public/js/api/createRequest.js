"use strict"
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */


const createRequest = (options = {}) => {
    let {url, callback, data, method} = options;
    let result = null; 

    if (method == "GET") {
        let newUrl = null;

        if (typeof data == "object"){
            newUrl = new URL(url, 'http://localhost:8000');
    
            for (let prop in data) {
                newUrl.searchParams.append(prop, data[prop]);
            }
        }
        else {
           newUrl = `${url}/${data}`;
        }

        url = data ? newUrl : url;
    }
    else result = data;

    const xhr = new XMLHttpRequest;
    try {
        xhr.open(method, url)
        xhr.responseType = "json";
        xhr.withCredentials = true;
        console.log(xhr);
        xhr.send(result);
        
        xhr.addEventListener("load", () => {
            try {
                // console.log(xhr.responseURL);
                if (xhr.response.success == true) {
                    callback(null, xhr.response) 
                }
                else throw new Error(xhr.response.error)
            }
            catch(e) {
                callback(e)
            }
        })
    }
    catch(e) {
        console.log(e.message);
    }

}




        // xhr.addEventListener("readystatechange", () => {
        //     if (xhr.readyState == 4 && xhr.status > 210) {
        //         console.log("something");
        //         xhr.abort();
        //     }
        // })


        // const entries = result.entries();
        // for (let item of entries) {
        //     const key = item[ 0 ],
        //     value = item[ 1 ];
        //     console.log(`${key}: ${value}`);
        // }