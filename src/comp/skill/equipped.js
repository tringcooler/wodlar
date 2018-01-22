define(function(require) {
    
    var log_equip = require('util/player').logger(function(eq, slf, src) {
        if(eq) {
            return slf.repr() + ' be equipped by ' + src.repr();
        } else {
            return slf.repr() + ' be unequipped by ' + src.repr();
        }
    });
    
    var _super = require('core/skill');
    
    __extends(skill_unequipped, _super);
    function skill_unequipped(eqsrc) {
        _super.call(this);
        this.eqsrc = eqsrc;
        this.MUXID = '$UNI_SKL_UNEQUIPPED_' + eqsrc.toUpperCase();
    }
    
    skill_unequipped.prototype.SETID('#SKL_UNEQUIPPED');
    skill_unequipped.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_unequipped init', proto.ID);
        proto.REGIST(
            require('action/stdact')['unequip'],
            [require('entity/character'), require('entity/equipment')],
            0, null, this.unequip
        );
    };
    
    skill_unequipped.prototype._del_skill_from = function(owner, srceq) {
        owner.foreach_skill(null, srceq.ID, function(skid, srcid, sk) {
            owner.lose_skill(skid, srceq);
        });
    };
    
    skill_unequipped.prototype.unequip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        this._del_skill_from(owner, obj);
        owner.lose_skill(this.ID, obj);
        log_equip(false, obj, owner);
    };
    
    
    __extends(skill_equipped, _super);
    function skill_equipped() {
        _super.call(this);
    }
    
    skill_equipped.prototype.SETID('#SKL_EQUIPPED');
    skill_equipped.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_equipped init', proto.ID);
        proto.REGIST(
            require('action/stdact')['equip'],
            [require('entity/character'), require('entity/equipment')],
            1, null, this.equip
        );
    };
    skill_equipped.prototype.MUXID = '$UNI_SKL_EQUIPPED';
    
    skill_equipped.prototype._copy_skill_to = function(owner, dest, typ) {
        var eqsrc = owner.EQSRC(typ);
        owner.foreach_skill(null, eqsrc, function(skid, srcid, sk) {
            dest.gain_skill(sk, owner);
        });
    };
    
    skill_equipped.prototype.equip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        this._copy_skill_to(owner, sbj, act.info.type);
        sbj.gain_skill(
            new skill_unequipped(act.info.type),
            owner
        );
        log_equip(true, owner, sbj);
    };
    
    return skill_equipped;
    
});