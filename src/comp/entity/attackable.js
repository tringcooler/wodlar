define(function(require) {
    
    var _super = require('core/entity');
    __extends(entity_attackable, _super);
    function entity_attackable() {
        _super.call(this);
    }
    
    entity_attackable.prototype.SETID('#ENT_ATTACKABLE');
    
    entity_attackable.prototype.init_nat_skill = function() {
        return [
            
        ];
    };
    
    return entity_attackable;
    
});
