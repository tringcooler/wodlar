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
    
    entity.prototype.gain_skill = function(sk, src) {
        var src_k;
        if(src instanceof META) {
            src_k = src.ID_COVER;
        } else {
            src_k = src;
        }
        this.skill_pool.set([sk.ID, src_k], sk);
    };
    
    entity.prototype.lose_skill = function(sk_id, src) {
        var src_k;
        if(src instanceof META) {
            src_k = src.ID_COVER;
        } else {
            src_k = src;
        }
        this.skill_pool.remove([sk_id, src_k]);
    };
    
    entity.prototype.check_skill = function(sk_id, src) {
        var src_k;
        if(src instanceof META) {
            src_k = src.ID_COVER;
        } else {
            src_k = src;
        }
        return this.skill_pool.has([sk_id, src_k], false);
    };
    
    entity.prototype.emit = function(act, dir, obj) {
        
    };
    
    return entity;
    
});
