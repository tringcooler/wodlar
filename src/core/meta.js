define(function(require) {
    
    function id_tree() {
        this.root = new (require('core/util').multi_pool)();
    }
    id_tree.prototype.add = function(path) {
        this.root.foreach(path, function(v) {
            if(v === undefined) {
                return {};
            }
        });
    }
    id_tree.prototype.get = function(path, inc = true) {
        var node = this.root.get(path);
        if(node === undefined) return [];
        var r = {};
        var _enum = function(node) {
            for(var k in node) {
                r[k] = null;
                _enum(node[k]);
            }
        }
        _enum(node);
        var ra = Object.keys(r);
        if(inc && path.length > 0) {
            ra.unshift(path[path.length - 1]);
        }
        return ra;
    }
    
    var ID_TREE = new id_tree();
    
    var _get_proto = function(obj) {
        var proto = obj;
        if(proto.__proto__ === proto.constructor.prototype) {
            proto = proto.__proto__;
        }
        return proto;
    };
    
    function meta() {}
    
    meta.prototype.ID = 'META';
    
    meta.prototype.ID_CHAIN = function() {
        var proto = _get_proto(this);
        var r = [];
        while('ID' in proto) {
            r.unshift(proto.ID);
            proto = proto.__proto__;
        }
        return r;
    }
    
    meta.prototype.ID_COVER = function() {
        var proto = _get_proto(this);
        return ID_TREE.get(proto.ID_CHAIN());
    }
    
    meta.prototype.SETID = function(id) {
        var proto = _get_proto(this);
        proto.ID = id;
        ID_TREE.add(proto.ID_CHAIN());
    };
    
    return meta;
    
});
