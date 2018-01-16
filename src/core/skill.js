define(function(require) {
    
    var global_skill_table = new (require('core/util').multi_pool)();
    
    function skill() {
    }
    
    skill.prototype.ID = 'META';
    
    skill.prototype.regist = function(act_cls, obj1_cls, obj2_cls, method) {
        
    }
    
    return skill;
    
});
