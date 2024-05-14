import React from 'react';
import {NavLink} from 'react-router-dom'
import './Audio.css'
import Navbar from './Navbar';
function Audio(props) {
    return (
        <div>
            <Navbar />
            <div className="Audio">
                <h3>Audio</h3>
            </div>
        </div>
    );
}

export default Audio;
