import React from 'react';
import { Component } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePost.css'
import redux from './redux.png'

const SinglePost = () => {
    const {post_id} = useParams();
    return (
        <div className="SinglePost">
            <p>{post_id}</p>
        </div>
    );


}

export default SinglePost;
