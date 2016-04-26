var BlastEff = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/blastEff.png' );
        this.setPosition( new cc.Point( -15 , -15 ));
    }
});
