define(function(require) {
    
    function regtab() {
        this.pool = new (require('core/util').multi_pool)();
    }
    
    var META = require('core/meta');
    var _cover = function(cls) {
        if(cls === META || cls.prototype instanceof META) {
            return cls.prototype.ID_COVER();
        } else {
            return cls;
        }
    };
    
    regtab.prototype.regist = function(clss, val) {
        var keys = []
        for(var i = 0; i < clss.length; i++) {
            var cls = clss[i];
            keys.push(_cover(cls));
        }
        this.pool.set(keys, val);
    }
    
    regtab.prototype.unregist = function(clss) {
        var keys = []
        for(var i = 0; i < clss.length; i++) {
            var cls = clss[i];
            keys.push(_cover(cls));
        }
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
    
    return new regtab();
    
});