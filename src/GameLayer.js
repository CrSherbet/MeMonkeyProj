var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.currentNumBullet = GameLayer.AMOUNTOF.Bullet  ;
        this.bullet = [];
        this.obstacle = [];
        this.createElement();
        this.states = GameLayer.STATES.FRONT;
        this.addKeyboardHandlers();
        this.scheduleUpdate();
	return true;
    },
    
    update: function(){
        if( this.states == GameLayer.STATES.STARTED ){
            this.keepBullet();     
            this.hitGroundOrPlayer();
            this.hitEnemy();
            this.hitObstacle();
            this.end();
        }
    },
    
    gameStart: function(){ 
        this.states = GameLayer.STATES.STARTED; 
        this.enemy.changeStates();
        this.createObstacle();  
    },
    
    pause: function(){
        if ( this.states == GameLayer.STATES.STARTED ){
            this.states = GameLayer.STATES.PAUSED ;
            cc.director.pause();
        } else {
            this.states = GameLayer.STATES.STARTED ;
            cc.director.resume();
        }
    },
    
    backToPlay: function(){
        this.states = GameLayer.STATES.STARTED ;
        this.setUpdate();
    },
    
    end: function(){
        if ( this.playerHP.HP <= 0 || this.enemyHP.HP <= 0 ){
            this.stop();      
            this.states = GameLayer.STATES.DEAD ;
        }
    },
    
    keepBullet: function(){
        if( this.currentNumBullet == 3 ){
            this.bunchOfBullet.disappear();
        } else {
            this.bunchOfBullet.appear();
            this.canKeepBullet();
        }
        this.showStockOfBullet();
            
    },

    canKeepBullet: function(){
       if ( this.closeTo( this.bunchOfBullet , this.player ) ){
            this.bunchOfBullet.randomPos();
            this.currentNumBullet++; 
        }
    },
    
    showStockOfBullet: function(){
        for ( var i = 0 ; i < GameLayer.AMOUNTOF.Bullet ; i++ ){
            if( i < this.currentNumBullet ){
                this.bullet[i].showBullet( i+1 );
                this.bullet[i].firing = false ;
            }
            else
                this.bullet[i].decreaseStock();
        }
     },

    fireBullet: function(){ 
        if( this.canfire() ){
            for ( var i = 0 ; i < this.currentNumBullet  ; i++ ){
                if( this.currentNumBullet == i+1 ){
                    this.bullet[i+3].fire( this.player );
                }
            }
        }
    },
    
    canfire: function(){
        if( this.currentNumBullet > 0  && this.states == GameLayer.STATES.STARTED ){
            this.currentNumBullet -- ;    
            this.showStockOfBullet();
            return true ;
         }
        return false ;
    },
    
    closeTo: function( enemy , player ) {
        var playerPos = player.getPosition();
        var enemyPos = enemy.getPosition();
  	    return ( ( Math.abs( playerPos.x - enemyPos.x ) <= 60 ) &&
		 ( Math.abs( playerPos.y - enemyPos.y ) <= 60 ) );
    },
    
    hitObstacle: function(){
        for ( var i = 0 ; i < GameLayer.AMOUNTOF.Obstacle ; i++ ){
            if ( this.closeTo ( this.obstacle[i] , this.player )){
                this.playerHP.decreaseHP( 1 );
            }
        }
    },
    
    hitEnemy: function(){
        for ( var i = 3 ; i < GameLayer.AMOUNTOF.Bullet * 2 ; i++ ){
            if( this.closeTo ( this.bullet[i] , this.enemy )){
                this.enemyHP.decreaseHP( -1 );
                this.speedUp();
            }
        }
    },
    
    speedUp: function(){
        this.enemy.speedUp();
        for ( var i = 0 ; i < GameLayer.AMOUNTOF.Obstacle ; i++ ){
            this.obstacle[i].speedUp();
        }
    },
    
    hitGroundOrPlayer: function(){
        for( var i = 0 ; i < this.obstacle.length ; i++ ){
            if ( this.obstacle[i].checkCollision( this.player ) )
                this.obstacle[i].leave( this.enemy );
        }
    },
    
    createElement: function(){
        this.createBG();
        this.createPlayer();
        this.createEnemy();
        this.createBullet();
        this.createBlood();
        this.createBunchOfBullet();
    },
    
    createBG: function(){
        this.bg = new BG();
        this.addChild( this.bg , 1 );
    },
        
    createPlayer: function (){
        this.player = new Player ();
        this.addChild( this.player , 1 );
        this.player.scheduleUpdate();
    },
        
    createEnemy: function(){
        this.enemy = new Enemy ();
        this.addChild( this.enemy , 2 );
        this.enemy.scheduleUpdate();
    },
    
    createBunchOfBullet: function(){
        this.bunchOfBullet = new BunchOfBullet();
        this.addChild( this.bunchOfBullet , 1 );
        this.bunchOfBullet.scheduleUpdate();
    },
    
    createObstacle: function(){
        for ( var i = 0 ; i < GameLayer.AMOUNTOF.Obstacle ; i++ ){
            if ( i < GameLayer.AMOUNTOF.Banana )
                this.obstacle.push( new Banana ( 0.12 - Math.random()/10 ) );
            else
                this.obstacle.push( new Excrement ( 0.12 - Math.random()/10 ) );
            this.addChild( this.obstacle[i] , 1 );
            this.obstacle[i].scheduleUpdate();
        }
    },
    
    createBullet: function(){
       for (var i = 0 ; i < GameLayer.AMOUNTOF.Bullet * 2 ; i++){
            this.bullet.push( new Bullet ( i+1 ) );
            this.addChild( this.bullet[i] , 1 );
            this.bullet[i].scheduleUpdate();
        }
    },
    
    createBlood: function(){
        this.playerHP = new Blood( 620 );
        this.addChild( this.playerHP  );
        
        this.enemyHP = new Blood( 161 );
        this.addChild( this.enemyHP );
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
        if(this.states == GameLayer.STATES.FRONT )
            this.gameStart();
        if ( keyCode == 37 )
            this.player.moveLeft();
        else if ( keyCode == 39)
            this.player.moveRight();
        else if ( keyCode == 32)
            this.player.jump();
        else if ( keyCode == 67)
            this.fireBullet();
        else if ( keyCode == 80)
            this.pause();
    },
    
    onKeyUp: function( keyCode, event ) {

    } 
})

GameLayer.STATES = {
    FRONT : 1 ,
    STARTED : 2 ,
    PAUSED : 3,
    DEAD : 4
};

GameLayer.AMOUNTOF = {
    Banana : 3 ,
    Excrement : 2 ,
    Obstacle : 5 ,
    Bullet : 3 
};

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
