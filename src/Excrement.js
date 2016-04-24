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
    
    checkCollision: function( player ){
        var pos = this.getPosition();
        var playerPos = player.getPosition();
        if ( pos.y < 70 || ( pos.x == playerPos.x && pos.y == playerPos.y ))
            return true ;
        else
            return false ;
    }
})

