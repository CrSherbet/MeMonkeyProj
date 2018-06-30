var Blood = cc.Sprite.extend({
    ctor: function( posX ) {
        this._super();
        this.initWithFile( 'res/images/blood.png' );
        this.setPosition( posX , 38.5 );
        this.HP = 100 ;
        this.posX = posX ;
    },
    
    decreaseHP: function( obj ){
        var pos = this.getPosition();
        this.HP -= 4.53 ;
        if ( obj == 1 )
            this.setPosition( pos.x + 8.5 , pos.y );
        else
            this.setPosition( pos.x - 8.5 , pos.y );
    },
    
    setInitialValue: function(){
        this.setPosition( this.posX , 38.5 );
        this.HP = 100 ;
    },

    testBugspot: function(){
        console.log('jjkljk')
    }
});
