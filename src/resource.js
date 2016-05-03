var res = {
    HelloWorld_png : 'res/HelloWorld.png',
    BunchBullet_png :  'res/images/bunchOfBullet.png' ,
    WinnerPage : 'res/images/win.png',
    LoserPage : 'res/images/lose.png',
    WinnerSound : 'res/Sound/winner.wav',
    LoserSound : 'res/Sound/loser.wav', 
    BackGroundSound : 'res/Sound/background.wav',
    hitObjectSound : 'res/Sound/hitObject.wav',
    Monkey_png : 'res/images/monkey.png',
    BG_png : 'res/images/BG.png',
    Tiger_png : 'res/images/tiger.png',
    Bullet_png : 'res/images/bullet.png',
    Banana_png : 'res/images/banana.png',
    Excrement_png : 'res/images/excrement.png',
    ResumeBEFORE : 'res/images/resume1.png',
    ResumeAFTER : 'res/images/resume2.png',
    RestartBEFORE : 'res/images/restart1.png',
    RestartAFTER : 'res/images/restart2.png'
}
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
