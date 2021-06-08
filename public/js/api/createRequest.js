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

    
    // fetch()


    return new Promise((resolve, reject) => {
        
        const xhr = new XMLHttpRequest;
        xhr.open(method, url)
        xhr.responseType = "json";
        xhr.send(result);
        
        xhr.onload = () => {
            if (xhr.response.success) {
                callback(null, xhr.response)
                resolve(xhr.response)
            }
            else {
                reject(xhr.response.error)
            }
        }

        xhr.onerror = () => {
            reject(new Error("Network Error"))
        }

        // xhr.addEventListener("load", () => {
        //     if (xhr.response.success == true) {
        //         callback(null, xhr.response) 
        //     }
        //     else callback(new Error(xhr.response.error))
        // })
        // xhr.addEventListener("error", (e) => {
        //     console.log(e.type)
        //     throw new Error("net error");
        // })

    })

}

