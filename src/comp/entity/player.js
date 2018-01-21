define(function(require) {
    
    var skill = require('core/skill');
    var entity = require('core/entity');
    
    __extends(skill_log, skill);
    function skill_log() {
        skill.call(this);
    }
    skill_log.prototype.SETID('#SKL_PLAYER_LOG');
    skill_log.prototype.FIRST_INIT = function(cls, proto) {
        console.log('skill_player_log init', proto.ID);
        proto.REGIST(
            require('action/uniact')('player_log'),
            [require('entity/player')],
            0, null, this.emit
        );
    };
    skill_log.prototype.MUXID = '$UNI_SKL_PLAYER_LOG';
    skill_log.prototype.emit = function(act, objs, owner, ctx) {
        console.log('LOG(', act.info.level, 'at', owner.pid, '):', act.info.content);
    };
    
    __extends(entity_player, entity);
    function entity_player(pid) {
        entity.call(this);
        this.pid = pid;
    }
    entity_player.prototype.SETID('#ENT_PLAYER');
    entity_player.prototype.init_nat_skill = function() {
        return [
            new skill_log(),
        ];
    };
    
    return entity_player;
    
});
