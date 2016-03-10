var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.bg = new BG();
        this.addChild( this.bg );
        this.bg.setPosition( new cc.Point( screenWidth / 2 , screenHeight / 2 ) );
        this.states = GameLayer.STATES.FRONT;
        this.scheduleUpdate();
        
	return true;
    },
    
    update: function(){
        if ( this.states == GameLayer.STATES.FRONT ){
            this.states = GameLayer.STATES.STARTED;
            this.gameStart();
        }
        this.player.scheduleUpdate();
        this.enemy.scheduleUpdate();
    },
        
    gameStart: function(){
        this.states = GameLayer.STATES.STARTED;
        this.createPlayer();
        this.createEnemy();
    },
        
    createPlayer: function (){
        this.player = new Player ();
        this.addChild( this.player , 1 );
        this.player.setPosition( new cc.Point( screenWidth / 2 , 80 ) );
        this.player.scheduleUpdate();
    },
        
    createEnemy: function(){
        this.enemy = new Enemy ();
        this.addChild( this.enemy , 2 );
        this.enemy.setPosition( new cc.Point( screenWidth - 50 , screenHeight - 135 ) );
        this.enemy.scheduleUpdate();
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
