var Obstacle = cc.Sprite.extend({
    ctor: function( speed ){
    this._super();
    this.randomObstacle();
    this.velocity = 0;
    this.speed = - speed ;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.setPosition( new cc.Point ( pos.x , pos.y + this.velocity ));
        this.velocity += this.speed ;
            
    },
    
    setInitialPosition: function(){
        this.setPosition( new cc.Point( -15 , -15 ) );
    },
    
    randomObstacle: function(){
        if( Math.round( Math.random() * 10 ) > 4 )
            this.initWithFile( 'res/images/banana.png' );
        else
            this.initWithFile( 'res/images/excrement.png' );
    },
    
    leave: function( enemy ){
        var posXEnemy = enemy.getPositionX();
        this.setPosition( new cc.Point ( posXEnemy , screenHeight - 135));
        this.velocity = 0;
       
    },
    
    speedUp: function(){
        if ( this.speed > - 0.2 )
            this.speed -= 0.001 ;
    },
    
    closeTo: function( obstaclePos , playerPos ) {
  	    return ( ( Math.abs( playerPos.x - obstaclePos.x ) <= 55 ) &&
		 ( Math.abs( playerPos.y - obstaclePos.y ) <= 55 ) );
    },
    
    checkCollision: function( player ){
        var obstaclePos = this.getPosition();
        var playerPos = player.getPosition();
        if ( obstaclePos.y < 70 || this.closeTo( obstaclePos , playerPos ))
            return true ;
        else
            return false ;
    }
});


