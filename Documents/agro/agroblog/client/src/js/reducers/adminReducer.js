import { adminConstant } from '../constants';
export const adminReducer =  (state = {
    blogs : []
}, action)=>{
    switch(action.type){
        case adminConstant.BEND_SET_BLOGS : {
            return {...state, blogs: action.payload};
        }
        case adminConstant.BEND_REMOVE_BLOG : {
            let newBlogs = [...state.blogs];
            newBlogs.forEach((blog, index)=>{
                if(blog._id == action.payload)
                    newBlogs.splice(index, 1);
            })
            return {...state, blogs: newBlogs};
        }
        default : return state;
    }
}