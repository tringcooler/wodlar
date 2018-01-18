define(function(require) {
    
    var _super = require('core/skill');
    __extends(skill_damaged, _super);
    function skill_damaged() {
        _super.call(this);
    }
    
    skill_damaged.prototype.SETID('#SKL_DAMAGED');
    skill_damaged.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_damaged init', proto.ID);
        proto.REGIST(
            require('action/dualact')('attack'),
            [require('entity/attackable'), require('entity/attackable')],
            1, 10, this.emit,
        );
    };
    skill_damaged.prototype.MUXID = '$UNI_SKL_DAMAGED';
    
    skill_damaged.prototype.emit = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        console.log(this.ID, owner, 'be damaged by', sbj);
    };
    
    return skill_damaged;
    
});
