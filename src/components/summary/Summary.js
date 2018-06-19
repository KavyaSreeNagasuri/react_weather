import React, { Component } from 'react';
import './Summary.css';

function Summary(props) {
        return (
            <div id="p1">
                <p>{props.summaryInfo.cityLocation}</p>
                <p>{props.summaryInfo.day}</p>
                <p>{props.summaryInfo.weatherCondition}</p>
            </div>
        )
}

export default Summary;