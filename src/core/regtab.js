define(function(require) {
    
    function regtab() {
        this.pool = new (require('core/util').multi_pool)();
    }
    
    regtab.prototype.regist = function(clss, val) {
        
    }
    
    return regtab;
    
});