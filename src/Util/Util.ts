import axios from "axios";

class Util {
    static http = axios.create({
        baseURL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:3000" : "https://qpost.gigadrivegroup.com/api",
        headers: Util.getSessionToken() !== null ? { "Authorization": "Token " + Util.getSessionToken() } : {}
    });

    static currentUser: any;

	static isLoggedIn(){
		return this.getCurrentUserId() !== null && this.getSessionToken() !== null;
	}

	static validateLogin(callback){
		const userID = this.getCurrentUserId();

		if(this.isLoggedIn()){
			Util.handleRequest("/api/token/verify","POST",{user: userID},data => {
				if(data.hasOwnProperty("status")){
					const status = data.status;

					if(status !== "Token valid"){
						this.logout();
						console.log("Token expired");
					} else {
						Util.updateCurrentUser(data.user);
					}
				} else if(data.hasOwnProperty("error")){
					console.error(data.error);
				}
				callback();
			},() => {
				callback();
			});
		} else {
			this.logout();
		}
	}

	static getSessionToken(){
		return localStorage.getItem("qpostsesstoken") || null;
	}

	static setSessionToken(sesstoken){
		localStorage.setItem("qpostsesstoken",sesstoken);
	}

	static getCurrentUserId(){
		return localStorage.getItem("qpostuserid") || null;
	}

	static setCurrentUserId(id){
		localStorage.setItem("qpostuserid",id.toString());
	}

	static logout(){
		// TODO: Tell API to trash token

		localStorage.removeItem("qpostsesstoken");
		localStorage.removeItem("qpostuserid");
		window.location.href = "/";
	}

	static updateCurrentUser(user){
		if(user.id.toString() === this.getCurrentUserId()){
			this.currentUser = user;
			localStorage.setItem("currentUser",JSON.stringify(user));
		}
	}

	static getCurrentUser(){
		if(this.currentUser){
			return this.currentUser;
		} else {
			const json = localStorage.getItem("currentUser");
			return json !== null ? JSON.parse(json) : null;
		}
	}
    
    static handleRequest(url: string, method?: string, data?: any, callback?: (data: any) => void, errorCallback?: () => void){
        if(url){
            method = method || "GET";

            this.http.request({
                method: method.toLowerCase(),
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