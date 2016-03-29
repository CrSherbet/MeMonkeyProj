var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.bg = new BG();
        this.addChild( this.bg );
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
        this.player.scheduleUpdate();
        this.enemy.scheduleUpdate();
        this.banana.scheduleUpdate();
        this.excrement.scheduleUpdate();
        
        this.checkCollision();
       
            
    },
    
    checkCollision: function(){
        if ( this.banana.checkCollision() )
            this.banana.leaveBanana( this.enemy );
        if ( this.excrement.checkCollision() )
            this.excrement.leaveExcrement( this.enemy );
    },
    
    gameStart: function(){
        this.states = GameLayer.STATES.STARTED;
        this.createPlayer();
        this.createEnemy();
        this.createBullet();
        this.createBanana();
        this.createExcrement();
        this.createFireBullet();
    },
        
    createPlayer: function (){
        this.player = new Player ();
        this.addChild( this.player , 1 );
        this.player.setPosition( new cc.Point( screenWidth / 2 , 70 ) );
        this.player.scheduleUpdate();
    },
        
    createEnemy: function(){
        this.enemy = new Enemy ();
        this.addChild( this.enemy , 2 );
        this.enemy.setPosition( new cc.Point( screenWidth - 50 , screenHeight - 200 ) );
        this.enemy.scheduleUpdate();
    },
    
    createBullet: function(){
        this.bullet = new Bullet();
        this.addChild( this.bullet );
        this.bullet.randomPos();
        this.bullet.scheduleUpdate();
    },
    
    createBanana: function(){
        this.banana = new Banana();
        this.addChild( this.banana );
        this.banana.scheduleUpdate();
    },
    
    createExcrement: function(){
        this.excrement = new Excrement();
        this.addChild( this.excrement );
        this.excrement.scheduleUpdate();
    },
    
    createFireBullet: function(){
        this.fireBullet = new fireBullet();
        this.addChild(this.fireBullet);
        this.fireBullet.scheduleUpdate();
    },
    
    keepBullet: function(){
        if ( this.bullet.closeTo( this.player ))
            this.bullet.randomPos();
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
            this.fireBullet.fire(this.player);
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
