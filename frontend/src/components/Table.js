import React, { useEffect } from "react"
import './Table.css'
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { BlogActions } from "../store/slices/blog-slice"
import { AddBlogButtonActions } from "../store/slices/addBlog-hide"

const Table = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('http://localhost:9000/blog/getAllBlogs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('authToken')
            }
        }).then((res) => { return res.json() }
        ).then(data => {
            if (data.status === 'ok') {
                setBlogs(data.allBlogs)
            } else {
                console.log('some error occured')
            }
        })
    }, [])

    const openBlog = (blog) => {
        dispatch(BlogActions.setBlog({ ...blog, isEdit: false }))
        dispatch(AddBlogButtonActions.setAddBlogButton(false))
        history.push('/blog')
    }
    const editBlog = (blog) => {
        dispatch(BlogActions.setBlog({ ...blog, isEdit: true }))
        dispatch(AddBlogButtonActions.setAddBlogButton(false))
        history.push('/add_edit_blog')
    }

    return (
        <>
            <div className="table_container">
                <div className="table">
                    {blogs.length !== 0 && blogs.map((blog) => {
                        return (<div className="item" key={blog._id}>
                            <img className="image" src={blog.image} />
                            <div className="data">
                                <div className="title">{blog.title}</div>
                            </div>
                            <div className="buttons">
                                <div className="open" onClick={() => { openBlog(blog) }}>Open</div>
                                <div className="edit" onClick={() => { editBlog(blog) }}>Edit</div>
                            </div>
                            <div className="border"></div>
                        </div>)
                    })}


                </div>
            </div>
        </>
    )
}
export default Table