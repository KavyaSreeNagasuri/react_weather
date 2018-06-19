import React, { Component } from 'react';
import './Temperature.css';

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempe: this.props.temperatureInfo.tempInCelsius
        }
        this.changeTemp=this.changeTemp.bind(this);
        this.changeIntoFahrenheit=this.changeIntoFahrenheit.bind(this);
    }
    changeIntoFahrenheit(){
        this.setState({
            tempe:this.props.temperatureInfo.tempInFahrenheit
        })
    }
    changeTemp(){
        this.setState({
            tempe:this.props.temperatureInfo.tempInCelsius
        })
    }
    render() {
        return (
            <div>
                <span id="c1"></span>
                <div className="banner-left">
                    <div className="column1">
                        <img src={this.props.temperatureInfo.imageURL}  id="img1" />
                    </div>
                    <div className="column2" id="temp-disp">
                        <div className="col2_1">
                            <span>
                                {this.state.tempe===''?this.props.temperatureInfo.tempInCelsius:this.state.tempe}
                            </span>
                        </div>
                        <div class="col2_2">
                            <a className="buttons" onClick={this.changeTemp}>&#8451;</a>|
                            <a className="buttons"onClick={this.changeIntoFahrenheit}>&#8457;</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Temperature;