import Manager from '../manager';

const getBlogs = callback => {
    Manager.fetchGet('blog', 'getBlogs', {nf: 0}, response=>{
        if(response.getBlogs && response.blogs)
            callback(null, response.blogs);
        else callback(response.message);
    })
}
const removeBlog = (id, callback) => {
    Manager.fetchGet('blog', 'deleteBlog', {
        id
    }, response=>{
        callback(response.deleteBlog, response.message);
    });
}
const newBlog = (form, callback) => {
    Manager.fetchPost('blog', 'newBlog', {
        method : "post",
        body : form
    }, response=> {
        if(response.newBlog){
            callback(null, response.blog);
        }else{
            callback(response.message);
        }
    })
}
export const adminService = {
    getBlogs, removeBlog, newBlog
}