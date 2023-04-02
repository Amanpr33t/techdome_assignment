import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LoginActions } from "../store/slices/login-slice"
import { BlogActions } from "../store/slices/blog-slice"
import { AddBlogButtonActions } from "../store/slices/addBlog-hide"

const Navbar = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.isLogin.isLogin)
    const isAddBlogButton = useSelector(state => state.isAddBlogButton.isAddBlogButton)
    const logout = () => {
        localStorage.clear()
        dispatch(LoginActions.setLogin(false))
        dispatch(AddBlogButtonActions.setAddBlogButton(true))
    }

    return (
        <>

            <div className='navbar'>
                {isLogin && <>{isAddBlogButton && <Link className="add_blog_button_navbar" to='/add_edit_blog' onClick={() => { dispatch(BlogActions.setBlog({})) }}>Add Blog</Link>}
                    <Link className="blog_button_navbar" to='/all_blogs' onClick={() => { dispatch(AddBlogButtonActions.setAddBlogButton(true)) }}>All Blogs</Link>
                    <Link className="logout_button_navbar" onClick={logout} to='/signUp'>Logout</Link></>}
                {!isLogin &&
                    <><Link className="signUp_button_navbar" to='/signUp' onClick={() => { dispatch(AddBlogButtonActions.setAddBlogButton(true)) }}>SignUp</Link>
                        <Link className="login_button_navbar" to='/login' onClick={() => { dispatch(AddBlogButtonActions.setAddBlogButton(true)) }}>Login</Link>
                    </>}

            </div>

        </>
    )
}
export default Navbar