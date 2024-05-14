import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import redux from './redux.png';
import axios from 'axios';
import Navbar from './Navbar';

function Home1({ handleLogout }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // console.log(handleLogout); // This should correctly log the function passed as a prop
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setPosts(res.data.slice(0, 5));
            });
    }, [handleLogout]); // The empty array ensures this runs only once when the component mounts
    const postList = posts.length ? (
        posts.map(post => {
            return (
                <div className="card" key={post.id}>
                    <Link to={'/' + post.id} >
                        <div className="imgBox">
                            <img src={redux} alt="nothing" />
                        </div>
                        <div className="title">
                            <h3>{post.title}</h3>
                        </div>
                        <div className="user-name">
                            <h3>username</h3>
                        </div>
                        <div className="rating">
                            <h3>rating</h3>
                        </div>
                        <div className="price">
                            <h3>price</h3>
                        </div>
                    </Link>
                </div>
            )
        })
    ) : (
        <p> No Posts yet</p>
    )
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
                </div>
            </div>
        </div>
    );


}

export default Home1;
