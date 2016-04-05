var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.bg = new BG();
        this.addChild( this.bg , 1 );
        this.bg.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
        this.states = GameLayer.STATES.FRONT;
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        
	return true;
    },
    
    update: function(){
        if ( this.states == GameLayer.STATES.FRONT ){
            this.states = GameLayer.STATES.STARTED;
            this.gameStart();
        }
        this.keepBullet();     
        this.checkCollision();
            
    },
    
    checkCollision: function(){
        if ( this.banana1.checkCollision() )
            this.banana1.leaveBanana( this.enemy );
        if ( this.banana2.checkCollision() )
            this.banana2.leaveBanana( this.enemy );
        if ( this.excrement.checkCollision() )
            this.excrement.leaveExcrement( this.enemy );
    },
    
    gameStart: function(){
        this.states = GameLayer.STATES.STARTED;
        this.createPlayer();
        this.createEnemy();
        this.createBunchOfBullet();
        this.createBanana();
        this.createExcrement();
        this.createBullet();
        this.createBlood();
    },
        
    createPlayer: function (){
        this.player = new Player ();
        this.addChild( this.player , 1 );
        this.player.setPosition( new cc.Point( screenWidth / 2 , 120 ) );
        this.player.scheduleUpdate();
    },
        
    createEnemy: function(){
        this.enemy = new Enemy ();
        this.addChild( this.enemy , 2 );
        this.enemy.setPosition( new cc.Point( screenWidth - 50 , screenHeight - 120 ) );
        this.enemy.scheduleUpdate();
    },
    
    createBunchOfBullet: function(){
        this.bunchOfBullet = new BunchOfBullet();
        this.addChild( this.bunchOfBullet , 1 );
        this.bunchOfBullet.randomPos();
        this.bunchOfBullet.scheduleUpdate();
    },
    
    createBanana: function(){
        this.banana1 = new Banana( 0.057 );
        this.addChild( this.banana1 , 1 );
        this.banana1.scheduleUpdate();
        
        this.banana2 = new Banana( 0.15 );
        this.addChild( this.banana2 , 1 );
        this.banana2.scheduleUpdate();
    },
    
    createExcrement: function(){
        this.excrement = new Excrement();
        this.addChild( this.excrement , 1 );
        this.excrement.scheduleUpdate();
    },
    
    createBullet: function(){
        this.bullet = new Bullet();
        this.addChild( this.bullet , 1 );
        this.bullet.scheduleUpdate();
    },
    
    createBlood: function(){
        this.playerHP = new Blood( 161 );
        this.addChild( this.playerHP  );
        
        this.enemyHP = new Blood( 619 );
        this.addChild( this.enemyHP );
    },
    
    keepBullet: function(){
        if ( this.bunchOfBullet.closeTo( this.player ))
            this.bunchOfBullet.randomPos();
    },
    
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == 37 )
            this.player.moveLeft();
        else if ( keyCode == 39)
            this.player.moveRight();
        else if ( keyCode == 32)
            this.player.jump();
        else if ( keyCode == 67)
            this.bullet.fire( this.player );
    },
    
    onKeyUp: function( keyCode, event ) {

    }
})

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD : 3
};

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
