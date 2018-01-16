define(function(require) {
    
    function multi_pool() {
        this.pool = {};
    }
    multi_pool.prototype.set = function(keys, val) {
        if(!keys.length) return;
        var pool = this.pool;
        for(var i = 0; i < keys.length - 1; i++) {
            var key = keys[i];
            if(typeof(pool) != 'object') {
                throw 'invalid keys length';
            }
            if(!(key in pool)) {
                pool[key] = {};
            }
            pool = pool[key];
        }
        pool[keys[keys.length - 1]] = val;
    };
    multi_pool.prototype.get = function(keys) {
        if(!keys.length) return;
        var pool = this.pool;
        for(var i = 0; i < keys.length - 1; i++) {
            var key = keys[i];
            if(typeof(pool) != 'object') {
                return undefined;
            }
            if(!(key in pool)) {
                return undefined;
            }
            pool = pool[key];
        }
        return pool[keys[keys.length - 1]];
    };
    multi_pool.prototype.remove = function(keys) {
        if(!keys.length) return;
        var _clear = function(pool, keys) {
            var head_k = keys[0];
            var tail_k = keys.slice(1);
            if(!(head_k in pool)) return;
            if(tail_k.length < 1) {
                delete pool[head_k];
                return;
            }
            var npool = pool[head_k];
            if(typeof(npool) != 'object') return;
            _clear(npool, tail_k);
            if(Object.keys(npool).length < 1) {
                delete pool[head_k];
                return;
            }
        }
        _clear(this.pool, keys);
    };
    
    return {
       'multi_pool': multi_pool, 
    };
    
});