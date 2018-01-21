define(function(require) {
    
    var _super = require('core/skill');
    __extends(skill_equipped, _super);
    function skill_equipped() {
        _super.call(this);
    }
    
    skill_equipped.prototype.SETID('#SKL_EQUIPPED');
    skill_equipped.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_equipped init', proto.ID);
        proto.REGIST(
            require('action/dualact')('equip'),
            [require('core/entity'), require('entity/equipped')],
            1, null, this.emit
        );
    };
    skill_equipped.prototype.MUXID = '$UNI_SKL_EQUIPPED';
    
    skill_equipped.prototype.emit = function(act, objs, owner, ctx) {
        var [sbj, obj] = objs;
        console.log(this.ID, owner, 'be equipped by', sbj);
    };
    
    return skill_equipped;
    
});