import React from 'react';
import {NavLink} from 'react-router-dom'
import './ThreeD.css'
import Navbar from './Navbar';
function ThreeD() {
    return (
        <div>
            <Navbar />
            <div className="ThreeD">
                <h3>ThreeD</h3>
            </div>
        </div>
    );
}

export default ThreeD;
