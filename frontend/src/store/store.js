import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slices/login-slice";
import BlogSlice from "./slices/blog-slice";
import AddBlogButtonSlice from "./slices/addBlog-hide";
const store = configureStore({
    reducer: {
        isLogin: LoginSlice.reducer,
        blog: BlogSlice.reducer,
        isAddBlogButton: AddBlogButtonSlice.reducer
    }
})

export default store