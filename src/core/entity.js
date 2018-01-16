define(function(require) {
    
    function entity() {
        skill_pool = new (require('core/util').multi_pool)();
    }
    
    entity.prototype.emit(act, dir, obj) {
        
    };
    
    return entity;
    
});
