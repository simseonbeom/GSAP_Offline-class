gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('#container');


const options = {
  
    damping: 0.1,
    alwaysShowTracks: true,
    
  
}
const scrollbar = Scrollbar.init(container, {
  ...options
});

ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value; // setter
    }
    return scrollbar.scrollTop; // getter
  },
});

scrollbar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: container });








gsap.to('.section02 h2', {
  x: 300,
  scrollTrigger: {
    trigger: '.section02',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
    markers: true,

  },
});





if (document.querySelector('.gsap-marker-scroller-start')) {
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

  scrollbar.addListener(({ offset }) => {
    gsap.set(markers, { marginTop: -offset.y });
  });
}
