


let goToTop = gsap.timeline()
      .to('.goToTop img',{y:0,opacity:1,ease:'back(3)'})
      .to('.goToTop a',{y:0,opacity:1,ease:'back(3)'},'-=0.3')


      ScrollTrigger.create({
            trigger: '.scroll-content',
            start: '75% bottom',
            animation: goToTop,
            markers: true,
            //  event :      E     L   EB   LB 
            toggleActions: 'play none none reverse',
            toggleClass: {targets:'.goToTop',className:'active' },
            fastScrollEnd: 1500,
            
      })




      const topButton = document.querySelector('.goToTop a');


      topButton.addEventListener('click',()=>{
            
            scrollbar.scrollTo(0,0,600,);
            // gsap.to(window,{scrollTo:"#section01",duration:2,ease:'back'})

      })





















markers() // set markers position 
