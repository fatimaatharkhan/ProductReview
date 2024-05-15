import React from 'react';
import {NavLink} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="firstRow">
                <h3>Reviewify</h3>
                <input type="text" placeholder='Search' />
                <button type='Submit'>Search</button>
                <NavLink to='/login_signup'>
                    <button>Login</button>
                </NavLink>
                <NavLink to='/buisness_profile'>
                    <button>Buisness Profile</button>
                </NavLink>
            </div>
            
            <div className="secondRow">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/3D">3D</NavLink>
                <NavLink to="/audio">Audio</NavLink>
                <NavLink to="/money">Money</NavLink>
                <NavLink to="/gaming">Gaming</NavLink>
            </div>
        </div>
    );
}

export default Navbar;
