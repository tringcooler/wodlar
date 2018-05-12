define(function(require) {
    
    return require('core/util').std_table(
    
        [
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
        ],
        
        function(key, mact, prevact) {
            var mact_tab = {
                'subact': require('action/subact'),
                'uniact': require('action/uniact'),
                'dualact': require('action/dualact'),
            };
            var actcls;
            if(!mact) {
                mact = 'dualact';
            }
            if(prevact) {
                actcls = mact_tab['subact'](key, prevact);
            } else {
                actcls = mact_tab[mact](key);
            }
            return actcls;
        },
        
        2
    );
    
});
