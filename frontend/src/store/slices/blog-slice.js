
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    blog: {}
}

const BlogSlice = createSlice({
    name: 'Blog',
    initialState: initialState,
    reducers: {
        setBlog(state, action) {
            state.blog = action.payload
        }
    }
})

export default BlogSlice
export const BlogActions = BlogSlice.actions