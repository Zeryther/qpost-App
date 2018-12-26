import React, { Component } from "react";
import LogoDaymode from "./img/qpost-blue-small.png";
import LogoNightmode from "./img/qpost-white-small.png";
import NightMode from './Util/NightMode/NightMode';

class LoadingScreen extends Component<any,any> {
    render(){
        return (
            <div className="text-center h-100">
                <div className="vertical-center text-center">
                    <img src={NightMode.isActive() ? LogoNightmode : LogoDaymode} alt="Logo" style={{height: "60px"}}/>

                    <div className="mt-3">
                        <i className="fas fa-spinner fa-pulse" style={{fontSize: "36px"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadingScreen;