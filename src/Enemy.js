var Enemy = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.Monkey_png );
        this.setInitialPosition();
        this.direction = Enemy.DIRECTION.LEFT ;
        this.states = Enemy.STATES.FRONT ;
        this.speed = 1 ;
    },
    
    update: function( dt ){
        if( this.states == Enemy.STATES.STARTED )
            this.changeDirection();
    },
    
    changeStates: function(){
        if( this.states == Enemy.STATES.FRONT )
            this.states = Enemy.STATES.STARTED ;
        else if( this.states == Enemy.STATES.STARTED )
            this.states = Enemy.STATES.FRONT ;
    },
    
    speedUp: function(){
        if(this.speed < 3 )
            this.speed += 0.05 ;
    },
    
    changeDirection: function(){
        var pos = this.getPosition();
        if ( pos.x > screenWidth - 50 )
            this.direction = Enemy.DIRECTION.LEFT ;
        else if ( pos.x < 50 )
            this.direction = Enemy.DIRECTION.RIGHT ;
        this.setPosition( new cc.Point( pos.x + this.direction * this.speed , pos.y ));
    },
    
    setInitialPosition: function(){
        this.setPosition( new cc.Point( Math.random() * 700 + 50 , screenHeight - 120 ) );
    }
});

Enemy.DIRECTION = {
    LEFT : -3 ,
    RIGHT :  3
};

Enemy.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD : 3
};