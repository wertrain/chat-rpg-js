/**
 * @fileoverview ゲームメイン部分。
 */
 window.onload = function() {
    var game = new enchant.Game(480, 320);
    game.fps = 15;
    
    var allResources = new Array();
    chatrpg.common.addResourceArray(chatrpg.scene.GameScene, allResources);
    game.preload(allResources);
    
    game.onload = function() {
        var titleScene = new chatrpg.scene.TitleScene();
        game.pushScene(titleScene.getEnchantScene());
        //var gameScene = new chatrpg.scene.GameScene();
        //game.pushScene(gameScene.getEnchantScene());
    };
    game.start();
};
