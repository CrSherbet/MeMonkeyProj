var Blood = cc.Sprite.extend({
    ctor: function( posX ) {
        this._super();
        this.initWithFile( 'res/images/blood.png' );
        this.setPosition( new cc.Point( posX , 38.5 ));
        this.HP = 100 ;
    },
    
    decreaseHP: function( obj ){
        var pos = this.getPosition();
        this.HP -= 0.815 ;
        if ( obj == 1 )
            this.setPosition( new cc.Point ( pos.x + 1.5 , pos.y ));
        else
            this.setPosition( new cc.Point ( pos.x - 1.5 , pos.y ));
    }
    
});
