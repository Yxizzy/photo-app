import { adminConstant, alertConstant } from '../constants';
import { adminService } from '../services';
import { appActions } from './appActions';


const getBlogs = () => dispatch => {
    adminService.getBlogs((err, blogs) => {
        if(blogs){
            dispatch({
                type : adminConstant.BEND_SET_BLOGS,
                payload: blogs
            })
        }else{
            appActions.showSnackbar({
                variant: "warning",
                message: err
            })(dispatch);
        }
    })
    
}

const removeBlog = id => dispatch => {
    adminService.removeBlog(id, (deleted, message)=>{
        if(deleted){
            appActions.showSnackbar({
                variant : alertConstant.SUCCESS,
                message
            })(dispatch);
            dispatch({
                type: adminConstant.BEND_REMOVE_BLOG,
                payload: id
            })
        }else{
            appActions.showSnackbar({
                variant : alertConstant.WARNING,
                message
            })(dispatch);
        }
    })    
}
const newBlog = (form, callback) => dispatch =>{
    adminService.newBlog(form, (err, blog)=>{
        if(blog){
            appActions.showSnackbar({
                variant: alertConstant.SUCCESS,
                message : "Blog added!"
            })(dispatch)
            callback(blog);
        }else{
            appActions.showSnackbar({
                variant: alertConstant.WARNING,
                message : err
            })(dispatch);
            callback(null);
        }
    })
}

export const adminActions = {
    getBlogs, removeBlog, newBlog
}