define(function(require) {
    
    var _super = require('core/entity');
    __extends(entity_character, _super);
    function entity_character() {
        _super.call(this);
    }
    
    entity_character.prototype.SETID('#ENT_CHARACTER');
    
    entity_character.prototype.init_nat_skill = function() {
        return _super.prototype.init_nat_skill.call(this).concat([]);
    };
    
    return entity_character;
    
});
