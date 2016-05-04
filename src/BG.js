var BG = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.BG_png );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});