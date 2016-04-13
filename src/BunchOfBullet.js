var BunchOfBullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bunchOfBullet.png' );
        this.status = false ;
    },
    
    randomPos: function(){
        var x = Math.random() * 700 ;
        var y = Math.random() * 280 ;
        this.setPosition( new cc.Point( x + 70 , y + 70 ));
    },
    
    closeTo: function( obj ) {
	var myPos = this.getPosition();
	var oPos = obj.getPosition();
  	return ( ( Math.abs( myPos.x - oPos.x ) <= 60 ) &&
		 ( Math.abs( myPos.y - oPos.y ) <= 60 ) );
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

