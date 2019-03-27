var m_blog = require("../db_models/m_blogs");
const structure = require("../../../../Infrastructure/structure");
const formidable = require("formidable");
const appInfo = require("../../info");
const fs = require("fs");
const m_tokens = require("../db_models/m_tokens");
const path = require("path");

module.exports = class VMBlogs{
    newBlog(req, callback){
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files)=>{
            if(err) console.error(err);
            fields.media = [];
            for (const name in files) {
                if (files.hasOwnProperty(name)) {
                    const file = files[name];
                    const oldPath = file.path;
                    var newPath = appInfo.blogImagePath + m_tokens.generate(16) + path.extname(file.name);
                    var existResult = await m_blog.mediaNameExists(newPath);
                    while(existResult.result){
                        newPath = appInfo.blogImagePath + m_tokens.generate(16) + path.extname(file.name);
                        const {result}  = await m_blog.mediaNameExists(newPath);
                        existResult.result = result;
                    }
                    const read = fs.readFileSync(oldPath);
                    const write = fs.writeFileSync(path.resolve(newPath), read);
                    fs.unlink(oldPath, ()=>{});
                    fields.media.push(path.basename(newPath));
                }
            }
            fields.body = fields.body.split('@#$');
            m_blog.newBlog(fields, (err, result)=>{
                if(err){
                    callback({newBlog: false, message: err});
                }else{
                    fields._id = result;
                    callback({newBlog: true, blog: fields});
                }
            })
        })
    }
    getTotalBlogCount(callback){
        m_blog.getTotalBlogCount((err, result)=>{
            if(err)callback({getTotalBlogCount: false, count: "Unable to get count"});
            else callback({getTotalBlogCount: true, count: result})
        });
    }
    getLatestBlogs(number, callback){
        m_blog.getLatestBlogs(number, (err, result)=>{ console.log(result);
            if(err){
                callback({getLatestBlogs: false, message: err});
            }else callback({getLatestBlogs: true, blogs: result});
        })
    }
    async getBlogs(options, callback){
        var response;
        if(options.nf){
            const blogsResult = await m_blog.getNewBlogs(parseInt(options.nf), parseInt(options.l));
            if(blogsResult.error){
                response = {getBlogs: false, message: "unable to get blogs"};
            }else response = {getBlogs: true, blogs: blogsResult.result};
        }else{
            const blogsResult = await m_blog.getOlderBlogs(parseInt(options.of), parseInt(options.l));
            if(blogsResult.error){
                response = {getBlogs: false, message: "unable to get blogs"};
            }else response = {getBlogs: true, blogs: blogsResult.result};
        }
        callback(response);
    }
    async getBlogsBrief(options, callback){
        var response;
        const blogsResult = await m_blog.getBlogsBrief(parseInt(options.offset), parseInt(options.limit));
        if(blogsResult.error){
            response = {getBlogsBrief: false, message: "unable to get blogs"};
        }else response = {getBlogsBrief: true, blogs: blogsResult.result};
        callback(response);
    }
    getPopularBlogs(options, callback){
        m_blog.getPopularBlogs(parseInt(options.n), (err, result)=>{
            if(err){
                callback({getPopularBlogs: false, message: "Unable to get popular blogs"});
            }else callback({getPopularBlogs: true, blogs: result});
        });
    }
    async deleteBlog(id, callback){
        const {result} = await m_blog.getBlogById(id);
        if(result){
            if(result.media && result.media.length != 0)
                await this.deleteBlogImages(result.media);
        }else{
            callback({deleteBlog: false, message: 'blog does not exist'});
            return;
        }
        m_blog.deleteBlog(id, (err, result)=>{
            if(err || !result){
                callback({deleteBlog: false, message: "unable to delete blog"});
            }else{
                callback({deleteBlog: true,  message: "blog deleted!"});
            }
        })
    }
    makePopular(query, callback){
        m_blog.makePopular(parseInt(query.id), (err, result)=>{
            if(err){
                callback({makePopular: false, message: "unable to make popular!"});
            }else callback({makePopular: true, message: "success"});
        })
    }
    removePopular(query, callback){
        m_blog.removePopular(parseInt(query.id), (err, result)=>{
            if(err){
                callback({makePopular: false, message: "unable to remove popular!"});
            }else callback({makePopular: true, message: "success"});
        })
    }
    deleteBlogImages(imageArray){
        imageArray.forEach(file=>{
            if(fs.existsSync(path.resolve(appInfo.blogImagePath+file))){
                fs.unlinkSync(appInfo.blogImagePath+file);
            }
        })
    }
    
}