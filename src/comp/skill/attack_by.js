define(function(require) {
    
    var act_atk = require('action/dualact')('attack');
    var ent_atkbl = require('entity/attackable');
    
    var meta_act_atkb = function(atk_id) {
        __extends(defcls, act_atk);
        function act_atkb() {
            act_atk.call(this);
        };
        act_atkb.prototype.SETID('#ACT_2_ATTACK_BY');
        return act_atkb;
    };
    
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
                act_atk,
                [ent_atkbl, ent_atkbl],
                0, this.DPRIO(1), this.emit
            );
        };
        defcls.prototype.MUXID = '$UNI_SKL_ATTACK_BY';
        
        defcls.prototype.emit = function(act, objs, owner, ctx) {
            var [sbj, obj] = objs;
            var n_atk = meta2act('attack_by_' + atk_id);
            
            act.break();
        };
        
        return defcls;
    };
    
});
