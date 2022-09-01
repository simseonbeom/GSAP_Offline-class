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







const h2 = document.querySelector('.section02 h2');

gsap.to('.section02 h2', {
  x: 300,
  scrollTrigger: {
    trigger: '.section02',
    start: '30% center',
    end: '60% center',
    scrub: 1,
    markers: true,
    onEnter: ()=>{
      h2.textContent = 'Enter'
    },
    onLeave: ()=>{
      h2.textContent = 'Leave'
    },
    onEnterBack: ()=>{
      h2.textContent = 'EnterBack'
    },
    onLeaveBack: ()=>{
      h2.textContent = 'LeaveBack'
    },
    onUpdate: (self)=>{
      console.log(self);
      h2.textContent = 'Update'
    },
    onRefresh: ()=>{

      console.log('refresh')
    }

  },
});









if (document.querySelector('.gsap-marker-scroller-start')) {
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

  scrollbar.addListener(({ offset }) => {
    gsap.set(markers, { marginTop: -offset.y });
  });
}
