var Enemy = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/monkey.png' );
        this.setPosition( new cc.Point( Math.random() * 750 + 50 , screenHeight - 120 ) );
        this.direction = Enemy.DIRECTION.LEFT ;
        this.states = Enemy.STATES.FRONT ;
    },
    
    update: function( dt ){
        if( this.states == Enemy.STATES.STARTED )
            this.changeDirection();
    },
    
    changeStates: function(){
        if( this.states == Enemy.STATES.FRONT )
            this.states = Enemy.STATES.STARTED ;
    },
    
    changeDirection: function(){
        var pos = this.getPosition();
        if ( pos.x > screenWidth -50 )
            this.direction = Enemy.DIRECTION.LEFT ;
        else if ( pos.x < 50 )
            this.direction = Enemy.DIRECTION.RIGHT ;
        this.setPosition( new cc.Point( pos.x + this.direction , pos.y ));
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