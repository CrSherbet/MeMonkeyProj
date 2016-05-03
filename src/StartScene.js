var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.director.setDisplayStats(false);
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        layer.scheduleUpdate();

    }
});
