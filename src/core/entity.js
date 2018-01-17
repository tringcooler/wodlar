define(function(require) {
    
    var META = require('core/meta');
    
    var _super = META;
    __extends(entity, _super);
    function entity() {
        _super.call(this);
        skill_pool = new (require('core/util').multi_pool)();
    }
    
    entity.prototype.SETID('#ENTITY');
    entity.prototype.FIRST_INIT = function(cls, proto) {
        console.log('entity init', proto.ID);
    };
    
    var _cover = function(src) {
        if(src instanceof META) {
            return src.ID_COVER;
        } else {
            return src;
        }
    };
    
    entity.prototype.gain_skill = function(sk, src) {
        this.skill_pool.set([sk.ID, _cover(src)], sk);
    };
    
    entity.prototype.lose_skill = function(sk_id, src) {
        if(!sk_id) {
            sk_id = '*';
        }
        if(!src) {
            src = '*';
        } else {
            src = _cover(src);
        }
        this.skill_pool.remove([sk_id, _cover(src)]);
    };
    
    entity.prototype.check_skill = function(sk_id, src) {
        if(!sk_id) {
            sk_id = '*';
        }
        if(!src) {
            src = '*';
        } else {
            src = _cover(src);
        }
        return this.skill_pool.has([sk_id, _cover(src)], false);
    };
    
    entity.prototype.foreach_skill = function(sk_id, src, func) {
        if(!sk_id) {
            sk_id = '*';
        }
        if(!src) {
            src = '*';
        } else {
            src = _cover(src);
        }
        this.skill_pool.foreach([sk_id, src], function(v, p) {
            var [skid, srcid] = p;
            if(func) func(skid, srcid, v);
        });
    };
    
    entity.prototype.get_skill = function(sk_id = null, src = null) {
        var r = {};
        this.foreach_skill(null, src, function(skid, srcid, sk) {
            if(!(srcid in r)) {
                r[srcid] = {};
            }
            r[srcid][skid] = sk;
        });
        return r;
    };
    
    return entity;
    
});
