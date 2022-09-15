
// const value = {
//   number: 0
// }

// gsap.to(value,{
//   number: 1000,
//   snap:'number',
//   duration:5,
//   onUpdate:()=>{
//     console.log(value.number);
//   }
// })

// gsap.to('.box',{
//   x:500,
//   duration:3,
//   snap:'x'
// })

// const video = document.querySelector('#video');


// ScrollTrigger.create({
//   trigger: '.section03',
//   start: 'top center',
//   end: 'bottom center',
//   markers:true,
//   onToggle:({isActive})=>{

//     isActive ? video.play() : video.pause()
//   }
  
// })


const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const frameCount = 147;

const currentFrame = (index)=>{
  return (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
  )
}


const images = []
const watch = {
  frame:0
}

for(let i = 0; i < frameCount; i++){
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img)
}

gsap.to(watch,{
  frame: frameCount -1,
  snap:'frame',
  ease:'none',
  scrollTrigger: {
    trigger:'.section02',
    start:'top top',
    pin: true,
    end:'+=2000',
    scrub:true
  },
  onUpdate:()=> {
    
  }
})




images[0].onload = render

function render(){
  ctx.drawImage(images[watch.frame],0,0)
}
 


markers()

