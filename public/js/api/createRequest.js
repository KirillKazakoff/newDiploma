"use strict"

const createRequest = async (options = {}) => {
    let {url, body, method} = options;
    let result = null; 

    if (method == "GET") {
        let newUrl = `${url}/${body}`;

        if (typeof body == "object") {  
            newUrl = new URL(url, 'http://localhost:8000');
            
            for (let prop in body) {
                newUrl.searchParams.append(prop, body[prop]);
            }
        }

        url = body ? newUrl : url;
    }
    else result = body;


    const request = new Request(url, {method, body: result});
    
    try {
        let response = await fetch(request);
        let json = await response.json();
        return json;
    }
    catch(err) {
        return err;
    }
}























    // return getResponse(request).catch(() => {
    //     setTimeout(() => {
    //         console.clear()
    //         return getResponse(request);
    //     }, 400);
    // })


    // async function getResponse(request) {
    //     let response = await fetch(request);
    //     let result = await response.json();
    //     return result;
    // }