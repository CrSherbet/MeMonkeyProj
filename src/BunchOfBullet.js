var BunchOfBullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bunchOfBullet.png' );
        this.setPosition( new cc.Point( -15 , -15 ));
        this.status = false ;
    },
    
    randomPos: function(){
        var x = Math.random() * 700 ;
        var y = Math.random() * 280 ;
        this.setPosition( new cc.Point( x + 70 , y + 70 ));
    },
    
    disappear: function(){
        this.setPosition( new cc.Point( 850 , 650 ));
        this.status = false ;
    },
    
    appear : function(){
        if(!this.status){
            this.randomPos();
        }
        this.status = true ;
    }
});

