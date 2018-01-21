define(function(require) {
    
    var _super = require('core/skill');
    __extends(defcls, _super);
    function defcls() {
        _super.call(this);
    }
    
    defcls.prototype.SETID('#SKL_DAMAGED');
    defcls.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_damaged init', proto.ID);
        proto.REGIST(
            require('action/dualact')('attack'),
            [require('entity/attackable'), require('entity/attackable')],
            1, null, this.emit
        );
    };
    defcls.prototype.MUXID = '$UNI_SKL_DAMAGED';
    
    var log_damage = require('util/player').logger(function(slf, src) {
        return slf.ID + ' be damaged by ' + src.ID;
    });
    
    defcls.prototype.emit = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        log_damage(owner, sbj);
    };
    
    return defcls;
    
});
