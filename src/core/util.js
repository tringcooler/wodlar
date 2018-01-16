define(function(require) {
    
    function multi_pool() {
        this.pool = {};
    }
    multi_pool.prototype.foreach = function(keys, func) {
        if(!keys.length) return;
        var _scan = function(pool, keys) {
            var head_ks = keys[0];
            var tail_k = keys.slice(1);
            if(!(head_ks instanceof Array)) {
                head_ks = [head_ks];
            }
            for(var i = 0; i < head_ks.length; i++) {
                var head_k = head_ks[i];
                if(tail_k.length < 1) {
                    pool[head_k] = func(pool[head_k]);
                    continue;
                }
                if(!(head_k in pool)) {
                    pool[head_k] = {};
                }
                var npool = pool[head_k];
                _scan(npool, tail_k);
            }
        };
        _scan(this.pool, keys);
    };
    multi_pool.prototype.set = function(keys, val) {
        this.foreach(keys, function(v) {
            return val;
        });
    };
    multi_pool.prototype.has = function(keys, any = true) {
        if(!keys.length) return;
        var _chk = function(pool, keys) {
            var head_ks = keys[0];
            var tail_k = keys.slice(1);
            if(!(head_ks instanceof Array)) {
                head_ks = [head_ks];
            }
            for(var i = 0; i < head_ks.length; i++) {
                var head_k = head_ks[i];
                if(!(head_k in pool)) {
                    if(!any) {
                        return false;
                    } else {
                        continue;
                    }
                }
                var npool = pool[head_k];
                if(tail_k.length > 0) {
                    if(typeof(npool) != 'object') {
                        if(!any) {
                            return false;
                        } else {
                            continue;
                        }
                    }
                } else {
                    if(any) {
                        return true;
                    } else {
                        continue;
                    }
                }
                var r = _chk(npool, tail_k, any);
                if(r) {
                    if(any) {
                        return true;
                    } else {
                        continue;
                    }
                } else {
                    if(!any) {
                        return false;
                    } else {
                        continue;
                    }
                }
            }
            if(any) {
                return false;
            } else {
                return true;
            }
        };
        return _chk(this.pool, keys);
    };
    multi_pool.prototype.get = function(keys) {
        if(!keys.length) return;
        var pool = this.pool;
        for(var i = 0; i < keys.length - 1; i++) {
            if(typeof(pool) != 'object') {
                return undefined;
            }
            var key = keys[i];
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
    
    __extends(lm_multi_pool, multi_pool);
    function lm_multi_pool() {
        multi_pool.call(this);
    }
    lm_multi_pool.prototype.set = function(keys, val) {
        
    };
    lm_multi_pool.prototype.get = function(keys) {
    };
    lm_multi_pool.prototype.remove = function(keys) {
    };
    
    return {
       'multi_pool': multi_pool, 
    };
    
});