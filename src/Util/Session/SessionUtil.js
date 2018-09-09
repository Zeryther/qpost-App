import axios from 'axios';

class SessionUtil {
	static isLoggedIn(){
		return this.getCurrentUserId() !== null && this.getSessionToken() !== null;
	}

	static validateLogin(callback){
		let userID = this.getCurrentUserId();
		let sesstoken = this.getSessionToken();

		if(this.isLoggedIn()){
			axios.get("https://qpost.gigadrivegroup.com/api/token/verify",{ params: {token: sesstoken, user: userID} })
			.then(res => {
				const data = res.data;

				if(data.hasOwnProperty("status")){
					let status = data.status;

					if(status !== "Token valid"){
						this.logout();
						console.log("Token expired");
					} else {
						SessionUtil.updateCurrentUser(data.user);
					}
				} else if(data.hasOwnProperty("error")){
					console.error(data.error);
				}
				
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
		localStorage.removeItem("qpostsesstoken");
		localStorage.removeItem("qpostuserid");
	}

	static updateCurrentUser(user){
		if(user.id == this.getCurrentUserId()){
			this.currentUser = user;
			localStorage.setItem("currentUser",JSON.stringify(user));
		}
	}

	static getCurrentUser(){
		if(this.currentUser){
			return this.currentUser;
		} else {
			return JSON.parse(localStorage.getItem("currentUser"));
		}
	}
}

export default SessionUtil;
