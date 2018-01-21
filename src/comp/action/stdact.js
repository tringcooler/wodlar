define(function(require) {
    
    var stdact_list = [
        'player_log:uniact',
        ['attack', [
            ['phys', [
                'slash',
                'smash',
                'stab',
            ]],
            ['magi', [
                'fire',
                'ice',
                'wind',
            ]],
        ]],
        'equip',
        'unequip',
    ];
    
    var METAACT_TAB = {
        'subact': require('action/subact'),
        'uniact': require('action/uniact'),
        'dualact': require('action/dualact'),
    };
    var STDACT_TAB = {};
    
    var _init_acts = function(lst, prevkey = '', prevact = null) {
        for(var i = 0; i < lst.length; i++) {
            var itm = lst[i];
            var subs = null;
            if(itm instanceof Array) {
                subs = itm[1];
                itm = itm[0];
            }
            if(typeof(itm) == 'string') {
                var [key, mact] = itm.split(':');
                if(!mact) {
                    mact = 'dualact';
                }
                var fkey = key;
                if(prevkey) {
                    fkey = prevkey + '/' + key;
                }
                var actcls;
                if(prevact) {
                    actcls = METAACT_TAB['subact'](key, prevact);
                } else {
                    actcls = METAACT_TAB[mact](key);
                }
                STDACT_TAB[fkey] = actcls;
                if(subs) {
                    _init_acts(subs, fkey, actcls);
                }
            }
        }
    };
    
    _init_acts(stdact_list);
    
    var _stdact_keys = Object.keys(STDACT_TAB);
    for(var i = 0; i < _stdact_keys.length; i++) {
        var _t_keys = _stdact_keys[i].split('/');
        if(_t_keys.length > 2) {
            var _n_key = _t_keys[0] + '/' + _t_keys[_t_keys.length - 1];
            if(STDACT_TAB[_n_key]) throw 'stdact collision';
            STDACT_TAB[_n_key] = STDACT_TAB[_stdact_keys[i]];
        }
    }
    
    return STDACT_TAB;
    
});
