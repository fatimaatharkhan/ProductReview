import React from 'react';
import {Link} from 'react-router-dom'
import './Money.css'
import Navbar from './Navbar';
import Records from './posts.json'

function Money() {
    let i = 0
    const chotiList = Records &&
        Records.map(post => {
            if (i < 3) {
                i++;
                return (
                    <div className="card thory-bary-card" key={post.id}>
                        <Link to={'/' + post.id} >
                            <div className="imgBox">
                                <img src={post.image_path} alt="nothing" />
                            </div>
                            <div className="title">
                                <h3>{post.title}</h3>
                            </div>
                            <div className="user-name">
                                <h3>{post.posted_by}</h3>
                            </div>
                            <div className="rating">
                                <h3>{post.ratings}</h3>
                            </div>
                            <div className="price">
                                <h3>{post.price}</h3>
                            </div>
                        </Link>
                    </div>
                )
            }
            else
                return null
        })
    const postList = Records &&
        Records.map(post => {
            return (
                <div className="card" key={post.id}>
                    <Link to={'/' + post.id} >
                        <div className="imgBox">
                            <img src={post.image_path} alt="nothing" />
                        </div>
                        <div className="title">
                            <h3>{post.title}</h3>
                        </div>
                        <div className="user-name">
                            <h3>{post.posted_by}</h3>
                        </div>
                        <div className="rating">
                            <h3>{post.ratings}</h3>
                        </div>
                        <div className="price">
                            <h3>{post.price}</h3>
                        </div>
                    </Link>
                </div>
            )
        })
    return (
        <div>
            <Navbar />
            <div className="home">
                <div className="wrapper-middle">
                    <div className="first-section">
                        <h2>Staff Picks Money</h2>
                        <div className="cards-container">
                            {postList}
                        </div>
                    </div>
                    <div className="second-section">
                        <h2>Best Selling Products</h2>
                        <div className="cards-container">
                            {chotiList}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default Money;
