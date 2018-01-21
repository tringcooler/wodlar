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
            require('action/dualact')('equip'),
            [require('entity/character'), require('entity/equipment')],
            1, null, this.equip
        );
        proto.REGIST(
            require('action/dualact')('unequip'),
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
    
    defcls.prototype.equip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        log_equip(true, owner, sbj);
    };
    
    defcls.prototype.unequip = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        log_equip(false, owner, sbj);
    };
    
    return defcls;
    
});