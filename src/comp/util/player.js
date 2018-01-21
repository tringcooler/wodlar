define(function(require) {
    
    var cls_player = require('entity/player');
    var current_player = null;
    
    var log_act = require('action/uniact')('player_log');
    
    var _argv = function(args, stt = 0) {
        return Array.prototype.slice.call(args, stt);
    }
    
    var regist = function(player) {
        if(player instanceof cls_player) {
            current_player = player;
        } else {
            current_player = new cls_player(player);
        }
    };
    
    var log = function() {
        var lvl = arguments[0];
        var ctt = _argv(arguments, 1);
        var act_info = {
            level: lvl,
            content: ctt,
        };
        if(!current_player) {
            regist('defualt');
        }
        (new log_act(current_player, act_info)).emit();
    };
    
    return {
        regist, regist,
        log: log,
        
        info: function() {
            var args = _argv(arguments);
            //args.splice(1, 0, 'info');
            args.unshift('info');
            log.apply(null, args);
        },
        error: function() {
            var args = _argv(arguments);
            args.unshift('error');
            log.apply(null, args);
        },
    };
});