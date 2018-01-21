define(function (require) {$(document).ready(function() {
    console.log('start');
    //console.log(require('action/attack'));
    
    (function() {
        var mp = new (require('core/util').multi_pool)();
        mp.set([[1,2,3], [4,5,6], [7,8,9]], 'abc');
        console.log(
            mp.has([1,4,7]),
            mp.has([1,4,7], false),
            mp.has([1,4,6]),
            mp.has([1,4,6], false),
            mp.has([1,4,[6,7]]),
            mp.has([1,4,[6,7]], false),
            mp.has([[1,2,3], [4,5,6], [7,8,9]]),
            mp.has([[1,2,3], [4,5,6], [7,8,9]], false),
            mp.has([[1,2,3], [4,5,6,7], [7,8,9]]),
            mp.has([[1,2,3], [4,5,6,7], [7,8,9]], false),
        );
        mp.remove([[1,3], [5], [7,8,9]]);
        //mp.remove([[1,3], [4, 5, 6], [7,8,9]]);
        mp.foreach([1, [4, 5, 6], [7,8], 10], function(v, p) {
            console.log(v, p);
        });
        console.log('=====');
        //mp.foreach([[1,2,3], [4,5,6], [7,8,9]], function(v, p) {
        //    console.log(v, p);
        //});
        mp.foreach(['*', '*', '*'], function(v, p) {
            console.log(v, p);
        });
        console.log(mp.pool);
    });
    
    /*(function() {
        var t = new (require('action/attack'))();
        console.log(t, t.ID_CHAIN(), require('action/attack').prototype.ID_CHAIN());
    });*/
    
    (function() {
        var player = new (require('entity/player'))('p1');
        require('util/player').regist(player);
        var mcls = require('entity/character');
        var m1 = new mcls();
        var m2 = new mcls();
        var acls = require('action/dualact')('attack');
        var a1 = new acls(m1, m2);
        a1.emit();
    });
    
    (function() {
        var player = new (require('entity/player'))('p1');
        require('util/player').regist(player);
        var mcls = require('entity/character');
        var m1 = new mcls();
        var m2 = new mcls();
        var ecls = require('entity/sword');
        var ecls = require('entity/weapon');
        var e1 = new ecls();
        var acls = require('action/dualact')('equip');
        var a1 = new acls(m1, e1, {type:'mainhand'});
        a1.emit();
        acls = require('action/dualact')('attack');
        var a2 = new acls(m1, m2);
        a2.emit();
        acls = require('action/dualact')('unequip');
        var a3 = new acls(m1, e1);
        a3.emit();
        acls = require('action/dualact')('attack');
        var a4 = new acls(m1, m2);
        a4.emit();
    })();
    
});});
