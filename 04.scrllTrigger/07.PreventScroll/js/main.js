



let scene01 = gsap.timeline({
  defaults:{
    duration:2,
    ease:'power2.inOut'
  },
  onComplete: onComplete,
  onReverseComplete:onReverseComplete

})



.from('.visual01',{x:-300,y:-300})
.from('.visual02',{x:100,y:500},'-=1')
.from('.visual03',{x:300,y:300},'-=1')
.to('svg circle',{attr:{r:'100vw'},duration:2, ease:'power3.in'});
    

function onComplete(){
   
   scrollbar.scrollTo(0,innerHeight,600,{
    callback:()=> {
      gsap.set('#no-scroll',{display:'none'});      
    }
   })
}

function onReverseComplete(){

  gsap.set('#no-scroll',{display:'none'});      
}

ScrollTrigger.create({
  trigger: '.section02',
  start: 'top top',
  end: 'bottom bottom',
  animation: gsap.to('.section02 h2',{rotation:360}),
  onLeaveBack:()=>{
    gsap.set('#no-scroll',{display:'block'});      
    scrollbar.scrollTo(0,0,600)
    scene01.duration(1).reverse()
  },
  markers: true,
  scrub: true,
})




//  section02를 떠난 시점에 사용자의 스크롤을 막아주세요.
//  스크롤의 위치를 제일 최상단으로 올려주세요.
//  scene01 애니메이션 reverse 되도록 만들어 주세요. 










markers();