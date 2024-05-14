import React from 'react';
import {NavLink} from 'react-router-dom'
import './Money.css'
import Navbar from './Navbar';

function Money() {
    return (
        <div>
            <Navbar />
            <div className="Money">
                <h3>Money</h3>
            </div>
        </div>
    );
}

export default Money;
