




ScrollTrigger.create({
  trigger: '.progressHolder',
  start: 'top ' + (document.querySelector('.section01').offsetHeight - 150),
  // end: '+=2000',

  endTrigger:'.section02',
  end: 'bottom bottom',
  animation: gsap.to('.progress',{scaleX:1,ease:'none'}),
  pin: true,
  pinSpacing: false,
  onUpdate:({animation})=>{
    
    document.querySelector('.percent span').textContent = (animation.progress() * 100).toFixed(0)
    
     
  },
  markers: true,
  scrub: true,
})






let circleLength = document.querySelector('.close circle').getTotalLength();


let rectLength = document.querySelector('.rectContainer rect').getTotalLength();

console.log(rectLength);
gsap.set('.close circle',{
  attr:{
    'stroke-dasharray' : circleLength + 2,
    'stroke-dashoffset' : circleLength + 2
  }
})
gsap.set('.rectContainer rect',{
  attr:{
    'stroke-dasharray' : rectLength + 2,
    'stroke-dashoffset' : rectLength + 2
  }
})

let progress = gsap.timeline({
  defaults:{
    ease:'none'
  }
})
 .to('.close circle',{attr:{
  'stroke-dashoffset' : 0
}})
.to('.rectContainer rect',{attr:{
  'stroke-dashoffset' : 0
}},0)

ScrollTrigger.create({
  trigger: '.scroll-content',
  start: 'top top',
  end: 'bottom bottom',
  animation: progress,
  scrub: true,
})






markers()

