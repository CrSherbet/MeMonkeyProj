var Banana = cc.Sprite.extend({
    ctor: function( speed ){
    this._super();
    this.initWithFile( 'res/images/banana.png' );
    this.velocity = 0;
    this.speed = - speed ;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.setPosition( new cc.Point ( pos.x , pos.y + this.velocity ));
        this.velocity += this.speed ;
            
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
    
    closeTo: function( bananaPos , playerPos ) {
  	    return ( ( Math.abs( playerPos.x - bananaPos.x ) <= 55 ) &&
		 ( Math.abs( playerPos.y - bananaPos.y ) <= 55 ) );
    },
    
    checkCollision: function( player ){
        var bananaPos = this.getPosition();
        var playerPos = player.getPosition();
        if ( bananaPos.y < 70 || this.closeTo( bananaPos , playerPos ))
            return true ;
        else
            return false ;
    }
});


