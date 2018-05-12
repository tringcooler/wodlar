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
    
    var INIT_TAB = {};
    
    function meta() {
        var proto = _get_proto(this);
        proto._FIRST_INIT();
        this.inst_idx = proto.INST_CNT;
        proto.INST_CNT ++;
    }
    
    meta.prototype.ID = '#META';
    
    meta.prototype._FIRST_INIT = function() {
        if(!(this.ID in INIT_TAB)) {
            if('ID' in this.__proto__) this.__proto__._FIRST_INIT();
            if(('FIRST_INIT' in this) && this.FIRST_INIT) {
                this.FIRST_INIT(this.constructor, this.constructor.prototype);
            }
            INIT_TAB[this.ID] = this.constructor;
        }
    };
    
    meta.prototype.ID2CLASS = function(id) {
        return INIT_TAB(id);
    };
    
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
        proto.INST_CNT = 0;
    };
    
    meta.prototype.inst_id = function() {
        return '@' + this.ID + ':' + this.inst_idx;
    };
    
    meta.prototype.repr = function() {
        return '<' + this.inst_id() + '>';
    };
    
    return meta;
    
});
