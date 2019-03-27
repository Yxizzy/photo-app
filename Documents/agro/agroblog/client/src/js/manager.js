
export default class Manager{
    static blogImagePath = "http://localhost:8000/web/agroblog/image/";
    static base_uri = "http://localhost:8000/web/agroblog/v1/";
    static facebookAppId = "674756889610644";
    static facebookUri = "http://www.facebook.com";
    static getTotalBlogCount(callback){
        this.fetchGet("blog", "getTotalBlogCount", {}, callback);
    }
    
    static getArticle(id, callback){
        this.articles.forEach(article => {
            if(article._id == id){
                callback(article);
            }
        });
        callback(null);
    }

    static getBundle(key){
        if(this.bundle[key])
            return staticData;
        return false;
    }
    static setBundle(bundle){
        this.bundle = bundle;
    }
    static addBundle(key, value){
        if(!this.bundle)
            this.bundle = {key : value};
        else key[key] = value;
    }
    static clearBundle(){ this.bundle = null;}
    static removeBundle(key){ if(this.bundle[key]) delete this.bundle[key];}

    

    static fetchGet(owner, action, stringQuery, callback){
        let count = 0;
        let build = "";
        for (const i in stringQuery) {
            if (stringQuery.hasOwnProperty(i)) {
                const elem = stringQuery[i];
                if(count === 0){
                    build += "?"+i+"="+elem;
                }else build += "&"+i+"="+elem;
                count++;
            }
        }
        fetch(this.base_uri+owner+"/"+action+build).then(
            response=> response.json()
        ).then(response=>{
            if(callback) callback(response)
        });
    }
    static fetchPost(owner, action, options, callback){
        console.log(this.base_uri)
        return fetch(this.base_uri+owner+"/"+action, options).then(
            response=> response.json()
        ).then(response=>callback(response));
    }
    
}