var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.createElement();
        this.states = GameLayer.STATES.FRONT;
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        this.amountOfBullet = 3 ;
        
	return true;
    },
    
    update: function(){
         if( this.states == GameLayer.STATES.STARTED ){
            this.keepBullet();     
            this.hitBorder();
            this.hitPoison();
        }   
    },
    
    gameStart: function(){ 
        this.states = GameLayer.STATES.STARTED; 
        this.enemy.changeStates();
       
    },
    
    keepBullet: function(){
        if( this.checkFullStock() ){
            this.bunchOfBullet.disappear();
        } else {
            this.bunchOfBullet.appear();
            this.canKeepBullet();
        }
        this.showStockOfBullet();
            
    },
        
    canKeepBullet: function(){
       if ( this.closeTo( this.bunchOfBullet ,this.player ) ){
            this.bunchOfBullet.randomPos();
            this.amountOfBullet++; 
        }
    },
    
    checkFullStock: function(){
         if(this.amountOfBullet == 3)
            return true ;
    },
    
    showStockOfBullet: function(){
         if( this.amountOfBullet == 1){
            this.firstBullet.showNumOfBullet( this.amountOfBullet );
            this.firstBullet.firing = false ;
        }
        else if( this.amountOfBullet == 2 ){
            this.secondBullet.showNumOfBullet( this.amountOfBullet );
            this.secondBullet.firing = false ;
        }
        else if( this.amountOfBullet == 3){
            this.thirdBullet.showNumOfBullet( this.amountOfBullet ); 
            this.thirdBullet.firing = false ;
        }
     },

    
    fireBullet: function(){ 
        if( this.amountOfBullet == 1 )
            this.firstBullet.fire( this.player );
        else if ( this.amountOfBullet == 2 )
            this.secondBullet.fire( this.player );
        else if ( this.amountOfBullet == 3)
            this.thirdBullet.fire( this.player );
        this.amountOfBullet -- ;        
    },
    
    closeTo: function( enemy , player ) {
	var playerPos = player.getPosition();
	var enemyPos = enemy.getPosition();
  	return ( ( Math.abs( playerPos.x - enemyPos.x ) <= 60 ) &&
		 ( Math.abs( playerPos.y - enemyPos.y ) <= 60 ) );
    },
    
    hitPoison: function(){
        if ( this.closeTo ( this.banana1 , this.player ) || this.closeTo ( this.banana2 , this.player ) || this.closeTo ( this.excrement , this.player)){
            this.playerHP.decreaseHP( 1 );
            
        }
        else if ( this.closeTo ( this.firstBullet , this.enemy ) || this.closeTo ( this.secondBullet , this.enemy ) || this.closeTo ( this.thirdBullet , this.enemy )){ 
            this.enemyHP.decreaseHP( -1 );
            this.enemy.speedUp();
            this.banana1.speedUp();
            this.banana2.speedUp();
        }
        if ( this.playerHP.HP <= 0 || this.enemyHP.HP <= 0 )
            this.stop();
    },
    
    hitBorder: function(){
        if ( this.banana1.checkCollision() )
            this.banana1.leaveBanana( this.enemy );
        if ( this.banana2.checkCollision() )
            this.banana2.leaveBanana( this.enemy );
        if ( this.excrement.checkCollision() )
            this.excrement.leaveExcrement( this.enemy );
    },
    
    createElement: function(){
        this.createBG();
        this.createPlayer();
        this.createEnemy();
        this.createBunchOfBullet();
        this.createBanana();
        this.createExcrement();
        this.createBullet();
        this.createBlood();
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
        this.firstBullet = new Bullet( 1 );
        this.addChild( this.firstBullet , 1 );
        this.firstBullet.scheduleUpdate();
        
        this.secondBullet = new Bullet( 2 );
        this.addChild( this.secondBullet , 1 );
        this.secondBullet.scheduleUpdate();
        
        this.thirdBullet = new Bullet( 3 );
        this.addChild( this.thirdBullet , 1 );
        this.thirdBullet.scheduleUpdate();

     /*   var bullet = new Array ( this.amountOfBullet ) ;
        for ( var i = 0 ; i< this.amountOfBullet ; i++){
            console.log("5555");
            bullet[i] = new Bullet ( i+1 );
            this.addChild( bullet[i] );
            bullet[i].scheduleUpdate();
        }*/
       
    },
    
    createBlood: function(){
        this.playerHP = new Blood( 619 );
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
        else if ( keyCode == 67){
            if(this.amountOfBullet >0)
                this.fireBullet();
        }
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
