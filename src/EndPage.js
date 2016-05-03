var Winner = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.WinnerPage );
        this.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
        cc.audioEngine.playMusic( res.WinnerSound , false );
        cc.director.setDisplayStats(false);
    }
});

var Loser = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.LoserPage );
        this.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
        cc.audioEngine.playMusic( res.LoserSound , false );
        cc.director.setDisplayStats(false);
    }
});