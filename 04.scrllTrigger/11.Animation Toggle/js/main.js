

/* eslint no-irregular-whitespace: off */
/* 

page01.

onToggle을 이용한 section02 색상 변경 애니메이션
- 일반 토글액션
- 조건부 애니메이션으로 onToggle
- 하나의 애니메이션과 조건부 값으로 onToggle
- onToggle 트윈 토글

lnb 변경 

section02에서의 lnb 색상만 변경 

*/
 


ScrollTrigger.create({
  trigger: '.section02',
  start: 'top center',
  end: 'bottom center',
  animation: gsap.to('.section02',{background:'black'}),
  markers: true,
  //  event          E       L  EB   LB 
  // toggleActions: 'restart reverse restart reverse'
  onToggle:({isActive,animation})=>{

    animation.reversed(!isActive)
    
    // gsap.to('.section02',{background:isActive ? 'black':'white'})

      // if(isActive){
      //   gsap.to('.section02',{background:'black'})
      // }else{
      //   gsap.to('.section02',{background:'white'})
      // }


  }

  
})




gsap.utils.toArray('.section').forEach((item,index)=>{

  let lnbAnimation = gsap.timeline()
    .to(`.lnb li:nth-child(${index + 1}) .dot`,{scale:2})
    .to(`.lnb li:nth-child(${index + 1}) span`,{opacity:1,x:30,color:()=>{
      
      if(index === 1){
      
        // return 'white'
      }
    }},0)

  ScrollTrigger.create({
    trigger: item,
    start: 'top center',
    end: 'bottom center',
    animation: lnbAnimation,
    toggleActions: 'play reverse play reverse'

  })
  
})


ScrollTrigger.create({
  trigger: '.scroll-content',
  start: 'top top',
  end: 'bottom bottom',
  animation: gsap.from('.progress',{scaleY:0,transformOrigin:'center top'}),
  scrub: true,
})

















markers();




