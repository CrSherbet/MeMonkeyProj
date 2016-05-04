var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( res.Tiger_png ) ;
        this.setInitialPosition();
        this.dirMove = "" ;
        this.xVelocity = 0 ;
        this.yVelocity = 0 ;
    },
    
    update: function( dt ){
        var pos = this.getPosition();
        this.calGavity();
        this.calFiction();
        this.setPosition( pos.x + this.xVelocity , pos.y + this.yVelocity );
       
    },
    
    calGavity: function (){
        var pos = this.getPosition() ;
        if( pos.y + this.yVelocity > 120 )
            this.yVelocity += Player.G ;
        else 
            this.yVelocity = 0 ;
    },
    
    calFiction: function (){
        var pos = this.getPosition();
        if ( this.dirMove ==  "right" && this.xVelocity > 0 )
            this.xVelocity -= 0.5;
        else if ( this.dirMove ==  "left" && this.xVelocity < 0 )
            this.xVelocity += 0.5;
        if( pos.x + this.xVelocity > screenWidth - 50  || pos.x + this.xVelocity < 50 )
            this.xVelocity = 0;
    },
    
    moveRight: function(){
        this.xVelocity = Player.MOVE_RIGHT;
        this.dirMove = "right";
    },
    
    moveLeft: function(){
        this.xVelocity = Player.MOVE_LEFT ;
        this.dirMove = "left";
    },
    
    jump: function(){
        if ( this.getPositionY() <= 230 && this.getPositionY() >= 120 ){
             this.yVelocity = Player.JUMP_VELOCITY ; 
        }
    },
    
    setInitialPosition: function(){
        this.setPosition( screenWidth / 2 , 120 ) ;
    }
});

Player.G = -1 ;
Player.JUMP_VELOCITY = 15 ;
Player.MOVE_RIGHT = 10 ;
Player.MOVE_LEFT = -10 ;