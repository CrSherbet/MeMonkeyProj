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
        if ( this.states == GameLayer.STATES.FRONT )
            cc.director.pause() ;
        else if( this.states == GameLayer.STATES.STARTED ){
            this.keepBullet();     
            this.hitEnemy();
            this.hitObstacle();
            this.end();
        }
    },
    
    gameStart: function(){ 
        cc.director.resume() ;
        cc.audioEngine.playMusic( res.BackGroundSound , true );
        this.states = GameLayer.STATES.STARTED; 
        this.enemy.changeStates();
        this.removeChild( this.pressBar );
    },
    
    pause: function(){
        if ( this.states == GameLayer.STATES.STARTED ){
            this.states = GameLayer.STATES.PAUSED ;
            cc.director.pause();
            cc.audioEngine.pauseMusic();
            this.createResumeButton();   
            this.createRestartButton( screenWidth / 2 + 100 , screenHeight / 2 );
        }
    },
    
    setInitialValue: function(){
        this.setInitBullet();
        this.setInitObstacle();
        this.enemy.changeStates();
        this.player.setInitialPosition();
        this.enemy.setInitialPosition();
        this.playerHP.setInitialValue();
        this.enemyHP.setInitialValue();
        this.blastEff.hide();
        this.showPressBar();
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
                                     
    end: function(){
        if ( Math.round(this.playerHP.HP) <= 0 )    
            this.showEndPage( GameLayer.CHARACTER.Enemy );
        else if ( Math.round(this.enemyHP.HP) <= 0 )
            this.showEndPage( GameLayer.CHARACTER.Player );
    },
    
    showEndPage: function( winner ){
        this.states = GameLayer.STATES.DEAD ;
        if ( winner == GameLayer.CHARACTER.Enemy )    
            this.endPage = new Loser ();
        else
            this.endPage = new Winner();
        this.addChild( this.endPage , 3 );
        this.createRestartButton( screenWidth - 100 , 100 );
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
            this.bullet[ this.findAvBullet() ].fire( this.player );
        }
    },
    
    findAvBullet: function(){
        for( i = GameLayer.AMOUNTOF.Bullet ; i< this.bullet.length ; i++ ){
            if( this.bullet[i].firing == false )
                return i ;
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
                cc.audioEngine.playEffect( res.hitObjectSound );
            } else if ( this.obstacle[i].hitGround() )
                this.obstacle[i].leave( this.enemy );
        }
    },
    
    hitEnemy: function(){
        for ( var i = 3 ; i < GameLayer.AMOUNTOF.Bullet * 3 ; i++ ){
            if( this.closeTo ( this.bullet[i] , this.enemy )){
                this.showBlastEff( this.bullet[i] );
                this.enemyHP.decreaseHP( -1 );
                this.speedUp();
                this.bullet[i].hide();
                cc.audioEngine.playEffect( res.hitObjectSound );
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
        this.createObstacle();  
    },
    
    createBG: function(){
        this.bg = new BG();
        this.addChild( this.bg , 1 );
        cc.director.setDisplayStats( false );
        this.showPressBar();
    },
    
    showPressBar: function(){
        this.pressBar = new PressBar();
        this.addChild( this.pressBar , 4 );
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
       for (var i = 0 ; i < GameLayer.AMOUNTOF.Bullet * 3 ; i++){
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
    
    createResumeButton : function(){
        this.resumeItem = new cc.MenuItemImage( res.ResumeBEFORE , res.ResumeAFTER , this.resumeAction , this);
        this.resumeButton = new cc.Menu( this.resumeItem );
        this.resumeButton.setPosition( screenWidth / 2 - 100 , screenHeight / 2 );
        this.addChild( this.resumeButton , 4);
    },
    
    resumeAction: function(){
        this.states = GameLayer.STATES.STARTED ;
        cc.director.resume();
        cc.audioEngine.resumeMusic();
        this.removeChild( this.resumeButton );
        this.removeChild( this.restartButton );
    },
    
    createRestartButton : function( posX , posY ){
        this.restartItem = new cc.MenuItemImage( res.RestartBEFORE , res.RestartAFTER , this.restartAction , this);
        this.restartButton = new cc.Menu( this.restartItem );
        this.restartButton.setPosition( posX , posY );
        this.addChild( this.restartButton , 4);
    },
    
    restartAction: function(){
        cc.audioEngine.stopMusic();
        this.states = GameLayer.STATES.FRONT ;
        this.setInitialValue();
        this.currentNumBullet = GameLayer.AMOUNTOF.Bullet ;
        this.removeChild( this.resumeButton );
        this.removeChild( this.restartButton ); 
        this.removeChild( this.endPage );
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
    },
    
    onKeyUp: function( keyCode, event ) {

    } 
                                     
});

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
