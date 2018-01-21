define(function(require) {
    
    return function (act_id, super_act) {
        __extends(defcls, super_act);
        function defcls() {
            var args = Array.prototype.slice.call(arguments, 0);
            super_act.apply(this, args);
        }
        defcls.prototype.SETID(super_act.prototype.ID + '_SUB_' + act_id.toUpperCase());
        return defcls;
    };
    
});
