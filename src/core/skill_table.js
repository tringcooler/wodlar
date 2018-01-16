define(function(require) {
    
    function skill_table() {
        this.pool = new (require('core/util').multi_pool)();
    }
    
    skill_table.prototype.regist = function(act_cls, obj1_cls, obj2_cls, unbound_method) {
        
    }
    
    return skill_table;
    
});