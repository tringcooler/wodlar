define(function (require) {$(document).ready(function() {
    console.log('start');
    console.log(require('action/attack'));
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
        console.log(mp.pool);
    })();
});});
