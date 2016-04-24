var Bullet = cc.Sprite.extend({
    ctor: function( numOfBullet ) {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
        this.numOfBullet = numOfBullet;
        this.firing = false ;
        this.showBullet();       
    },
    
    update: function( dt ){
        if(this.firing){
            var pos = this.getPosition();
            this.setPosition( new cc.Point ( pos.x , pos.y + 5 ));
            this.hitBorder(pos);
        }        
    },
    
    showBullet: function(  ){
        if( this.numOfBullet == 1 )
            this.setPosition( new cc.Point( 745 , 35 ));
        else if ( this.numOfBullet == 2 )
            this.setPosition( new cc.Point( 760 , 35 ));
        else if ( this.numOfBullet == 3 )
            this.setPosition( new cc.Point( 775 , 35 ));
        else 
            this.setPosition( new cc.Point( -15 , -15 ));
    },
    
    decreaseStock: function(){
        this.setPosition( new cc.Point ( -15 , -15 ));    
    },
    
    hitBorder: function( pos ){
        if( pos.y + 5 >= screenHeight ){
                this.setPosition( new cc.Point ( -10 , -10 ));
        }
    },
    
   fire: function( player ){
        this.firing = true ;
        var posPlayer = player.getPosition();
        this.setPosition( new cc.Point ( posPlayer.x , posPlayer.y ));
    }
})
