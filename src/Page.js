var FirstPage = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.FirstPage );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});

var InstructionPage = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.InstructionPage );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});

var BG = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.BG_png );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});

var Winner = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.WinnerPage );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
        cc.audioEngine.playMusic( res.WinnerSound , false );
        cc.director.setDisplayStats(false);
    }
});

var Loser = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.LoserPage );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
        cc.audioEngine.playMusic( res.LoserSound , false );
        cc.director.setDisplayStats(false);
    }
});

var PressBar = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.PressBar );
        this.setPosition( screenWidth / 2 , screenHeight / 2 );
    }
});