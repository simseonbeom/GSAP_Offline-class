

let tween = gsap.to('.tiger',{
  x: 500,
  rotation:360,
  duration:3,

})




ScrollTrigger.create({
  trigger: '.tigerSection',
  start: 'top 75%',
  end: 'bottom 25%',
  scrub:1,
  animation: tween,
  // toggleActions: 'restart pause reverse none',
  markers: true,

})

