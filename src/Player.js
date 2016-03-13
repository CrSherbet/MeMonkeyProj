var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/tiger.png' );
        this.velocity = 0;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x , pos.y + this.velocity ) );
        if( pos.y > 100)
            this.velocity += Player.G ;
        else if( pos.y < 100 || pos.y == 100){
            this.velocity = 0 ;
            pos.y = 100 ;
        }
    },
    moveRight: function(){
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x + 8 , pos.y ) );
    },
    
    moveLeft: function(){
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x - 8 , pos.y ) );
    },
    
    jump: function(){
        this.velocity = Player.JUMP_VELOCITY ;
    }
});

Player.G = -1 ;
Player.JUMP_VELOCITY = 250 ;