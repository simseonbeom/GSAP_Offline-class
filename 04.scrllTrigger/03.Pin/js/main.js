
gsap.registerPlugin(SplitText);


let split = new SplitText('h3',{type:'chars'});

let tl = gsap.timeline()
    .from('.tiger',{scale:0,ease:'back(3)'})
    .from(split.chars,{y:70,opacity:0,stagger:0.1,ease:'back(3)'})


    ScrollTrigger.create({
      trigger: '.banner',
      start: 'top center',
      // end: 'bottom bottom',
      horizontal:true,
      end: '+=500',
      animation: tl,
      markers: true,
      pin:true,
      pinSpacing:false,
      // pinType:'transform',
      scrub: 1,
    })
