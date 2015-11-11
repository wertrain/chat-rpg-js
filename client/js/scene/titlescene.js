/**
 * @fileoverview タイトルシーンクラスの定義。
 */
(function(namespace) {
    /**
     * タイトルシーン
     * @constructor
     */
    var TitleScene = enchant.Class.create(chatrpg.scene.SceneBase, {
        initialize: function() {
            chatrpg.scene.SceneBase.call(this);
            var game = enchant.Game.instance;

            var title = new enchant.Label();
            title.x = 16;
            title.y = 16;
            title.text = "<< Online Chat >>";
            
            var label = new enchant.Label();
            label.x = 16;
            label.y = 48;
            label.text = "Input your name:"
            // 入力ボックス
            var input = new enchant.Entity();
            input.x = 16;
            input.y = 64;
            input.width = 120;
            input.height = 16;
            input._element = document.createElement('input');
            //input._element.setAttribute("name","myText");
            input._element.setAttribute("id", "input_box");
            input.backgroundColor = 'rgba(255,255,255,255)';

            var button = new enchant.ui.Button("Login");
            button.x = input.x + input.width + 12;
            button.y = input.y - 2;
            button.ontouchstart = function() {
                var name = input._element.value;
                if (name.length === 0) {
                    name = '名無しさん';
                }
                chatrpg.network.login(name);
                
                game.replaceScene(new chatrpg.scene.GameScene().getEnchantScene());
            }
        
            this.getEnchantScene().addChild(title);
            this.getEnchantScene().addChild(label);
            this.getEnchantScene().addChild(input);
            this.getEnchantScene().addChild(button);
        },
    });
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.TitleScene = TitleScene;
}("chatrpg.scene"));