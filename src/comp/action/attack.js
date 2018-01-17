define(function(require) {
    
    var _super = require('core/action');
    __extends(action_attack, _super);
    function action_attack(sbj, obj) {
        _super.call(this, [sbj, obj]);
    }
    
    action_attack.prototype.SETID('#ACT_ATTACK');
    action_attack.prototype.FIRST_INIT = function(cls, proto) {
        console.log('action_attack init', proto.ID);
    };
    
    return action_attack;
    
});
