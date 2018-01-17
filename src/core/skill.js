define(function(require) {
    
    var REGTAB = require('core/regtab');
    
    var _super = require('core/meta');
    __extends(skill, _super);
    function skill() {
        _super.call(this);
    }
    
    skill.prototype.SETID('#SKILL');
    
    skill.prototype.REGIST = function(act_cls, obj_clss, owner_pos, prio, unbound_method) {
        var cb = unbound_method;
        REGTAB.regist([act_cls].concat(obj_clss).concat([prio, owner_pos, this.ID]), cb);
    };
    
    skill.prototype.emit = function(act, objs, owner) {};
    
    return skill;
    
});
