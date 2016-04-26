var Excrement = cc.Sprite.extend({
    ctor: function( speed ){
    this._super();
    this.initWithFile( 'res/images/excrement.png' );
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
    
     closeTo: function( excrementPos , playerPos ) {
  	    return ( ( Math.abs( playerPos.x - excrementPos.x ) <= 55 ) &&
		 ( Math.abs( playerPos.y - excrementPos.y ) <= 55 ) );
    },
    
    checkCollision: function( player ){
        var excrementPos = this.getPosition();
        var playerPos = player.getPosition();
        if ( excrementPos.y < 70 || this.closeTo( excrementPos , playerPos ))
            return true ;
        else
            return false ;
    }
})

