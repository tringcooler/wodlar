define(function(require) {
    
    var _super = require('core/entity');
    __extends(entity_equipment, _super);
    function entity_equipment() {
        _super.call(this);
    }
    
    entity_equipment.prototype.SETID('#ENT_EQUIPMENT');
    
    entity_equipment.prototype.EQTYP = 'TYP_EQUIPMENT';
    
    entity_equipment.prototype.init_nat_skill = function() {
        return _super.prototype.init_nat_skill.call(this).concat([
            new (require('skill/equipped'))(),
            new (require('skill/unequipped'))(),
        ]);
    };
    
    return entity_equipment;
    
});
