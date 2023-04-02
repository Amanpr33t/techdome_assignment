import './BlogForm.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { AddBlogButtonActions } from "../store/slices/addBlog-hide"

const BlogForm = () => {

    const blog = useSelector(state => state.blog.blog)

    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState(blog.title)
    const [content, setContent] = useState(blog.content)

    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    const editBlog = (blogItem) => {
        fetch('http://localhost:9000/blog/editBlog', {
            method: 'PATCH',
            body: JSON.stringify(blogItem),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('authToken')
            }
        }).then((res) => { return res.json() }
        ).then(data => {
            if (data.status === 'ok') {
                dispatch(AddBlogButtonActions.setAddBlogButton(true))
                history.push('/all_blogs')

            } else {
                console.log('enter content and title')
            }
        })
    }

    const addBlog = (blogItem) => {
        fetch('http://localhost:9000/blog/addBlog', {
            method: 'POST',
            body: JSON.stringify(blogItem),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('authToken')
            }
        }).then((res) => { return res.json() }
        ).then(data => {
            if (data.status === 'ok') {
                dispatch(AddBlogButtonActions.setAddBlogButton(true))
                history.push('/all_blogs')

            } else {
                console.log('enter content and title')
            }
        })
    }

    const buttonClick = () => {
        if (blog.isEdit) {
            if (file !== undefined) {
                const formData = new FormData()
                formData.append('image', file)
                fetch('http://localhost:9000/image/uploadImage', {
                    method: 'POST',
                    body: formData
                }).then((res) => { return res.json() }
                ).then(data => {
                    const blogItem = { title, content, image: data.imagePath.src, blogId: blog._id }
                    editBlog(blogItem)
                })
            } else {
                editBlog({ title, content, image: blog.image, blogId: blog._id })
            }

        } else {
            if (file !== undefined) {
                const formData = new FormData()
                formData.append('image', file)
                fetch('http://localhost:9000/image/uploadImage', {
                    method: 'POST',
                    body: formData
                }).then((res) => { return res.json() }
                ).then(data => {
                    const blogItem = { title, content, image: data.imagePath.src }
                    addBlog(blogItem)
                })
            } else {
                const blogItem = { title, content }
                addBlog(blogItem)
            }
        }

    }
    const contentChange = (e) => {
        setContent(e.target.value)
    }
    const titleChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <>
            <div className="noteForm-container">
                <div className="noteForm">
                    <form action="" >
                        <label htmlFor="title">title</label>
                        <input type="text" name="title" id="title" className="title" value={title} onChange={(e) => titleChange(e)} />
                    </form>
                    <form action="" >
                        <label htmlFor="content">Content</label>
                        <textarea name="content" id="content" value={content} onChange={(e) => contentChange(e)} ></textarea>

                    </form>
                    <form action="" className="imageForm">
                        <div className="addImage">Image:</div>
                        <input type="file" onChange={handleChange} />
                    </form>
                    <div className="button-form">

                        <button onClick={buttonClick}>Save</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BlogForm