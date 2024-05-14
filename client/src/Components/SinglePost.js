import React from 'react';
import { Component } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePost.css'
import redux from './redux.png'
import Navbar from './Navbar'
import Records from './posts.json'


const SinglePost = () => {
    const { post_id } = useParams();
    const post = Records && Records.map(record => {
        if (post_id == record.id) {
            return (
                <div className="big-card">
                    <div className="img-box">
                        <img src={record.image_path} alt="nothing" />
                    </div>
                    <div className="title-box">
                        <h2>{record.title}</h2>
                    </div>
                    <div className="other-box">
                        <div className="price-box">
                            <h4>{record.price}</h4>
                        </div>
                        <div className="user-name-box">
                            <h4>{record.posted_by}</h4>
                        </div>
                        <div className="rating-box">
                            <h4>{record.ratings}</h4>
                        </div>
                    </div>
                    <div className="desc-box">
                        <p>{record.description}</p>
                    </div>
                </div>
            )
        }
    })
    return (
        <div>
            <Navbar />
            <div className="SinglePost">
                <div className="wrapper-middle">
                    {post}
                </div>
            </div>
        </div>
    );


}

export default SinglePost;
