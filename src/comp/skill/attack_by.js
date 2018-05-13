define(function(require) {
    
    var act_std = require('action/stdact');
    var act_atk = act_std['attack'];
    var ent_atkbl = require('entity/attackable');
    
    var _super = require('core/skill');
    return function(atk_id) {
        
        var act_atkb = act_std['attack/' + atk_id];
        if(!act_atkb) {
            console.log('warning: dynamic meta action has been used.');
            act_atkb = require('action/subact')(atk_id, act_atk);
        }
        
        __extends(defcls, _super);
        function defcls() {
            _super.call(this);
        }
        
        defcls.prototype.SETID('#SKL_ATKB_' + atk_id.toUpperCase());
        defcls.prototype.FIRST_INIT = function(cls, proto) {
            console.log('skill_attack_by init', proto.ID);
            proto.REGIST(
                act_atk,
                [ent_atkbl, ent_atkbl],
                0, this.DPRIO(1), this.emit
            );
        };
        defcls.prototype.MUXID = '$UNI_SKL_ATTACK_BY';
        
        defcls.prototype.emit = function(act, objs, owner, ctx) {
            var [sbj, obj] = objs;
            var n_atk = new act_atkb(sbj, obj);
            n_atk.emit(ctx);
            act.break();
        };
        
        return defcls;
    };
    
});
