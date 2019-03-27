export default {
    isEmpty: function isEmpty(v){
      if(v != null){
        var a = v.replace(/\s/g, '');
        return a.length == 0 ? true : false;
      }
      return false;
    }
}