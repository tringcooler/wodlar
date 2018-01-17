define(function(require) {
    
    var META = require('core/meta');
    
    var _super = META;
    __extends(entity, _super);
    function entity() {
        _super.call(this);
        this.skill_pool = new (require('core/util').multi_pool)();
        this._init_nat_skill();
    }
    
    entity.prototype.SETID('#ENTITY');
    entity.prototype.FIRST_INIT = function(cls, proto) {
        console.log('entity init', proto.ID);
    };
    
    var _cover = function(cls) {
        if(cls === META || cls.prototype instanceof META) {
            return cls.prototype.ID_COVER();
        } else {
            return cls;
        }
    };
    
    entity.prototype.NAT_SRC = '@NATURAL';
    
    entity.prototype._init_nat_skill = function() {
        if(!this.init_nat_skill) return;
        var sks = this.init_nat_skill();
        for(var i = 0; i < sks.length; i++) {
            var sk = sks[i];
            if(typeof(sk) == 'string') {
                this.lose_skill(sk, null);
            } else {
                this.gain_skill(sk, this.NAT_SRC);
            }
        }
    };
    
    entity.prototype.gain_skill = function(sk, src) {
        this.skill_pool.set([sk.ID, _cover(src)], sk);
    };
    
    entity.prototype.lose_skill = function(sk_id, src) {
        if(!sk_id) {
            sk_id = this.skill_pool.SYM_WC;
        }
        if(!src) {
            src = this.skill_pool.SYM_WC;
        } else {
            src = _cover(src);
        }
        this.skill_pool.remove([sk_id, _cover(src)]);
    };
    
    entity.prototype.override_skill = function(nsk, nsrc, osk_id, osrc = null) {
        this.lose_skill(osk_id, osrc);
        this.gain_skill(nsk, nsrc);
    };
    
    entity.prototype.check_skill = function(sk_id, src) {
        if(!sk_id) {
            sk_id = this.skill_pool.SYM_WC;
        }
        if(!src) {
            src = this.skill_pool.SYM_WC;
        } else {
            src = _cover(src);
        }
        return this.skill_pool.has([sk_id, _cover(src)], false);
    };
    
    entity.prototype.foreach_skill = function(sk_id, src, func) {
        if(!sk_id) {
            sk_id = this.skill_pool.SYM_WC;
        }
        if(!src) {
            src = this.skill_pool.SYM_WC;
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
