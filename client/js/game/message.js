/**
 * @fileoverview 発言ラベル部分。
 */
(function(namespace) {
    /**
     * 発言ラベル
     * @constructor
     * @extends {enchant.Group} 
     */
    MessageLabel = enchant.Class.create(enchant.Group, {
        initialize: function() {
            enchant.Group.call(this);
            this.textWidth = 0;
            this.rectWidth = 0;
            this.talkLabel = new enchant.Label(this.talkText);
            this.talkLabel.color = 'black';
            this.bgBalloon = new enchant.Sprite(480, 32);
            this.bgBalloonImage = new enchant.Surface(480, 32);
            this.bgBalloon.image = this.bgBalloonImage;
            this.addChild(this.bgBalloon);
            this.addChild(this.talkLabel);
        },
        setText: function(text) {
            this.talkLabel.text = text;
            this.textWidth = this.talkLabel._boundWidth;
            this.rectWidth = Math.max(64, this.textWidth * 1.5);
            this.bgBalloonImage.clear();
            this.fillRoundRect_(this.bgBalloonImage.context, 0, 0, this.rectWidth, 24, 8);
        },
        setPos: function(x, y) {
            this.talkLabel.x = x + 16 - this.textWidth / 2;
            this.talkLabel.y = y - 24;
            this.bgBalloon.x = x + 16 - this.rectWidth / 2;
            this.bgBalloon.y = y - 30;
        },
        fillRoundRect_: function(ctx, l, t, w, h, r) {
            var pi = Math.PI;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(l + r, t + r, r, - pi, - 0.5 * pi, false);
            ctx.arc(l + w - r, t + r, r, - 0.5 * pi, 0, false);
            ctx.arc(l + w - r, t + h - r, r, 0, 0.5 * pi, false);
            ctx.arc(l + r, t + h - r, r, 0.5 * pi, pi, false);
            ctx.closePath();
            ctx.fill();
            /* 三角形を描く */
            ctx.beginPath();
            ctx.moveTo((l + w) / 2, t + h + 5);
            ctx.lineTo((l + w) / 2 + 5, t + h);
            ctx.lineTo((l + w) / 2 - 5, t + h);
            ctx.closePath();
            /* 三角形を塗りつぶす */
            ctx.fill();
        }
    });
    
    var ns = chatrpg.common.addNamespace(namespace);
    ns.MessageLabel = MessageLabel;
}("chatrpg.game"));