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

    var logger = function() {
        var lvl, cb;
        if(arguments.length > 1) {
            lvl = arguments[0];
            cb = arguments[1];
        } else {
            lvl = 'info';
            cb = arguments[0];
        }
        if(!cb) return;
        return function() {
            var args = _argv(arguments);
            var act_info = {
                level: lvl,
                content: cb.apply(null, args),
            };
            if(!current_player) {
                regist('defualt');
            }
            new log_act(current_player, act_info).emit();
        };
    };
    
    return {
        regist, regist,
        logger: logger,
    };
});