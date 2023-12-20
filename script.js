function locomotivefun(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotivefun()


const cursor = document.getElementById("cursor");
const page1 = document.querySelector(".page1");
const page1_content = document.querySelector("#page1_content");


// Without gsap we can use mousemove event and ca perofrm the cursor animation
// page1.addEventListener("mousemove",function(e){
//     cursor.style.left = e.x+"px";
//     cursor.style.top = e.y+"px";
// })

page1.addEventListener("mousemove",function(e){
gsap.to(cursor,{
    x:e.x,                  // gsap brings smooth animation 
    y:e.y
})
})

page1_content.addEventListener("mouseenter",()=>{
gsap.to(cursor,{
    scale:1,
    opacity:1
})
})
page1_content.addEventListener("mouseleave",()=>{
    gsap.to(cursor,{
        scale:0,
        opacity:0
    })
})

var t1 = gsap.timeline()
function page2Animation(){
    t1.from("#page2_content h1 span",{
        y:100,
        stagger:0.5,
        duration:2,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top 47%",
            end:"top 46%",
            marker:true,
            scrub:2
        }
    })
    t1.from("#page2_heading h2",{
        y:100,
        stagger:0.1,
        duration:1,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top 51%",
            end:"top 40%",
            marker:true,
            scrub:2
        }
    })
}
page2Animation()





var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: -10,
  loop: true,
  effect: 'slide',
  speed: 50000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  on: {
    slideChangeTransitionEnd: function () {
      swiper.autoplay.start();
    },
  },
  on: {
    transitionStart: function () {
      document.querySelector('.swiper-wrapper').style.transitionTimingFunction = 'linear'; 
    },
    slideChangeTransitionEnd: function () {
      document.querySelector('.swiper-wrapper').style.transitionTimingFunction = 'linear';
      swiper.autoplay.start();
    },
  },

});


t1.from("#loader h3",{
  x:40,
  opacity:0,
  stagger:0.3,
  duration:1
})
t1.to("#loader h3",{
  opacity:0,
  x:-40,
  stagger:0.1,
  duration:1
})
t1.to("#loader",{
  opacity:0,
 
})
t1.from("#page1_content h1 span",{
  y:100,
  opacity:0,
  stagger:0.1,
  duration:0.5,
  delay:-0.5
})
t1.to("#loader",{
  display:"none"
 
})
