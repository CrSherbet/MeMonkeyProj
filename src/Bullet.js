var Bullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
    },
    
    update: function( dt ){
        //this.randomPos();
    },
    
    randomPos: function(){
        var x = Math.random() * 700 ;
        var y = Math.random() * 300 ;
        console.log("x: "+x);
        console.log("y: "+y);
        this.setPosition( new cc.Point( x + 70 , y + 70 ));
    },
    
    closeTo: function( obj ) {
	var myPos = this.getPosition();
	var oPos = obj.getPosition();
  	return ( ( Math.abs( myPos.x - oPos.x ) <= 50 ) &&
		 ( Math.abs( myPos.y - oPos.y ) <= 50 ) );
    }
});