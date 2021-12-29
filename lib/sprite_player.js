let animation = (top, bottom, img_list, interval, times, callback) => {
    var animator = null;
    var playing = false;
    return {
        interupt: function(smooth){
            if (!playing) return;
            clearInterval(animator);
            if (smooth){
                top.style["background-image"] = "";
                bottom.style["background-image"] = "";
            }
            if (callback != null)
                callback(); 
        },
        play: function(){
            if (playing){
                clearInterval(animator);
            };
            playing = true;
            var timer = 0, next = 1;
            top.style["background-image"] = img_list[timer];
            animator = window.setInterval(()=>{
                if (++timer > 44) timer = 0;
                next = timer + 1 > 44? 0: timer+1;
                if (timer % 2 == 0){
                    bottom.style["background-image"] = img_list[next];
                    top.style["opacity"] = "1";
                    bottom.style["opacity"] = "0";
                } else {
                    top.style["background-image"] = img_list[next];
                    bottom.style["opacity"] = "1";
                    top.style["opacity"] = "0";
                }
            }, interval);
            if (times != -1)
                window.setTimeout(()=>{
                    playing = false;
                    clearInterval(animator);
                    top.style["background-image"] = "";
                    bottom.style["background-image"] = "";
                    if (callback != null)
                        callback();
                }, img_list.length*interval*times);
        }
    }
}