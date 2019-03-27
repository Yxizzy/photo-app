var structure = require("../../../../Infrastructure/structure");
var Token = require('./m_tokens');

class Blogs {
    static newBlog(data, callback){
        data.date = new Date().toLocaleString();
        return new Promise((pResolve, pReject)=>{
            structure.db.agroblog(async(client, resolve, reject)=>{
                const collection = client.collection(this.name);
                data._id = await structure.db.autoIncrement(collection);
                collection.insertOne(
                    data,
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback("unable to insert data");
                            pResolve({error: "unable to insert data"});
                        }else{
                            resolve();
                            if(callback) callback(err, result.insertedId);
                            pResolve({error: err, result: result.insertedId})
                        }
                    }
                )
            })
        })
    }
    static mediaNameExists(name, callback){
        return new Promise(pResolve=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).findOne(
                    {"media": name},
                    {_id: 0, "media.$": 1},
                    (err, result)=>{
                        if(err) {
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(result && result.media){
                                if(callback) callback(err, reuslt.media);
                                pResolve({error: err, result: result.media});
                            }else{
                                pResolve({error: err, result: null});
                                if(callback) callback(err, null)
                            }
                        }
                    }
                )
            })
        })
    }
    static getBlogById(id, callback){
        return new Promise((pResolve, pReject)=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).findOne(
                    {_id: id},
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result});
                        }
                    }
                )
            })
        })
    }
    
    static getOlderBlogs(id, callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find(
                    {_id: {$lt : id}}
                )
                .sort({_id: -1})
                .limit(limit)
                .toArray(
                    (err, result)=>{ console.log(result);
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result})
                        }
                    }
                )
            })

        })
    }
    static getNewBlogs(id, limit, callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find(
                    {_id: {$gt : id}}
                )
                .sort({_id: -1})
                .limit(limit)
                .toArray(
                    (err, result)=>{ console.log(result);
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result})
                        }
                    }
                )
            })

        });
    }
    static getOlderBlogsBrief(id, limit, callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find(
                    {_id: {$lt : id}},
                    {projection: {body:0, media: 0}}
                )
                .sort({_id: -1})
                .limit(limit)
                .toArray(
                    (err, result)=>{ console.log(result);
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result})
                        }
                    }
                )
            })

        })
    }
    static getBlogsBrief(offset, limit, callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find(
                    {},
                    {projection: {body: 0, media: 0}}
                )
                .sort({_id: -1})
                .skip(offset)
                .limit(limit)
                .toArray(
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result})
                        }
                    }
                )
            })

        });
    }
    //not used
    static getNewBlogsBrief(id, limit, callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find(
                    {_id: {$gt : id}},
                    {projection: {body: 0, media: 0}}
                )
                .sort({_id: -1})
                .limit(limit)
                .toArray(
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result})
                        }
                    }
                )
            })

        });
    }
    //not used
    static getPopularBlogs(number, callback){
        return new Promise (pResolve=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find(
                    {}, {projection: {body: 0, media: 0}}
                ).sort({favCount: -1}).limit(number).toArray(
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result);
                            pResolve({error: err, result})
                        }
                    }
                )
            })
        })
    }
    static deleteBlog(id, callback){
        return new Promise((pResolve, pReject)=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).removeOne(
                    {_id: id},
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result.result);
                            pResolve({error: err, result: result.result})
                        }
                    }
                )
            })
        })
    }
    static getLatestBlogs(number, callback){
        return new Promise((pResolve, pReject)=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find({})
                .sort({_id: -1})
                .limit(number)
                .toArray((err, result)=>{
                    if(err){
                        //pReject({error: err});
                        reject(err);
                        pResolve({error: err});
                        if(callback) callback(err);
                    }else{
                        resolve();
                        if(callback) callback(err, result);
                        pResolve({error: err, result});
                    }
                });
            })
        })
    }
    static getTotalBlogCount(callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).find({}).toArray((err, result)=>{
                    if(err){
                        reject(err);
                        if(callback) callback(err);
                        pResolve({error: err});
                    }else{
                        resolve();
                        if(result){
                            if(callback) callback(err, result.length);
                            pResolve({error: err, result: result.length});
                        }
                        else{
                            if(callback) callback(err, 0);
                            pResolve({error: err, result: 0});
                        }
                    }
                })
            })
        })
    }
    static makePopular(id, callback){
        return new Promise(pResolve=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).updateOne(
                    {_id: id},
                    {$inc : {favCount:1}},
                    {upsert: true},
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result.result);
                            pResolve({error: err, result: result.result});
                        }
                    }
                )
            })
        })
    }
    static removePopular(_id, callback){
        console.log(_id);
        return new Promise(pResolve=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).updateOne(
                    {_id},
                    {$inc: {favCount: -1}},
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({error: err});
                        }else{
                            resolve();
                            if(callback) callback(err, result.result);
                            pResolve({error: err, result: result.result});
                        }
                    }
                )
            })
        })
    }
}
module.exports = Blogs;