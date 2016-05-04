var BlastEff = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/blastEff.png' );
        this.time = 0 ; 
        this.setPosition( -15 , -15 );
    },
    
    update: function( dt ){
        if (this.time > 0 )
            this.time --;
        if( this.time == 0)
            this.setPosition( -15, -15 );
    }
});
