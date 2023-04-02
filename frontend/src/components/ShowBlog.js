import React from "react"
import './ShowBlog.css'
import { useSelector } from "react-redux"
const ShowBlog = () => {
    const blog = useSelector(state => state.blog.blog)
    return (
        <>
            <div className="show_blog_container">

                <img className="source-image-box" alt="../torii-forest-illustration\ 1.jpg" src={blog.image} />

                <div className="heading">{blog.title}</div>
                <div className="content">{blog.content} </div>

            </div>
        </>
    )
}
export default ShowBlog