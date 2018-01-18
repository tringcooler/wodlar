define(function(require) {
    
    var REGTAB = require('core/regtab');
    
    var _super = require('core/meta');
    __extends(skill, _super);
    function skill() {
        _super.call(this);
    }
    
    skill.prototype.SETID('#SKILL');
    
    skill.prototype.REGIST = function(act_cls, obj_clss, owner_pos, prio, unbound_method) {
        var cb = function(act, objs, owner, ctx) {
            if(this.MUXID && this.ctx_holden(ctx, this.MUXID)) return;
            unbound_method.call(this, act, objs, owner, ctx);
        }
        REGTAB.regist([obj_clss.length, act_cls].concat(obj_clss).concat([prio, owner_pos, this.ID]), cb);
    };
    
    skill.prototype.ctx_holden = function(ctx, s) {
        if(!ctx.holdtab) {
            ctx.holdtab = {};
        }
        if(!ctx.holdtab[s]) {
            ctx.holdtab[s] = true;
            return false;
        } else {
            return true;
        }
    };
    
    skill.prototype.emit = function(act, objs, owner, ctx) {};
    
    return skill;
    
});
