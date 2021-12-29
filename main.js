//IIFE and closures provide immutability while running html game (prevent browser console actions)
(() => {
    var img_list = (() => {
        var temp_list = [];
        for (let i = 1; i <= 45; i++){
            temp_list.push(`url(sprites/DefineSprite_89/${i}.png)`);
        }
        return temp_list;
    })();
    var machine_top = document.querySelector("div.machine.element.top");
    var machine_bottom = document.querySelector("div.machine.element.bottom");
    let mach_an = animation(machine_top, machine_bottom, img_list, 10000/45, -1, null);
    mach_an.play();
})();

//mouse closure
let mouse = (elem, score_counter) => {
    var mtop = document.createElement("div");
    var mbottom = document.createElement("div");
    var click_box = document.createElement("div");
    mtop.classList.add("view-top");
    mbottom.classList.add("view-bottom");
    click_box.classList.add("clickbox");
    elem.appendChild(mtop);
    elem.appendChild(mbottom);
    elem.appendChild(click_box);
    let active = false;
    const active_list = (()=>{
        var temp_list = [];
        for (let i = 2; i <= 37; i++){
            temp_list.push(`url(sprites/DefineSprite_103/${i}.png)`);
        }
        return temp_list; 
    })();
    const hitted_list = (()=>{
        var temp_list = [];
        for (let i = 38; i <= 74; i++){
            temp_list.push(`url(sprites/DefineSprite_103/${i}.png)`);
        }
        return temp_list; 
    })();
    const animate_duration = 1000;

    let act_an = animation(mtop, mbottom, active_list, 
        animate_duration/active_list.length, 1,
        () => {
            active = false;
        });
    let hitted_an = animation(mtop, mbottom, hitted_list, 
            animate_duration/hitted_list.length, 1,null);
    
    var smoke_list = (() => {
        var temp_list = [];
        for (let i = 1; i <= 8; i++){
            temp_list.push(`url(sprites/DefineSprite_101/${i}.png)`);
        }
        return temp_list;
    })();

    //when hitted
    click_box.addEventListener("mousedown", e=>{
        if (!active) return;
        active = false;
        act_an.interupt(true);
        hitted_an.play();
        score_counter.add();

        //effect animation
        let smoke_top = document.createElement("div");
        let smoke_bottom = document.createElement("div");
        smoke_top.classList.add("smoke-effect");
        smoke_top.classList.add("top");
        smoke_top.classList.add("element")
        smoke_bottom.classList.add("smoke-effect");
        smoke_bottom.classList.add("bottom");
        smoke_bottom.classList.add("element");
        smoke_top.style["left"] = smoke_bottom.style["left"] = e.clientX-(window.innerWidth-frame.clientWidth)/2 + "px";
        smoke_top.style["top"] = smoke_top.style["top"] = e.clientY-(window.innerHeight-frame.clientHeight)/2 + "px";
        frame.appendChild(smoke_bottom);
        frame.appendChild(smoke_top);
        let effect = animation(smoke_top,smoke_bottom,smoke_list,300/8,1,()=>{
            frame.removeChild(smoke_top);
            frame.removeChild(smoke_bottom);
        });
        effect.play();


        let hit = new Audio("sounds/102.mp3");
        hit.play();
    })
    return {
        active: function(){
            active = true;
            act_an.play();
        }
    }
}


//game closure
let game = () => {

    const game_duration = 60;

    const rand_active = () => Math.random() < 3/11;
    let playing = false;
    let sec = 0;
    let score_view = document.querySelector(".score");
    let time_view = document.querySelector(".time");
    let score_counter = (() => {
        let score = 0;
        return {
            get_score: () => score,
            add: () => {
                score++; console.log(score);
                score_view.innerHTML = score;
            },
            reset: () => {score = 0;score_view.innerHTML = score;}
        }
    })();
    let mouse_list = [];
    let gameloop = null;

    return {
        register_mouse: function(elem){
            let temp = mouse(elem, score_counter);
            mouse_list.push(temp);
        },
        start: function(){
            playing = true;
            score_counter.reset();
            sec = 0;
            counter = 0;
            gameloop = setInterval(()=>{
                sec += 0.1;
                let remaining_time = game_duration-sec;
                time_view.innerHTML=`00:${remaining_time/10<1?"0":""}${Math.floor(remaining_time)}`;
                counter += 0.1;
                if (counter >= 1.7){
                    let not_active_count = 0;
                    for (let _mouse of mouse_list){
                        if (rand_active() || not_active_count>=10) _mouse.active();
                        else not_active_count++;
                    }
                    counter = 0;
                    let out = new Audio("sounds/95.mp3");
                    out.play();
                }
            },100);
            setTimeout(this.end,game_duration*1000);
            let start = new Audio("sounds/1.mp3");
            start.play();
        },
        end: function(){
            playing = false;
            sec = 0;
            clearInterval(gameloop);
            cursor_controller.toggle_star();
            document.querySelector(".end-screen").style["display"] = "";
            document.querySelector(".result-view>.number").innerHTML = score_counter.get_score();
            document.querySelector(".time").innerHTML = "00:00";
        }
    }
}

var cursor_controller = (()=>{
    let star_cursor = document.querySelector(".star-cursor");
    let star_cursor_top = document.querySelector(".star-cursor>.view-top");
    let star_cursor_bottom = document.querySelector(".star-cursor>.view-bottom");

    let frame = document.querySelector("#frame");
    frame.addEventListener("mousemove", e => {
        star_cursor.style["left"] = e.clientX-(window.innerWidth-frame.clientWidth)/2 + "px";
        star_cursor.style["top"] = e.clientY-(window.innerHeight-frame.clientHeight)/2 + "px";
    })
    var star_cur_list = (() => {
        var temp_list = [];
        for (let i = 1; i <= 40; i++){
            temp_list.push(`url(sprites/DefineSprite_60/${i}.png)`);
        }
        return temp_list;
    })();
    let star_an = animation(star_cursor_top, star_cursor_bottom, star_cur_list, 1000/40,-1, null);
    star_an.play();

    let hammer_cursor_top = document.querySelector(".hammer-cursor>.view-top");
    let hammer_cursor_bottom = document.querySelector(".hammer-cursor>.view-bottom");
    let hammer_cursor = document.querySelector(".hammer-cursor");

    frame.addEventListener("mousemove", e => {
        hammer_cursor.style["left"] = e.clientX-(window.innerWidth-frame.clientWidth)/2 + "px";
        hammer_cursor.style["top"] = e.clientY-(window.innerHeight-frame.clientHeight)/2 + "px";
    })
    var hammer_cur_list = (() => {
        var temp_list = [];
        for (let i = 1; i <= 7; i++){
            temp_list.push(`url(sprites/DefineSprite_132/${i}.png)`);
        }
        return temp_list;
    })();
    let hammer_an = animation(hammer_cursor_top, hammer_cursor_bottom, hammer_cur_list, 200/7,1, null);
    hammer_an.play();

    frame.addEventListener("mousedown", e => {
        hammer_an.play();
    });

    return {
        toggle_star: function(){
            hammer_cursor.style["opacity"] = 0;
            star_cursor.style["opacity"] = 1;
        },
        toggle_hammer: function(){
            hammer_cursor.style["opacity"] = 1;
            star_cursor.style["opacity"] = 0;
        }
    }
})();


//main
(() => {
    let main = game();
    let mouse_elem = document.querySelectorAll(".mouse");
    for (melem of mouse_elem){
        main.register_mouse(melem);
    }
    cursor_controller.toggle_star();
    document.querySelector(".start-btn").addEventListener("click",e => {
        document.querySelector(".start-screen").style["display"] = "none";
        main.start();
        cursor_controller.toggle_hammer();
    });
    document.querySelector(".restart").addEventListener("click",e => {
        document.querySelector(".end-screen").style["display"] = "none"
        document.querySelector(".start-screen").style["display"] = "none";;
        main.start();
        cursor_controller.toggle_hammer();
    });

})();

//other sound effects
(() => {
    document.querySelectorAll(".btn").forEach(elem => {
        elem.addEventListener("mouseenter", () => {
            let btnhover = new Audio("sounds/95.mp3");
            btnhover.play();
        })
    })
    document.querySelector(".leave").addEventListener("mouseenter", () => {
        let leave = new Audio("sounds/70.mp3");
        leave.play();
    })
    let bgm = new Audio("sounds/bgm.mp3");
    bgm.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    //chrome doesnt allow autoplay
    let autoplay = function(e){
        bgm.play();
        document.removeEventListener("mousedown",autoplay);
    }
    document.addEventListener("mousedown",autoplay);
})();