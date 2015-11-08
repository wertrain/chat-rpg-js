/**
 * @fileoverview すべてのシーンの基底となるクラスを定義。
 */
(function(namespace) {
    /**
     * すべてのシーンの基底となるクラス
     * @constructor
     */
    var SceneBase = enchant.Class.create({
        initialize: function() {
            this.scene = new enchant.Scene();
        },
        getEnchantScene: function() {
            return this.scene;
        },
        addChild: function(object) {
            this.scene.addChild(object);
        }
    });
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.SceneBase = SceneBase;
}("chatrpg.scene"));