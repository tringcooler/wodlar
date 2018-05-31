define(function(require) {
    
    function multi_pool(pool = null) {
        if(pool === null) {
            pool = {};
        }
        this.pool = pool;
    }
    multi_pool.prototype.SYM_WC = '*';
    multi_pool.prototype.foreach = function(keys, func) {
        if(!keys.length) return;
        var self = this;
        var _scan = function(pool, keys, path) {
            var head_ks = keys[0];
            var tail_k = keys.slice(1);
            if(head_ks == self.SYM_WC) {
                head_ks = Object.keys(pool);
            } else if(!(head_ks instanceof Array)) {
                head_ks = [head_ks];
            }
            for(var i = 0; i < head_ks.length; i++) {
                var head_k = head_ks[i];
                var npath = path.concat([head_k]);
                if(tail_k.length < 1) {
                    var r = func(pool[head_k], npath);
                    if(r !== undefined) {
                        pool[head_k] = r;
                    }
                    continue;
                }
                if(!(head_k in pool)) {
                    pool[head_k] = {};
                }
                var npool = pool[head_k];
                var oldnp = undefined;
                if(typeof(npool) != 'object') {
                    oldnp = npool;
                    npool = {}
                    pool[head_k] = npool;
                };
                _scan(npool, tail_k, npath);
                if(Object.keys(npool).length < 1) {
                    if(oldnp === undefined) {
                        delete pool[head_k];
                    } else {
                        pool[head_k] = oldnp;
                    }
                    continue;
                }
            }
        };
        _scan(this.pool, keys, []);
    };
    multi_pool.prototype.set = function(keys, val) {
        this.foreach(keys, function(v) {
            return val;
        });
    };
    multi_pool.prototype.has = function(keys, any = true) {
        if(!keys.length) return;
        var self = this;
        var _chk = function(pool, keys) {
            var head_ks = keys[0];
            var tail_k = keys.slice(1);
            if(head_ks == self.SYM_WC) {
                head_ks = Object.keys(pool);
            } else if(!(head_ks instanceof Array)) {
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
                var r = _chk(npool, tail_k);
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
        var pool = this.pool;
        if(!keys.length) return pool;
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
    multi_pool.prototype.remove = function(keys, func = null) {
        if(!keys.length) return;
        var self = this;
        var _clear = function(pool, keys, path) {
            var head_ks = keys[0];
            var tail_k = keys.slice(1);
            if(head_ks == self.SYM_WC) {
                head_ks = Object.keys(pool);
            } else if(!(head_ks instanceof Array)) {
                head_ks = [head_ks];
            }
            for(var i = 0; i < head_ks.length; i++) {
                var head_k = head_ks[i];
                var npath = path.concat([head_k]);
                if(!(head_k in pool)) continue;
                if(tail_k.length < 1) {
                    if((!func) || func(pool[head_k], npath)) {
                        delete pool[head_k];
                    }
                    continue;
                }
                var npool = pool[head_k];
                if(typeof(npool) != 'object') continue;
                _clear(npool, tail_k, npath);
                if(Object.keys(npool).length < 1) {
                    delete pool[head_k];
                    continue;
                }
            }
        }
        _clear(this.pool, keys, []);
    };
    
    var _init_stdtbl = function(func, lst, prevkey = '', prevelm = null, stdtbl = null) {
        if(!stdtbl) {
            stdtbl = {};
        }
        for(var i = 0; i < lst.length; i++) {
            var itm = lst[i];
            var subs = null;
            if(itm instanceof Array) {
                subs = itm[1];
                itm = itm[0];
            }
            if(typeof(itm) == 'string') {
                var [key, elminfo] = itm.split(':');
                if(!elminfo) {
                    elminfo = null;
                }
                var fkey = key;
                if(prevkey) {
                    fkey = prevkey + '/' + key;
                }
                var elm = func(key, elminfo, prevelm);
                stdtbl[fkey] = elm;
                if(subs) {
                    _init_stdtbl(func, subs, fkey, elm, stdtbl);
                }
            }
        }
        return stdtbl;
    };
    
    var std_table = function(lst, func, reduce = 0) {
        var stdtbl = _init_stdtbl(func, lst);
        if(reduce) {
            var stdtbl_keys = Object.keys(stdtbl);
            for(var i = 0; i < stdtbl_keys.length; i++) {
                var t_keys = stdtbl_keys[i].split('/');
                if(t_keys.length > reduce) {
                    var n_key = t_keys.slice(0, reduce - 1).concat(t_keys[t_keys.length - 1]).join('/');
                    if(stdtbl[n_key]) throw 'stdtbl collision';
                    stdtbl[n_key] = stdtbl[stdtbl_keys[i]];
                }
            }
        }
        return stdtbl;
    };
    
    var meta_tools = function(META) {
        
        var _cover = function(key) {
            var cls = key;
            if(!cls.prototype) {
                cls = cls.constructor;
            }
            if(cls === META || cls.prototype instanceof META) {
                return cls.prototype.ID_COVER();
            } else {
                return key;
            }
        };
        
        var _id = function(obj) {
            if(obj instanceof META) {
                return obj.ID;
            } else {
                return obj;
            }
        };
        
        var _cover_or_inst = function(key) {
            if(!key.prototype && key instanceof META) {
                return key.inst_id();
            } else if(key === META || key.prototype instanceof META) {
                return key.prototype.ID_COVER();
            } else {
                return key;
            }
        };
        
        var _id_or_inst = function(key) {
            if(!key.prototype && key instanceof META) {
                return key.inst_id();
            } else if(key === META || key.prototype instanceof META) {
                return key.prototype.ID;
            } else {
                return key;
            }
        };
        
        var _wrap_for_array = function(func) {
            var _wrapper = function(key) {
                if(key instanceof Array) {
                    var rk = [];
                    for(var i = 0; i < key.length; i++) {
                        rk = rk.concat(_wrapper(key[i]));
                    }
                    return rk;
                } else {
                    return func(key)
                }
            };
            return _wrapper;
        };
        
        return {
            'cover': _wrap_for_array(_cover),
            'id': _wrap_for_array(_id),
            'cover_or_inst': _wrap_for_array(_cover_or_inst),
            'id_or_inst': _wrap_for_array(_id_or_inst),
        };
    };
    
    return {
       'multi_pool': multi_pool,
       'std_table': std_table,
       'meta_tools': meta_tools,
    };
    
});