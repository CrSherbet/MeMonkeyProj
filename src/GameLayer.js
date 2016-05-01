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
            this.hitEnemy();
            this.hitObstacle();
            this.end();
        }
    },
    
    gameStart: function(){ 
        cc.audioEngine.playMusic('res/Sound/background.wav', true );
        this.states = GameLayer.STATES.STARTED; 
        this.enemy.changeStates();
        this.createObstacle();  
       
    },
    
    pause: function(){
        if ( this.states == GameLayer.STATES.STARTED ){
            this.states = GameLayer.STATES.PAUSED ;
            cc.director.pause();
            cc.audioEngine.pauseMusic();
        } else {
            this.states = GameLayer.STATES.STARTED ;
            cc.director.resume();
            cc.audioEngine.resumeMusic();
        }
    },
    
    setInitialValue: function(){
        this.setInitBullet();
        this.setInitObstacle();
        this.player.setInitialPosition();
        this.enemy.setInitialPosition();
        this.playerHP.setInitialValue();
        this.enemyHP.setInitialValue();
    },
    
    setInitBullet: function(){
        for( var i = 3 ; i < GameLayer.AMOUNTOF.Bullet * 2 ; i++){
            this.bullet[i].hide();
        }
        this.bunchOfBullet.setDefault();
    },
    
    setInitObstacle: function(){
        for( var i = 0 ; i < GameLayer.AMOUNTOF.Obstacle ; i++){
            this.obstacle[i].setInitialPosition();
        }
    },
                                     
    restart: function(){
        this.setInitialValue();
        this.currentNumBullet = GameLayer.AMOUNTOF.Bullet ;
        this.states = GameLayer.STATES.FRONT ;
        this.enemy.changeStates();
    },
    
    end: function(){
        if ( Math.round(this.playerHP.HP) <= 0 )    
            this.showEndPage( GameLayer.CHARACTER.Enemy );
        else if ( Math.round(this.enemyHP.HP) <= 0 )
            this.showEndPage( GameLayer.CHARACTER.Player );
        cc.audioEngine.stopAllEffects();
        
    },
    
    showEndPage: function( winner ){
        this.states = GameLayer.STATES.DEAD ;
        if ( winner == GameLayer.CHARACTER.Enemy )    
            this.endPage = new Loser();
        else
            this.endPage = new Winner();
        this.addChild( this.endPage , 3 );
    },
    
    keepBullet: function(){
        if( this.currentNumBullet == 3 ){
            this.bunchOfBullet.setDefault();
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
                this.bullet[i].hide();
        }
     },

    fireBullet: function(){ 
        if( this.canfire() ){
            this.currentNumBullet -- ;   
            this.bullet[ this.currentNumBullet + 3 ].fire( this.player );
        }
    },
    
    canfire: function(){
        if( this.currentNumBullet > 0  && this.states == GameLayer.STATES.STARTED ){
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
                this.showBlastEff( this.obstacle[i] );
                this.playerHP.decreaseHP( 1 );
                this.obstacle[i].leave( this.enemy );
                cc.audioEngine.playEffect('res/Sound/hitObject.wav', true );
            } else if ( this.obstacle[i].hitGround() )
                this.obstacle[i].leave( this.enemy );
        }
    },
    
    hitEnemy: function(){
        for ( var i = 3 ; i < GameLayer.AMOUNTOF.Bullet * 2 ; i++ ){
            if( this.closeTo ( this.bullet[i] , this.enemy )){
                this.showBlastEff( this.bullet[i] );
                this.enemyHP.decreaseHP( -1 );
                this.speedUp();
                this.bullet[i].hide();
                cc.audioEngine.playEffect('res/Sound/hitObject.wav' , true );
            }
        }
    },
    
    showBlastEff: function( obstacle ){
        this.blastEff.time = 20 ;
        var obsPos = obstacle.getPosition();
        this.blastEff.setPosition ( obsPos.x , obsPos.y );
    },
    
    speedUp: function(){
        this.enemy.speedUp();
        for ( var i = 0 ; i < GameLayer.AMOUNTOF.Obstacle ; i++ ){
            this.obstacle[i].speedUp();
        }
    },
    
    createElement: function(){
        this.createBG();
        this.createPlayer();
        this.createEnemy();
        this.createBullet();
        this.createBlood();
        this.createBunchOfBullet();
        this.createBlastEff();
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
    
    createBlastEff: function(){
        this.blastEff = new BlastEff ();
        this.addChild( this.blastEff , 2 );
        this.blastEff.scheduleUpdate();
    },
    
    createBunchOfBullet: function(){
        this.bunchOfBullet = new BunchOfBullet();
        this.addChild( this.bunchOfBullet , 1 );
        this.bunchOfBullet.scheduleUpdate();
    },
    
    createObstacle: function(){
        for ( var i = 0 ; i < GameLayer.AMOUNTOF.Obstacle ; i++ ){
            this.obstacle.push( new Obstacle ( 0.12 - Math.random() / 10 ) );
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
        else if ( keyCode == 39 )
            this.player.moveRight();
        else if ( keyCode == 32 )
            this.player.jump();
        else if ( keyCode == 67 )
            this.fireBullet();
        else if ( keyCode == 80 )
            this.pause();
        else if ( keyCode == 78 )
            this.restart();

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

GameLayer.CHARACTER = {
    Player: 1 ,
    Enemy: 2
};

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.director.setDisplayStats(false);
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        layer.scheduleUpdate();

    }
});
