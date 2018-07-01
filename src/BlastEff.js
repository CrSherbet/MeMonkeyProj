var BlastEff = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/blastEff.png' );
        this.time = 0 ; 
        this.hide();
    },
    
    update: function( dt ){
        if (this.time > 0 )
            this.time --;
        if( this.time == 0)
            this.hide();
    },
    
    hide: function(){
         this.setPosition( -15 , -15 );
         console.log(test);
    }
});
