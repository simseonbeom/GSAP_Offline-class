


/* 

page01.

splitText로 라인 만들고 scrollTrigger 애니메이션 넣기


page02.

revert() 
ScrollTrigger.getAll()


*/
 

let split;

const init = () =>{

  split = new SplitText('p',{type:'lines'})
  const splitCover = new SplitText('p',{type:'lines',linesClass:'cover'})

  split.lines.forEach((item,index)=>{
    ScrollTrigger.create({
      trigger: splitCover.lines[index],
      start: 'top 90%',
      // end: 'bottom center',
      animation: gsap.from(item,{duration:1,opacity:0,y:300,filter:'blur(15px)'}),
      // markers:true,
      
    })
  })
  
  

  markers();

  
}


const killAll = () =>{
  split.revert()
  ScrollTrigger.getAll().forEach((item)=> item.kill())
  init()
}





const debounce = (callback, time = 500)=>{
  let timeOut;  
  return function (){
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      callback.apply(this,arguments)
    }, time);
  }
}


window.addEventListener('resize',debounce((e)=>{
  console.log(e)
  // console.log('hi');
  killAll();
}))





window.addEventListener('load', () => init());








