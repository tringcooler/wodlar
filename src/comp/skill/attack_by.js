define(function(require) {
    
    var act_atk = require('action/dualact')('attack');
    var ent_atkbl = require('entity/attackable');
    
    var _super = require('core/skill');
    return function(atk_id) {
        
        var act_atkb = require('action/subact')('by_' + atk_id, act_atk);
        
        __extends(defcls, _super);
        function defcls() {
            _super.call(this);
        }
        
        defcls.prototype.SETID('#SKL_ATKB_' + atk_id.toUpperCase());
        defcls.prototype.FIRST_INIT = function(cls, proto) {
            console.log('skill_attack_by init', proto.ID);
            proto.REGIST(
                act_atk.prototype.ID,
                [ent_atkbl, ent_atkbl],
                0, this.DPRIO(1), this.emit
            );
        };
        defcls.prototype.MUXID = '$UNI_SKL_ATTACK_BY';
        
        defcls.prototype.emit = function(act, objs, owner, ctx) {
            //if(act.ID != act_atk.prototype.ID) return;
            var [sbj, obj] = objs;
            var n_atk = new act_atkb(sbj, obj);
            n_atk.emit();
            act.break();
        };
        
        return defcls;
    };
    
});
