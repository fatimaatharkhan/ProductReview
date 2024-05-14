import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Records from './posts.json'
import threeD from './SVGS/threeD.svg'
import Audio from './SVGS/Audio.svg'
import Money from './SVGS/Money.svg'
import Gaming from './SVGS/Gaming.svg'



function Home1({ handleLogout }) {
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
                        <h2>Staff Picks</h2>
                        <div className="cards-container">
                            {postList}
                        </div>
                    </div>
                    <div className="second-section">
                        <h2>Products by Category</h2>
                        <div className="category-container">
                            <Link to="/3D">
                                <div className="boxes" id="box1">
                                    <div className="svgBox">
                                        <img src={threeD} alt="ThreeD Image" />
                                    </div>
                                    <div className="textBox">
                                        <h3>3D</h3>
                                        <p>Perfect your craft with the same tools used at Dreamworks and Pixar.</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/gaming">
                                <div className="boxes" id="box2">
                                    <div className="svgBox">
                                        <img src={Gaming} alt="Gaming Image" />
                                    </div>
                                    <div className="textBox">
                                        <h3>Gaming</h3>
                                        <p>Perfect your craft with the same tools used at Dreamworks and Pixar.</p>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/audio">
                                <div className="boxes" id="box3">
                                    <div className="svgBox">
                                        <img src={Audio} alt="Audio Image" />
                                    </div>
                                    <div className="textBox">
                                        <h3>Audio</h3>
                                        <p>Perfect your craft with the same tools used at Dreamworks and Pixar.</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/money">
                                <div className="boxes" id="box4">
                                    <div className="svgBox">
                                        <img src={Money} alt="Money Image" />
                                    </div>
                                    <div className="textBox">
                                        <h3>Money</h3>
                                        <p>Perfect your craft with the same tools used at Dreamworks and Pixar.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default Home1;
