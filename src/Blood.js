var Blood = cc.Sprite.extend({
    ctor: function( posX ) {
        this._super();
        this.initWithFile( 'res/images/blood.png' );
        this.setPosition( new cc.Point( posX , 38.5 ));
    }  
    
});
