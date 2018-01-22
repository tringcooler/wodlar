define(function(require) {
    
    var skill_equipping = require('skill/equipping');
    
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
    };
    defcls.prototype.MUXID = '$UNI_SKL_EQUIPPED';
    
    defcls.prototype._copy_skill_to = function(owner, dest, typ) {
        var eqsrc = owner.EQSRC(typ);
        owner.foreach_skill(null, eqsrc, function(skid, srcid, sk) {
            dest.gain_skill(sk, owner);
        });
    };
    
    var log_equip = require('util/player').logger(function(owner, dest, eqsrc) {
        return owner.repr() + ' be equipped by ' + dest.repr() + ' at ' + eqsrc;
    });
    
    defcls.prototype.equip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        this._copy_skill_to(owner, sbj, act.info.type);
        sbj.gain_skill(new skill_equipping(act.info.type), owner);
        log_equip(owner, sbj, act.info.type);
    };
    
    return defcls;
    
});