

/* eslint no-irregular-whitespace: off */
/* 

page01.

onToggle을 이용한 section02 색상 변경 애니메이션
- 일반 토글액션
- 조건부 애니메이션으로 onToggle
- 하나의 애니메이션과 조건부 값으로 onToggle
- onToggle 트윈 토글

gnb 변경

lnb 변경 

section02에서의 lnb 색상만 변경 

*/
 




const navColor = ['rgb(235 222 193)','rgb(233 170 177)','rgb(146 224 211)','rgb(82 190 203)','rgb(241 118 131)']





const navHeight = () => document.querySelector('.nav').offsetHeight;


const sections = gsap.utils.toArray('.section').map((item)=> item.getBoundingClientRect().top - (navHeight() -1))


gsap.utils.toArray('.section').forEach((item,index)=>{

  ScrollTrigger.create({
    trigger: item,
    start: ()=> 'top ' + navHeight(),
    end: () => 'bottom ' + navHeight(),
    animation: gsap.to('.nav',{backgroundColor:navColor[index],
    immediateRender:false}),
    toggleActions: 'restart none none reverse',
    // markers: true,
    
  })






});







gsap.utils.toArray('.nav li').forEach((item,index)=>{

  item.addEventListener('click',()=>{
    scrollbar.scrollTo(0,sections[index],600)
  
  })

})






















const init = ()=>{
  navHeight();
  markers();
}


ScrollTrigger.addEventListener('refreshInit', init)








