var vm_blog = require('./vm_blog');

class en_blog{
    static newBlog(req, res){
        this.vm_blog.newBlog(req, result=>res.send(result));
    }
    static getBlogs(req, res){
        this.vm_blog.getBlogs(req.query, result=>res.send(result));
    }
    static getBlogsBrief(req, res){
        this.vm_blog.getBlogsBrief(req.query, result=>res.send(result));
    }
    static getPopularBlogs(req, res){
        this.vm_blog.getPopularBlogs(req.query, result=>res.send(result));
    }
    static deleteBlog(req, res){
        this.vm_blog.deleteBlog(parseInt(req.query.id), result=>res.send(result));
    }
    static getLatestBlogs(req, res){
        this.vm_blog.getLatestBlogs(parseInt(req.query.n), result=>res.send(result));
    }
    static getTotalBlogCount(req, res){
        this.vm_blog.getTotalBlogCount(result=>res.send(result));
    }
    static makePopular(req, res){
        this.vm_blog.makePopular(req.query, result=>res.send(result));
    }
    static removePopular(req, res){
        this.vm_blog.removePopular(req.query, result=>res.send(result));
    }
}
en_blog.vm_blog = new vm_blog();

module.exports = en_blog;