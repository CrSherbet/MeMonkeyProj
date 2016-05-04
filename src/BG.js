var BG = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.BG_png );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});

var PressBar = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.PressBar );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});