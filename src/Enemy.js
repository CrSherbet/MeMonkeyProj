var Enemy = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/monkey.png' );
        this.direction = Enemy.DIRECTION.LEFT ;
    },
    update: function( dt ){
        this.changeDirection();
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