define(function(require) {
    
    var _super = require('core/meta');
    __extends(skill, _super);
    function skill() {
        _super.call(this);
    }
    
    skill.prototype.SETID('SKILL');
    
    skill.prototype.REGTAB = new (require('core/skill_table'))();
    
    return skill;
    
});
