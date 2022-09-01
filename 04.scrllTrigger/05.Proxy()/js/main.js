gsap.registerPlugin(ScrollTrigger);


const container = document.querySelector('#container');

const option = {
  damping:0.1,
  alwaysShowTracks:true,
}

const scrollbar =  Scrollbar.init(container,{
  ...option
})



// Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element: 
ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value; // setter
    }
    return scrollbar.scrollTop;    // getter
  }
});




// when the smooth scroller updates, tell ScrollTrigger to update() too: 
scrollbar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({scroller: container})




// scrollbar.addListener((e)=>{
//   h2.style.transform = x * e.offetY
// })


ScrollTrigger.create({
  trigger: '.section02',
  start: 'top center',
  end: 'bottom center',
  animation: gsap.to('.section02 h2',{
    x: 500,
  }),
  markers: true,
  scrub: 1,
})






if (document.querySelector('.gsap-marker-scroller-start')) {
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

  scrollbar.addListener(({ offset }) => {
    gsap.set(markers, { marginTop: -offset.y });
  });
}


