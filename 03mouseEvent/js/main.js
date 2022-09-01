
let cursor = document.querySelector('.cursor')
console.log(cursor.getBoundingClientRect().width / 2);


window.addEventListener('mousemove',(e)=>{
  // console.log(e.pageX, e.pageY)
  gsap.to('.cursor',{
    duration:1,
    x:  e.pageX - (cursor.clientWidth * 0.5),
    y: e.pageY -(cursor.clientHeight * 0.5),
    ease:'back'
  })
})




    // x: function (i,t,a){      
    //   return e.pageX - (gsap.getProperty(t,'width') / 2)
    // },

    const intro = document.querySelector('#intro')

    let v = gsap.utils.mapRange(0,window.innerWidth,0,50);

    

    intro.addEventListener('mousemove',(e)=>{
    
      console.log(v(e.pageX))

      gsap.to('.left',{
        duration:1,
        width: `${v(e.pageX)}%`
      })
    })

    intro.addEventListener('mouseleave',(e)=>{
      
      gsap.to('.left',{
        duration:1,
        width: '50vw'
      })
    })








