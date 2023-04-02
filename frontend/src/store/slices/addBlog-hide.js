
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAddBlogButton: true,
}

const AddBlogButtonSlice = createSlice({
    name: 'AddBlogButton',
    initialState: initialState,
    reducers: {
        setAddBlogButton(state, action) {
            state.isAddBlogButton = action.payload
        }
    }
})

export default AddBlogButtonSlice
export const AddBlogButtonActions = AddBlogButtonSlice.actions