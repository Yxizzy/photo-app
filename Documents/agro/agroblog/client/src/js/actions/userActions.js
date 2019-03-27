import { userService } from "../services";
import { appActions } from "./appActions";
import { alertConstant } from "../constants";
import { alertAction } from "./alertActions";

const getLatestBlogs = (number, callback) => dispatch => {
    userService.getLatestBlogs(number, (err, result)=>{
        if(err){
            appActions.showSnackbar(
                alertAction.error(err)
            )(dispatch);
        }
        callback(result);
    });
}
const getTotalBlogCount = callback => dispatch => {
    userService.getTotalBlogCount((err, res) => {
        if(err){
            appActions.showSnackbar(
                alertAction.error(err)
            )(dispatch);
        }
        callback(res);
    })
}
const getPopularArticles = (number, callback) => dispatch=>{
    userService.getPopularArticles(number, (err, articles)=>{
        if(err){
            appActions.showSnackbar(
                alertAction.error(err)
            )(dispatch);
        }
        callback(articles);
    })
}
const getBlogPage = (offset, limit, callback) => dispatch => {
    userService.getBlogPage(offset, limit, (err, blogs)=>{
        if(err){
            appActions.showSnackbar(
                alertAction.error(err)
            )(dispatch);
        }
        callback(blogs)
    })
}
const makePopular = (id, callback) => dispatch => {
    userService.makePopular(id, message=>{
        appActions.showSnackbar(
            alertAction.success(message)
        )(dispatch);
        //use callback later
    })
}
const removePopular = (id, callback) => dispatch => {
    userService.removePopular(id, message=>{
        appActions.showSnackbar(
            alertAction.success(message)
        )(dispatch);
        //use callback later
    })
}
export const userActions = {
    getLatestBlogs, getTotalBlogCount,
    getPopularArticles, getBlogPage,
    makePopular, removePopular
}