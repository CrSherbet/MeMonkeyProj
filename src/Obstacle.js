var Obstacle = cc.Sprite.extend({
    ctor: function( speed ){
    this._super();
    this.setInitialPosition();
    this.randomObstacle();
    this.velocity = 0;
    this.speed = - speed ;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.setPosition( pos.x , pos.y + this.velocity );
        this.velocity += this.speed ;            
    },
    
    setInitialPosition: function(){
        this.setPosition( -20 , -20 );
        this.speed = - (0.12 - Math.random() / 10);
    },
    
    randomObstacle: function(){
        if( Math.round( Math.random() * 10 ) > 4 )
            this.initWithFile( res.Banana_png );
        else
            this.initWithFile( res.Excrement_png );
    },
    
    leave: function( enemy ){
        var posXEnemy = enemy.getPositionX();
        this.setPosition( posXEnemy , screenHeight - 135 );
        this.velocity = 0;
       
    },
    
    speedUp: function(){
        if ( this.speed > - 0.2 )
            this.speed -= 0.003 ;
    },
    
    closeTo: function( obstaclePos , playerPos ) {
  	    return ( ( Math.abs( playerPos.x - obstaclePos.x ) <= 55 ) &&
		 ( Math.abs( playerPos.y - obstaclePos.y ) <= 55 ) );
    },
    
    hitGround: function(){
        if ( this.getPositionY() < 70 )
            return true ;
        return false ;
    }
});


