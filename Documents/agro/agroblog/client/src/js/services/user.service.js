import Manager from "../manager";

const getTotalBlogCount = callback =>{
    Manager.fetchGet('blog', 'getTotalBlogCount', {}, res=>{
        if(res.getTotalBlogCount){
            callback(null, res.count)
        }else callback("Something went wrong!")
    })
}
const getLatestBlogs = (number, callback) => {
    Manager.fetchGet("blog", "getLatestBlogs", {n: number}, result=>{
        if(result.getLatestBlogs){
            callback(null, result.blogs);
        }else callback(result.message);
    })
}
const getPopularArticles = (number, callback)=>{
    Manager.fetchGet('blog', 'getPopularBlogs', 
    {nf: 0, number}, result=>{ 
        if(result.getPopularBlogs){
            callback(null, result.blogs)
        }else callback("Something went wrong! Unable to get popular articles");
    })
}
const getBlogPage = (offset, limit, callback) =>{
    Manager.fetchGet('blog', 'getBlogsBrief', 
    {offset, limit}, res=>{
        if(res.getBlogsBrief){
            callback(null, res.blogs);
        }else callback(res.message);
    })
}
const makePopular = (id, callback) => {
    Manager.fetchGet('blog', 'makePopular', {id}, res=>{
        callback(res.message)
        // if(res.makePopular){
        // }
    })
}
const removePopular = (id, callback) => {
    Manager.fetchGet('blog', 'removePopular', {id}, res=>{
        callback(res.message);
        //
    })
}
export const userService = {
    getTotalBlogCount, getLatestBlogs,
    getPopularArticles, getBlogPage, 
    makePopular, removePopular
}