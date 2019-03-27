let blog = require('../entities/en_blog');

module.exports = function(req, res){
    console.log("action =", req.params.action);
    switch(req.params.action){
        case "newBlog" : blog.newBlog(req, res);break;
        case "getBlogs" : blog.getBlogs(req, res); break;
        case "getBlogsBrief" : blog.getBlogsBrief(req, res); break;
        case "deleteBlog" : blog.deleteBlog(req, res); break;
        case "getLatestBlogs" : blog.getLatestBlogs(req, res); break;
        case "getPopularBlogs" : blog.getPopularBlogs(req, res); break;
        case "getTotalBlogCount" : blog.getTotalBlogCount(req, res); break;
        case "makePopular" : blog.makePopular(req, res); break;
        case "removePopular" : blog.removePopular(req, res); break;
    }
}