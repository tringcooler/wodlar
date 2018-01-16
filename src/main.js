define(function (require) {$(document).ready(function() {
    console.log('start');
    console.log(require('action/attack'));
    (function() {
        var mp = new (require('core/util').multi_pool)();
        mp.set([123, 456], 789);
        mp.set([123, 457], 790);
        mp.set([124, 457], 800);
        console.log(mp.get([124, 457]), mp.get([124, 456]), mp.get([123, 457]), mp.get([124]));
        mp.remove([124, 457]);
        console.log(mp.pool);
        mp.remove([123]);
        console.log(mp.pool);
    })();
});});
