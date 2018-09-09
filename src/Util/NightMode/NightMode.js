class NightMode {
	static isActive(){
		let storedVal = localStorage.getItem("nightMode");

		return storedVal && storedVal === "true" ? true : false;
	}

	static toggle(){
		this.setActive(!this.isActive());
	}

	static setActive(active){
		localStorage.setItem("nightMode",active === true ? "true" : "false");
		window.location.reload();
	}
}

export default NightMode;
