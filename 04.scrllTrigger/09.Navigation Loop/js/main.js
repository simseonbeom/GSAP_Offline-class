




const navColor = ['rgb(235 222 193)','rgb(233 170 177)','rgb(146 224 211)','rgb(82 190 203)','rgb(241 118 131)']

// let sectionTop = []
// gsap.utils.toArray('.section').forEach((item)=>{
//    console.log(item.getBoundingClientRect().top)

//    sectionTop.push(item.getBoundingClientRect().top)
// })

const navHeight =_=> document.querySelector('.nav').offsetHeight;

const sectionTop = gsap.utils.toArray('.section').map((item)=> item.getBoundingClientRect().top - ( navHeight() -1) )







gsap.utils.toArray('.section').forEach((section,index)=>{

  
  ScrollTrigger.create({
    trigger: section,
    start: ()=> 'top ' + navHeight(),
    end: ()=> 'bottom ' + navHeight(),
    animation: gsap.to('.nav',{backgroundColor:navColor[index],immediateRender:false}),
    markers: true,
    toggleActions: 'restart none none reverse'
    
  })
})




const init = ()=>{
  navHeight()
  markers();
}


gsap.utils.toArray('.nav li').forEach((item,index)=>{
  
  item.addEventListener('click',()=>{
      scrollbar.scrollTo(0,sectionTop[index],600)

    
  })

})





ScrollTrigger.addEventListener('refreshInit',init)


















