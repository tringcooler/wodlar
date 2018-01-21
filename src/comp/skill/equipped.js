define(function(require) {
    
    var _super = require('core/skill');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
    }
    
    defcls.prototype.SETID('#SKL_EQUIPPED');
    defcls.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_equipped init', proto.ID);
        proto.REGIST(
            require('action/stdact')['equip'],
            [require('entity/character'), require('entity/equipment')],
            1, null, this.equip
        );
        proto.REGIST(
            require('action/stdact')['unequip'],
            [require('entity/character'), require('entity/equipment')],
            1, null, this.unequip
        );
    };
    defcls.prototype.MUXID = '$UNI_SKL_EQUIPPED';
    
    var log_equip = require('util/player').logger(function(eq, slf, src) {
        if(eq) {
            return slf.repr() + ' be equipped by ' + src.repr();
        } else {
            return slf.repr() + ' be unequipped by ' + src.repr();
        }
    });
    
    defcls.prototype._copy_skill_to = function(owner, dest, typ) {
        var eqsrc = owner.EQSRC(typ);
        owner.foreach_skill(null, eqsrc, function(skid, srcid, sk) {
            dest.gain_skill(sk, owner);
        });
    };
    
    defcls.prototype._del_skill_from = function(owner, dest) {
        dest.foreach_skill(null, owner.ID, function(skid, srcid, sk) {
            dest.lose_skill(skid, owner);
        });
    };
    
    defcls.prototype.equip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        this._copy_skill_to(owner, sbj, act.info.type);
        log_equip(true, owner, sbj);
    };
    
    defcls.prototype.unequip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        this._del_skill_from(owner, sbj);
        log_equip(false, owner, sbj);
    };
    
    return defcls;
    
});