/**
 * @fileoverview キャラクター部分。
 */
(function(namespace) {
    /**
     * キャラクター
     * @constructor
     * @extends {enchant.Group} 
     */
    var Chara = enchant.Class.create(enchant.Group, {
        initialize: function() {
            enchant.Group.call(this);
            this.sprite = new enchant.Sprite(32, 32);
            this.sprite.x = 0;
            this.sprite.y = 0;
            this.sprite.isMoving = false;
            this.sprite.direction = 0;
            this.sprite.walk = 1;
            
            this.image = new enchant.Surface(96, 128);
            this.sprite.image = this.image;
            this.addChild(this.sprite);
        },
        setImage: function(assets) {
            this.image.draw(assets, 0, 0, 96, 128, 0, 0, 96, 128);
        },
        setPos: function(x, y) {
            this.sprite.x = x;
            this.sprite.y = y;
        }
    });
    
    /**
     * プレイヤーキャラクター
     * @constructor
     * @extends {chatrpg.game.Chara} 
     */
    var PlayerChara = enchant.Class.create(Chara, {
        initialize: function() {
            Chara.call(this);
            
            this.nameLabel = new enchant.Label();
            this.nameLabel.font  = "10px 'Consolas', 'Monaco', 'メイリオ'";
            this.messageLabel = new chatrpg.game.MessageLabel();
            this.overlayGroup = new enchant.Group();
            this.overlayGroup.addChild(this.nameLabel);
            this.overlayGroup.addChild(this.messageLabel);
            var that = this;
            this.sprite.enterFrame = function(map) {
                var game = enchant.Game.instance;
                this.frame = this.direction * 3 + this.walk;
                if (this.isMoving) {
                    this.moveBy(this.vx, this.vy);
                    that.setPos(this.x, this.y);
                    
                    if (!(game.frame % 3)) {
                        this.walk++;
                        this.walk %= 3;
                    }
                    if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                        this.isMoving = false;
                        this.walk = 1;
                    }
                    return true;
                } else {
                    this.vx = this.vy = 0;
                    if (game.input.left) {
                        this.direction = 1;
                        this.vx = -4;
                    } else if (game.input.right) {
                        this.direction = 2;
                        this.vx = 4;
                    } else if (game.input.up) {
                        this.direction = 3;
                        this.vy = -4;
                    } else if (game.input.down) {
                        this.direction = 0;
                        this.vy = 4;
                    }
                    if (this.vx || this.vy) {
                        var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                        var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
                        if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                            this.isMoving = true;
                            arguments.callee.call(this);
                        }
                    }
                }
                return false;
            };
        },
        enterFrame: function(map) {
            return this.sprite.enterFrame(map);
        },
        setName: function(name) {
            this.setPos(this.sprite.x, this.sprite.y);
            this.nameLabel.text = name;
        },
        speak: function(text) {
            this.messageLabel.setText(text);
        },
        setPos: function(x, y) {
            this.sprite.x = x;
            this.sprite.y = y;
            this.nameLabel.x = x - (this.nameLabel._boundWidth / 2) + 16;
            this.nameLabel.y = y - 2;
            this.messageLabel.setPos(x, y);
        },
        getMoveInfo: function() {
            return { 
                x: this.sprite.x, y: this.sprite.y,
                direction: this.sprite.direction,
                frame: this.sprite.frame,
                walk: this.sprite.walk
            };
        },
        setMoveInfo: function(moveInfo) {
            this.setPos(moveInfo.x, moveInfo.y);
            this.sprite.direction = moveInfo.direction;
            this.sprite.frame = moveInfo.frame;
            this.sprite.walk = moveInfo.walk;
        },
        getOverlayGroup: function() {
            return this.overlayGroup;
        }
    });
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.Chara = Chara;
    ns.PlayerChara = PlayerChara;
}("chatrpg.game"));