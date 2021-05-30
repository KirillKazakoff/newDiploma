/**
 * Основная функция для совершения запросов
 * на сервер.
 * */


const createRequest = (options = {}) => {
    let {url, callback, data, responseType, method, headers} = options;

    // let result = method == "GET" ? new URLSearchParams(url) : new FormData;

    let result = null
    if (method == "GET") {
        result = new URLSearchParams(url)
        for (prop in data) {
            result.append(prop, data[prop]);
        }
        url = data ? result : url;
    }
    else result = data;
    
    const xhr = new XMLHttpRequest;
    xhr.open(method, url)
    xhr.responseType = responseType;
    xhr.withCredentials = true;


    xhr.send(result);
    // xhr.addEventListener("error", () => )
    xhr.addEventListener("load", () => {
        try {
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




        // xhr.addEventListener("readystatechange", () => {
        //     if (xhr.readyState == 4 && xhr.status > 210) {
        //         console.log("something");
        //         xhr.abort();
        //     }
        // })