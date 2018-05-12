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
    
    defcls.prototype._copy_skill_to = function(owner, dest, eqsrc) {
        owner.foreach_skill(null, eqsrc, function(skid, srcid, sk) {
            dest.gain_skill(sk, owner);
        });
    };
    
    var log_equip = require('util/player').logger(function(owner, dest, eqsrc) {
        return owner.repr() + ' be equipped by ' + dest.repr() + ' at ' + eqsrc.TAG_NAME;
    });
    
    var log_error_equipped = require('util/player').logger('error', function(owner, eqdst, dest, eqsrc) {
        return owner.repr() + " can't be equipped by " + dest.repr() + ' at ' + eqsrc.TAG_NAME +",  it's already equipped by " + eqdst[0].repr() + ' at ' + eqdst[1].TAG_NAME;
    });
    
    defcls.prototype.equip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        var eqsrc = owner.EQSRC(act.info.type);
        if(owner.eqdst) {
            log_error_equipped(owner, owner.eqdst, sbj, eqsrc);
            act.break();
            return;
        }
        this._copy_skill_to(owner, sbj, eqsrc);
        sbj.gain_skill(new skill_equipping(eqsrc), owner);
        owner.eqdst = [sbj, eqsrc];
        log_equip(owner, sbj, eqsrc);
    };
    
    return defcls;
    
});