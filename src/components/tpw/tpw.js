import React, { Component } from 'react';
import './tpw.css';

function Tpw(props) {
    return (
        <div>
            <div className="c2">
                <p>Pressure: {props.tpwInfo.pressure}Hg</p>
                <p>Humidity: {props.tpwInfo.humidity}%</p>
                <p>Wind Speed: {props.tpwInfo.windSpeed}km/h</p>
            </div>
            <div className="c3">
                <button className="btn btn-default" >Temperature</button>
                <button className="btn btn-default" >Pressure</button>
                <button className="btn btn-default" >Wind</button>
            </div>
        </div>
    )
}

export default Tpw;