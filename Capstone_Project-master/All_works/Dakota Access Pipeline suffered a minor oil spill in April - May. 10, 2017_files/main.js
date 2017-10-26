//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var tl1;
var tl2;
var stopWatchMain;
var stopWatchHero;
var stopWatchQ1;

//INITIALIZE
function init(){
    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();
    tl1 = new TimelineLite();
    tl2 = new TimelineLite();

    addListeners();
    animate();
}

function animBlueBar(){
    stopWatchHero=new Date().getTime(); 
    tl1

    .to(screen_blue_bar, 9, {width:215}) //"+=5.05"

    //.call(returnTimerHero) 
}

function animMarquee(){
    stopWatchHero=new Date().getTime(); 
    tl2




    //.call(returnTimerHero) 
}

function animQ(){
    stopWatchQ1=new Date().getTime(); 
    tl1

    .timeScale(1.5)

    .staggerFrom([screen_blue_dots_1,screen_blue_dots_2,screen_blue_dots_3,
            screen_blue_dots_4,screen_blue_dots_5,screen_blue_dots_6,
            screen_blue_dots_7,screen_blue_dots_8], .15, {opacity:0, ease: Power0.easeNone}, 0.06)
    .staggerTo([screen_blue_dots_1,screen_blue_dots_2,screen_blue_dots_3,
        screen_blue_dots_4,screen_blue_dots_5,screen_blue_dots_6,
        screen_blue_dots_7,screen_blue_dots_8], .15, {opacity:0, ease: Power0.easeNone}, 0.06, "-=.05")
    .staggerTo([screen_blue_dots_1,screen_blue_dots_2,screen_blue_dots_3,
        screen_blue_dots_4,screen_blue_dots_5,screen_blue_dots_6,
        screen_blue_dots_7,screen_blue_dots_8], .15, {opacity:1, ease: Power0.easeNone}, 0.06, "+=.05")
    .staggerTo([screen_blue_dots_1,screen_blue_dots_2,screen_blue_dots_3,
        screen_blue_dots_4,screen_blue_dots_5,screen_blue_dots_6,
        screen_blue_dots_7,screen_blue_dots_8], .15, {opacity:0, ease: Power0.easeNone}, 0.06, "-=.05")

    //.call(returnTimerQ1) //1.35 seconds apx
}

function addListeners(){
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */

    container.onmouseover=function(){cta_Over()};
    container.onmouseout=function(){cta_Out()};
}



//ANIMATE
function animate(){
    stopWatchMain=new Date().getTime(); 
    //timeline animation here
    tl
    .set([cta,cta_over], {opacity:0, visibility:'hidden'})
    .set(screen_blue_dots_container, {scale:.5, opacity:0})
	

    //.addPause()

    .from(no_wifi, 2.5, {scale:1.2, x:-10, y:-10, z: 0.1, rotationZ: 0.01, force3D:true, transformPerspective:1000, transformStyle:"preserve-3d"})
    .to(no_wifi, .5, {opacity:0}, "-=.5")
    .to(copy1, .5, {opacity:0}, "+=1.8")

    //White dots going from phone to screen
    .staggerFrom([phone_dots1,phone_dots2,phone_dots3,phone_dots4,phone_dots5,phone_dots6,
                phone_dots7,phone_dots8,phone_dots9,phone_dots10,phone_dots11,
                phone_dots12], .1, {opacity:0, ease: Power1.easeOut}, 0.05, "+=0")

    //Screen Connecting & Loader Blue Circles
    .set(screen_blue_dots_container, {opacity:1})
    .from(screen_connecting, .5, {opacity:0}, "-=.35")
    .add(animQ, "-=.35")


    .to(screen_video, .25, {opacity:0}, "+=.5")
   

    .add("video", "+=0")
    .from(screen_video, .5, {transformOrigin: "50% 50% 0", scale:.25, opacity:0}, "video")
    .to(legal1, .5, {opacity:0}, "video-=.25")
    .from(legal2, .5, {opacity:0}, "video+=.25")
    
    //End-Frame
    .from(tablet_ef, 1, {opacity:0, x:25, ease: Power2.easeOut}, "+=2")
    .to(legal2, .5, {opacity:0}, "-=1")
    .from(copy1_ef, .5, {opacity:0}, "-=.5")
    .set([cta,cta_over], {opacity:0, visibility:'visible'})
    .to(cta, .5, {opacity:1})
   
    .call(returnTimerMain)
}

function cta_Over(){
      TweenLite.to(cta_over,.2,{opacity:1});
      TweenLite.to(cta,.2,{opacity:0});
}
function cta_Out(){
       TweenLite.to(cta,.2,{opacity:1});
       TweenLite.to(cta_over,.2,{opacity:0});
}

function returnTimerMain(){
    stopWatchMain=((new Date().getTime())-stopWatchMain)*.001;
    console.log(stopWatchMain+" seconds");
}

function returnTimerHero(){
    stopWatchHero=((new Date().getTime())-stopWatchHero)*.001;
    console.log(stopWatchHero+" seconds");
}

function returnTimerQ1(){
    stopWatchQ1=((new Date().getTime())-stopWatchQ1)*.001;
    console.log(stopWatchQ1+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};