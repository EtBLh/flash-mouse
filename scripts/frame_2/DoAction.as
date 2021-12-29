var intervalId;
var count = 1;
var maxCount = 10;
var duration = 500;
var point = 0;
var _count = 0;
Mouse.hide();
var mouseListener = new Object();
mouseListener.onMouseMove = function()
{
   star._x = _xmouse;
   star._y = _ymouse;
};
Mouse.addListener(mouseListener);
var mySound = new Sound();
mySound.attachSound("bgmusic05.wav");
mySound.start(2,100);
var myStart = new Sound();
myStart.attachSound("開始玩");
stop();
