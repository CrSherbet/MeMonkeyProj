var Loser = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/lose.png' );
        this.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
    }
});