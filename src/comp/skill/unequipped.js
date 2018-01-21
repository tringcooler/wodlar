define(function(require) {
    
    var _super = require('core/skill');
    __extends(skill_unequipped, _super);
    function skill_unequipped() {
        _super.call(this);
    }
    
    skill_unequipped.prototype.SETID('#SKL_UNEQUIPPED');
    skill_unequipped.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_unequipped init', proto.ID);
        proto.REGIST(
            require('action/dualact')('equip'),
            [require('entity/character'), require('entity/unequipped')],
            1, null, this.emit
        );
    };
    skill_unequipped.prototype.MUXID = '$UNI_SKL_UNEQUIPPED';
    
    skill_unequipped.prototype.emit = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        console.log(this.ID, owner, 'be unequipped by', sbj);
    };
    
    return skill_unequipped;
    
});