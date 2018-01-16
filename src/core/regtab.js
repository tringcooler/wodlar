define(function(require) {
    
    function regtab() {
        this.pool = new (require('core/util').multi_pool)();
    }
    
    regtab.prototype.regist = function(clss, id, val) {
        var keys = []
        for(var i = 0; i < clss.length; i++) {
            var cls = clss[i];
            keys.push(cls.ID_COVER);
        }
        keys.push(id);
        this.pool.set(keys, val);
    }
    
    regtab.prototype.unregist = function(clss, id) {
        var keys = []
        for(var i = 0; i < clss.length; i++) {
            var cls = clss[i];
            keys.push(cls.ID_COVER);
        }
        keys.push(id);
        this.pool.remove(keys);
    }
    
    regtab.prototype.check = function(objs) {
        var keys = []
        for(var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            keys.push(obj.ID);
        }
        var node = this.pool.get(keys);
        if(node === undefined) {
            node = {};
        }
        return node;
    }
    
    return regtab;
    
});