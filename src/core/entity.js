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
    
    var _cover_or_inst = require('core/util').meta_tools(META).cover_or_inst;
    var _id_or_inst = require('core/util').meta_tools(META).id_or_inst;
    
    entity.prototype.NAT_SRC = require('util/tags')['natural'];
    
    entity.prototype._init_nat_skill = function() {
        var proto = this.__proto__
        var inifuncs = [];
        while(proto.constructor === entity || proto instanceof entity) {
            if(proto.hasOwnProperty('init_nat_skill')) {
                inifuncs.unshift(proto.init_nat_skill);
            }
            proto = proto.__proto__;
        }
        var sks = [];
        for(var i = 0; i < inifuncs.length; i++) {
            sks = sks.concat(inifuncs[i].call(this));
        }
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
        this.skill_pool.set([sk.ID, _cover_or_inst(src)], sk);
    };
    
    entity.prototype.lose_skill = function(sk_id, src) {
        if(!sk_id) {
            sk_id = this.skill_pool.SYM_WC;
        }
        if(!src) {
            src = this.skill_pool.SYM_WC;
        } else {
            src = _cover_or_inst(src);
        }
        this.skill_pool.remove([sk_id, src]);
    };
    
    entity.prototype.lose_skills = function(sk_id, src) {
        var skiset = {};
        this.foreach_skill(sk_id, src, function(skid, srcid, sk) {
            var ski_id = sk.inst_id();
            if(!(ski_id in skiset)) {
                skiset[ski_id] = true;
            }
        });
        this.skill_pool.remove([this.skill_pool.SYM_WC, this.skill_pool.SYM_WC], function(v, p) {
            var [skid, srcid] = p;
            var ski_id = v.inst_id();
            if(ski_id in skiset) {
                return true;
            }
        });
    };
    
    entity.prototype.lose_this_skill = function(sk) {
        var srclst = [];
        this.foreach_skill(sk.ID, null, function(skid, srcid, csk) {
            if(csk === sk) {
                srclst.push(srcid)
            }
        });
        this.skill_pool.remove([sk.ID, srclst]);
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
            src = _cover_or_inst(src);
        }
        return this.skill_pool.has([sk_id, src], false);
    };
    
    entity.prototype.check_src = function(sk, src) {
        if(sk.prototype || !(sk instanceof META)) {
            return false;
        }
        return this.skill_pool.get([sk.ID, _id_or_inst(src)]) === sk;
    };
    
    entity.prototype.foreach_skill = function(sk_id, src, func) {
        if(!sk_id) {
            sk_id = this.skill_pool.SYM_WC;
        }
        if(!src) {
            src = this.skill_pool.SYM_WC;
        } else {
            src = _cover_or_inst(src);
        }
        this.skill_pool.foreach([sk_id, src], function(v, p) {
            var [skid, srcid] = p;
            if(func && v !== undefined) func(skid, srcid, v);
        });
    };
    
    entity.prototype.get_skills = function(sk_id = null, src = null) {
        var r = {};
        this.foreach_skill(sk_id, src, function(skid, srcid, sk) {
            if(!(srcid in r)) {
                r[srcid] = {};
            }
            r[srcid][skid] = sk;
        });
        return r;
    };
    
    entity.prototype.get_skill = function(sk_id, src_id) {
        return this.skill_pool.get([sk_id, src_id]);
    };
    
    return entity;
    
});
