KISSY.add("brix/core/dataset", function(S, Base) {
    /**
     * Brix Dataset 提供数据管理；为所有组件提供基于数据事件的编程
     * @extends KISSY.Base
     * @class Brix.Dataset
     */

    function Dataset() {
        Dataset.superclass.constructor.apply(this, arguments);
    }
    Dataset.ATTRS = {
        /**
         * 数据对象
         * @cfg {Object}
         */
        data: {}
    };
    S.extend(Dataset, Base, {
        /**
         * 扩展数据，用于 mastache 渲染
         * @param {Object} renderer 代理方法对象
         * @param {Object} context  当前上下文环境
         * @param {String} prefix   前缀，防止相同 brick 方法覆盖
         */
        setRenderer: function(renderer, context, prefix) {
            var self = this,
                data = self.get('data'),
                type, wrapperName;
            prefix = prefix ? prefix + '_' : '';
            if(renderer) {
                var foo = function(type, wrapperName) {
                        var name = prefix + type + '_' + wrapperName,
                            fn = renderer[type][wrapperName];
                        data[name] = function() {
                            return fn.call(this, context, type);
                        };
                    };
                for(type in renderer) {
                    for(wrapperName in renderer[type]) {
                        foo(type, wrapperName);
                    }
                }
            }
        }
    });
    return Dataset;
}, {
    requires: ["base"]
});