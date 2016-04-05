var Banana = cc.Sprite.extend({
    ctor: function( speed ){
    this._super();
    this.initWithFile( 'res/images/banana.png' );
    this.velocity = 0;
    this.speed = -speed;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.setPosition( new cc.Point ( pos.x , pos.y + this.velocity ));
        this.velocity += this.speed ;
            
    },
    
    leaveBanana: function( enemy ){
        var posXEnemy = enemy.getPositionX();
        this.setPosition( new cc.Point ( posXEnemy , screenHeight - 135));
        this.velocity = 0;
       
    },
    
    checkCollision: function(){
        var pos = this.getPosition();
        if ( pos.y < 70)
            return true ;
        else
            return false ;
    }
})


