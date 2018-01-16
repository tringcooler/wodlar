define(function(require) {
    
    var _super = require('core/meta');
    __extends(entity, _super);
    function entity() {
        _super.call(this);
        skill_pool = new (require('core/util').multi_pool)();
    }
    
    entity.prototype.SETID('ENTITY');
    
    entity.prototype.emit(act, dir, obj) {
        
    };
    
    return entity;
    
});
