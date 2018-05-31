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
        m1.gain_skill(new ((function() {
            var _super = require('core/skill');
            __extends(tsk, _super);
            function tsk() {
                _super.call(this);
            }
            tsk.prototype.SETID('#SKL_TMP_BYP_ATK');
            tsk.prototype.FIRST_INIT = function(cls, proto) {
                console.log('skill_tmp_bypass_atk init', proto.ID);
                proto.REGIST(
                    require('action/stdact')['attack'],
                    [mcls, mcls],
                    0, this.DPRIO(2), this.emit
                );
            };
            tsk.prototype.MUXID = '$UNI_SKL_TMP_BYP_ATK';
            tsk.prototype.emit = function(act, objs, owner, ctx) {
                console.log('bypass', act.repr());
                act.bypass(require('skill/attack_by')('slash'));
                //act.bypass(require('skill/attack_by')('stab'));
            };
            return tsk;
        })())(), '$SRC_TMP');
        var m2 = new mcls();
        var ecls = require('entity/sword');
        var e1 = new ecls();
        var e2 = new ecls();
        var acls = require('action/stdact')['equip'];
        var a1 = new acls(m1, e1, {type:'mainhand'});
        var a5 = new acls(m1, e2, {type:'offhand'});
        var a7 = new acls(m1, e1, {type:'offhand'});
        var a8 = new acls(m1, e2, {type:'mainhand'});
        a1.emit();
        a1.emit();
        a7.emit();
        a8.emit();
        acls = require('action/stdact')['attack'];
        var a2 = new acls(m1, m2);
        a2.emit();
        a5.emit();
        a5.emit();
        a2.emit();
        acls = require('action/stdact')['unequip'];
        var a3 = new acls(m1, e1);
        var a6 = new acls(m1, e2);
        a6.emit();
        a5.emit();
        a3.emit();
        acls = require('action/stdact')['attack'];
        var a4 = new acls(m1, m2);
        a4.emit();
        a6.emit();
        a4.emit();
        a7.emit();
        a4.emit();
        a8.emit();
        a4.emit();
    })();
    
    (function() {
        var meta_cls = function(spr) {
            if(spr) __extends(cls, spr);
            function cls() {
                if(spr) spr.call(this);
            };
            return cls
        };
        var c1 = meta_cls();
        var c2 = meta_cls(c1);
        var c3 = meta_cls(c2);
        var o1 = new c3();
        
        var c1 = require('action/dualact')('test');
        var c2 = require('action/subact')('sub1', c1);
        var c3 = require('action/subact')('sub2', c2);
        var o1 = new c3();
    });
    
});});
