var Bullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
        this.firing = false;
    },
    
    update: function( dt ){
        if(this.firing){
            var pos = this.getPosition();
            this.setPosition( new cc.Point ( pos.x , pos.y + 5 ));
            this.hitBorder(pos);
        }        
    },
    
    
    hitBorder: function( pos ){
        if( pos.y + 5 >= screenHeight ){
                this.setPosition( new cc.Point ( 15 , 15 ));
                this.firing = false ;
        }
    },
    
   fire: function( player ){
       this.firing = true ;
        var posXPlayer = player.getPositionX();
        this.setPosition( new cc.Point ( posXPlayer , 75 ));       
    }
})
