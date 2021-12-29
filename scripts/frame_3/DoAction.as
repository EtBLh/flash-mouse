function executeCallback()
{
   trace("executeCallback intervalId: " + intervalId + " count: " + count);
   i = 1;
   while(i <= 11)
   {
      var newName = "a" + i;
      eval(newName)._count = 0;
      i++;
   }
   count++;
}
stop();
var n1Now;
var n10Now;
var now = new Date();
var startTimeS;
startTimeS = now.getTime();
var timeinterS;
delete now;
var point = 0;
var mouseListener = new Object();
mouseListener.onMouseDown = function()
{
   bump.gotoAndPlay(2);
};
Mouse.addListener(mouseListener);
startDrag(bump,1,0,0,800,600);
i = 1;
while(i <= 11)
{
   var newName = "a" + i;
   eval(newName).ok = false;
   eval(newName).lock = false;
   eval(newName).ran = 0;
   eval(newName)._count = 0;
   i++;
}
this.onEnterFrame = function()
{
   var nowTimeS;
   var now = new Date();
   nowTimeS = now.getTime();
   var a;
   a = (nowTimeS - startTimeS) / 1000;
   timeinterS = 60 - Math.floor((nowTimeS - startTimeS) / 1000);
   delete now;
   if(a <= 60)
   {
      if(timeinterS < 10)
      {
         var n1 = "0" + timeinterS;
         sTime.text = n1;
      }
      else
      {
         var n10 = timeinterS;
         sTime.text = n10;
      }
   }
   else
   {
      sTime.text = "00";
      gotoAndStop(6);
      myScore.gotoAndStop(14);
      clearInterval(intervalId);
      delete this.enterFrame;
   }
   myScore.point_txt.text = point;
   point1.text = point;
   i = 1;
   while(i <= 11)
   {
      var newName = "a" + i;
      if(count % 2 == 0 && eval(newName)._count == 0)
      {
         eval(newName)._count = 1;
         eval(newName).ran = random(5);
         trace(eval(newName).ran);
         if(eval(newName).ran == 1 && !eval(newName).ok)
         {
            eval(newName).ok = true;
            trace(eval(newName).ok);
            eval(newName).gotoAndPlay(2);
         }
      }
      i++;
   }
   a1.box.onPress = function()
   {
      a1.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a2.box.onPress = function()
   {
      a2.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a3.box.onPress = function()
   {
      a3.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a4.box.onPress = function()
   {
      a4.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a5.box.onPress = function()
   {
      a5.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a6.box.onPress = function()
   {
      a6.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a7.box.onPress = function()
   {
      a7.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a8.box.onPress = function()
   {
      a8.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a9.box.onPress = function()
   {
      a9.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a10.box.onPress = function()
   {
      a10.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
   a11.box.onPress = function()
   {
      a11.gotoAndPlay(42);
      point++;
      myScore.gotoAndPlay(2);
   };
};
intervalId = setInterval(this,"executeCallback",duration);
