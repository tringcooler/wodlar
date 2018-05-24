define(function(require) {
    
    var _super = require('core/skill');
    __extends(defcls, _super);
    function defcls(eqsrc) {
        _super.call(this);
        this.eqsrc = eqsrc;
        this.MUXID = '$UNI_SKL_EQUIPPING_' + eqsrc.TAG_NAME.toUpperCase();
    }
    
    defcls.prototype.SETID('#SKL_EQUIPPING');
    defcls.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_equipping init', proto.ID);
        proto.REGIST(
            require('action/stdact')['unequip'],
            [require('entity/character'), require('entity/equipment')],
            0, null, this.unequip
        );
        proto.REGIST(
            require('action/stdact')['equip'],
            [require('entity/character'), require('entity/equipment')],
            0, this.DPRIO(1), this.equip_collision_check
        );
    };
    
    defcls.prototype._del_skill_from = function(owner, srceq) {
        owner.lose_skills(null, srceq);
    };
    
    var log_unequip = require('util/player').logger(function(owner, src, self) {
        return owner.repr() + ' unequip ' + src.repr() + ' by ' + self.repr() + '(' + self.MUXID + ')';
    });
    
    defcls.prototype.unequip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        if(!owner.check_src(this, obj)) return;
        this._del_skill_from(owner, obj);
        obj.eqdst = null;
        log_unequip(owner, obj, this);
    };
    
    var log_error_collision = require('util/player').logger('error', function(owner, src, self) {
        return owner.repr() + " can't equip " + src.repr() + ' at ' + self.eqsrc.TAG_NAME + ' with ' + self.repr() + '(' + self.MUXID + ')';
    });
    
    defcls.prototype.equip_collision_check = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        if(obj.EQSRC(act.info.type) == this.eqsrc) {
            log_error_collision(owner, obj, this);
            act.break();
        }
    };
    
    return defcls;
    
});