var Excrement = cc.Sprite.extend({
    ctor: function(){
    this._super();
    this.initWithFile( 'res/images/excrement.png' );
    this.velocity = 0;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.setPosition( new cc.Point ( pos.x , pos.y + this.velocity ));
        this.velocity += Excrement.G ;
            
    },
    
    leaveExcrement: function( enemy ){
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

Excrement.G = -0.025;