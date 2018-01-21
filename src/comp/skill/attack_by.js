define(function(require) {
    
    var _super = require('core/skill');
    return function(atk_id) {
        __extends(defcls, _super);
        function defcls() {
            _super.call(this);
        }
        
        defcls.prototype.SETID('#SKL_ATKB_' + atk_id.toUpperCase());
        defcls.prototype.FIRST_INIT = function(cls, proto) {
            console.log('skill_attack_by init', proto.ID);
            proto.REGIST(
                require('action/dualact')('attack'),
                [require('entity/attackable'), require('entity/attackable')],
                0, this.DPRIO(1), this.emit
            );
        };
        defcls.prototype.MUXID = '$UNI_SKL_ATTACK_BY';
        
        defcls.prototype.emit = function(act, objs, owner, ctx) {
            var [sbj, obj] = objs;
            var n_atk = require('action/dualact')('attack_by_' + atk_id);
            
            act.break();
        };
        
        return defcls;
    };
    
});
