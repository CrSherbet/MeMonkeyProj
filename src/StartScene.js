var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.director.setDisplayStats(false);
        this.firstPage = new FirstPage();
        this.addChild( this.firstPage );
        this.createStartButton();
        this.createInstructionButton();
        cc.audioEngine.playMusic( res.FirstPageSound , true );
    },
    
     createStartButton : function( ){
        this.startItem = new cc.MenuItemImage( res.StartBEFORE , res.StartAFTER , this.startAction , this);
        this.startButton = new cc.Menu( this.startItem );
        this.startButton.setPosition( 560 , 260 );
        this.addChild( this.startButton , 1);
    },
    
    startAction: function(){
        this.removeChild( this.firstPage );
        this.removeChild( this.startButton );
        this.removeChild( this.instButton );
        cc.audioEngine.playEffect( res.ClickSound );
        cc.audioEngine.stopMusic();
        this.createGameLayer();
    },
    
    createGameLayer(){
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        layer.scheduleUpdate();
    },
    
    createInstructionButton: function(){
       this.instItem = new cc.MenuItemImage( res.InstBEFORE , res.InstAFTER , this.instAction , this);
        this.instButton = new cc.Menu( this.instItem );
        this.instButton.setPosition( 560 , 140 );
        this.addChild( this.instButton , 1) ;
    },
    
    instAction: function(){
        this.instPage = new InstructionPage();
        this.addChild( this.instPage , 2 );
        this.createBackButton();
        cc.audioEngine.playEffect( res.ClickSound );
    },
    
    createBackButton: function(){
         this.backItem = new cc.MenuItemImage( res.BackBtnBEFORE , res.BackBtnAFTER , this.backAction , this);
        this.backButton = new cc.Menu( this.backItem );
        this.backButton.setPosition( screenWidth - 40, screenHeight - 40  );
        this.addChild( this.backButton , 3 );
    },
    
    backAction: function(){
        this.removeChild( this.instPage );
        this.removeChild( this.backButton );
        cc.audioEngine.playEffect( res.ClickSound );
    }
});
