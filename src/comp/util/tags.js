define(function(require) {
    
    var tag_gen = function (tag_id, super_tag = null) {
        
        var tagcls_id;
        if(!super_tag) {
            super_tag = require('core/meta');
            tagcls_id = '#TAG_' + tag_id.toUpperCase();
        } else {
            tagcls_id = super_tag.prototype.ID + '_SUB_' + tag_id.toUpperCase();
        }
        
        __extends(defcls, super_tag);
        function defcls() {
            throw 'tag should not be instanced';
        }
        defcls.prototype.SETID(tagcls_id);
        defcls.TAG_NAME = tag_id;
        
        return defcls;
    };
    
    return require('core/util').std_table(
    
        [
            'natural',
            ['equip_slot', [
                ['weapon', [
                    'mainhand',
                    'offhand',
                ]],
                'armor',
                'boots',
            ]],
        ],
        
        function(key, taginfo, prevtag) {
           return tag_gen(key, prevtag);
        },
        
        2
    );
    
});
