define(function(require) {
    
    var REGTAB = new (require('core/regtab'))();
    
    var _super = require('core/meta');
    __extends(skill, _super);
    function skill() {
        _super.call(this);
    }
    
    skill.prototype.SETID('SKILL');
    
    skill.prototype._regtab = REGTAB;
    
    skill.prototype.REGIST = function(act_cls, obj1_cls, obj2_cls, unbound_method) {
        var cb = unbound_method;
        REGTAB.regist([act_cls, obj1_cls, obj2_cls], this.ID, cb);
    };
    
    return skill;
    
});
