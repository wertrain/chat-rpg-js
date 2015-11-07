/**
 * @fileoverview 共通定義など。
 */

(function(global, namespace) {
  
    /**
     * ドットで区切られた文字列を展開し、グローバル領域に定義していきます。
     * @param {string} str 名前空間用の文字列。
     * @return {object} 最後に定義されたオブジェクト。
     */ 
    function addNamespace(str) {
        var ns = str.split('.');
        var here = global;
        for (var i = 0, l = ns.length; i < l; i++){
            if (typeof(here[ns[i]]) == 'undefined') here[ns[i]] = {};
            here = here[ns[i]];
        }
        return here;
    }
    
    /**
     * 引数の配列にリソースのパスを追加します。
     * @param {chatrpg.scene.SceneBase} sceneClass SceneBaseを継承したクラス。
     * @return {boolean} 追加しなければ false を返します。
     */ 
    function addResourceArray(sceneClass, pathArray) {
        if (typeof sceneClass.Resources === 'undefined') {
            return false;
        }    
        for (var path in sceneClass.Resources) {
            pathArray.push(sceneClass.Resources[path]);
        }
        return true;
    }
    
    var ns = addNamespace(namespace);
    ns.Namespace = addNamespace;
    ns.addResourceArray = addResourceArray;

}(this, "chatrpg.common"));