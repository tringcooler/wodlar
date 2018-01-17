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
            require('action/attack'),
            [require('enity/attackable'), require('enity/attackable')],
            1, 101, this.emit,
        );
    };
    
    skill_damaged.prototype.emit = function(act, objs, owner) {
        var [sbj, obj] = objs;
    };
    
    return skill_damaged;
    
});
