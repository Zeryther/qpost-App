import axios from "axios";

class Util {
    static http = axios.create({
		baseURL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:3000" : "https://qpost.gigadrivegroup.com/api",
    });
    
    static handleRequest(url: string,method: string,data?: object,callback?: (data: object) => void,errorCallback?: () => void){
        if(url){
            method = method || "GET";

            this.http.request({
                method,
                url,
                data: method !== "GET" ? data : {},
                params: method === "GET" ? data : {}
            }).then(response => {
                if(response.data){
                    if(callback){
                        callback(response.data);
                    }
                } else {
                    if(errorCallback){
                        errorCallback();
                    }
                }
            }).catch(error => {
                if(errorCallback){
                    errorCallback();
                }
            })
        } else {
            throw new Error("No URL specified");
        }
    }
}

export default Util;