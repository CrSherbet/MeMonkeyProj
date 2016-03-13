var Bullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
    },
    
    randomPos: function(){
        var x = Math.random() * 700 ;
        var y = Math.random() * 300 ;
        this.setPosition( new cc.Point( x + 70 , y + 70 ));
    },
    
    closeTo: function( obj ) {
	var myPos = this.getPosition();
	var oPos = obj.getPosition();
  	return ( ( Math.abs( myPos.x - oPos.x ) <= 60 ) &&
		 ( Math.abs( myPos.y - oPos.y ) <= 60 ) );
    }
});