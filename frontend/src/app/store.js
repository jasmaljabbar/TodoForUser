import { configureStore } from "@reduxjs/toolkit";
import todoReduser from '../features/todo/todoSlice.js'


export default configureStore({
    reducer:{
        todo:todoReduser
    }
})