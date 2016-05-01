var Winner = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/win.png' );
        this.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
        cc.audioEngine.playMusic('res/Sound/winner.wav', false );
    }
});

var Loser = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/lose.png' );
        this.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
        cc.audioEngine.playMusic('res/Sound/loser.wav', false );
    }
});