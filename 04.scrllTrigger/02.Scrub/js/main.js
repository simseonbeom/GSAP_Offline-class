let scene02 = gsap.timeline()
  .to('.feev', { yPercent: 150 })
  .to('.solution', { yPercent: -80}, 0)
  .to('.hyper', { yPercent: 50 }, 0)
  .to('.videoContainer', { width: '100vw',height:'100vh' });



  ScrollTrigger.create({
    trigger: '.section02',
    start: 'top top',
    end: '+=2000',
    // end: 'bottom center',
    animation: scene02,
    // markers: true,// 
    pin:true,
    scrub: 1,
  })



  let feevText= gsap.to('.feev_text',{
    scale:50,
    transformOrigin:'55% 35%',
    ease:'power3.in',
    scrollTrigger: {
      trigger: '.section03',
      start: 'top top',
      // end:'bottom center',
      end: `+=3000`,
      markers:true,
      pin:true,
      // end: 'bottom bottom',
      scrub:1
    }
  })

  let scene04 = gsap.timeline()
  .from('.visual01',{opacity:0,xPercent:-50,yPercent:-30})
  .from('.visual02',{opacity:0,xPercent:10,yPercent:50},0)
  .from('.visual03',{opacity:0,xPercent:50,yPercent:30},0)
  .to('.description',{opacity:1,x:0},0.2)


   
  ScrollTrigger.create({
    trigger: '.section04',
    start: 'top top',
    end: '+=1500',
    animation: scene04,
    // markers: true,
    pin:true,
    scrub: 1,
  
  })
