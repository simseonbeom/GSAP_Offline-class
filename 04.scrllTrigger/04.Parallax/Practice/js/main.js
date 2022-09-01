gsap.registerPlugin(ScrollTrigger);
   
    // hills animation 
    // #h1-1
    // #h1-2
    // #h1-3
    // #h1-4
    // #h1-5
    // #h1-6
    // #h1-7
    // #h1-8
    // #h1-9

    // gsap.set('#hills1 > path',{transformPerspective:'500px'})
    const scene01 = gsap.timeline()
        .to('#h1-1',{scale:4,x:100,y:-100})
        .to('#h1-2',{scale:4,x:-500,y:-200},0)
        .to('#h1-3',{scale:3,x:500},0)
        .to('#h1-4',{scale:1.5,x:300},0)
        .to('#h1-5',{scale:1.5,x:-300},0.01)
        .to('#h1-6',{scale:2.5,x:-400},0)
        .to('#h1-7',{scale:3,x:-200},0)
        .to('#h1-8',{scale:3,x:400},0)
        .to('#h1-9',{scale:4,y:10},0)
        .to('#info',{scale:50,y:10,transformOrigin:'48% 30%'},0)

    ScrollTrigger.create({
        trigger: '.scrollElement',
        start: 'top top',
        end: '50% bottom',
        animation: scene01,
        scrub: 1,
    })
        

    let scene03 = gsap.timeline()
    .to('#bg_grad',{ attr: { cy: 300 }})
    .to('#sun',{ attr: { offset: 0.5 ,"stop-color": "red" }},0)
    .to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0)
    .to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0)
    .to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0)
    .to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0)
    .to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#2f2f2f" } }, 0)
 

        ScrollTrigger.create({
        trigger: '.scrollElement',
        start: 'top top',
        end: '100% bottom',
        animation: scene03,
        scrub: 1,
        })

    

/* 
    
    const scene01 = gsap.timeline()
        .to('#h1-1',{y:350,x:100})
        .to('#h1-2',{y:300,x:-100},0)
        .to('#h1-3',{y:400,x:130},0.01)
        .to('#h1-4',{y:300,x:70},0.01)
        .to('#h1-5',{y:200,x:-150},0.03)
        .to('#h1-6',{y:230,x:-50},0.03)
        .to('#h1-7',{y:500,x:100},0)
        .to('#h1-8',{y:300,x:100},0.03)
        .to('#h1-9',{y:300,x:-30},0)
        .to('#info',{y:800},0)
        .to('#bird',{opacity:1,y:-250,x:800},0.1)


    ScrollTrigger.create({
        trigger: '.scrollElement',
        start: 'top top',
        end: '50% bottom',
        animation: scene01,
        scrub: 1,
    })
        
    
    // text animation
    // #info   

    // bird animation
    // #bird   



    let scene02 = gsap.timeline()
          .to('#cloud1',{x:500})
          .to('#cloud2',{x:100},0)
          .to('#cloud3',{x:-1000},0)
          .to('#cloud4',{x:-700},0)

    ScrollTrigger.create({
        trigger: '.scrollElement',
        start: 'top top',
        end: '70% bottom',
        animation: scene02,
        markers:true,
        scrub: 1,
    })
        
    // coluds animation
    // #cloud1  
    // #cloud2  
    // #cloud3  
    // #cloud4  
  

    let scene03 = gsap.timeline()
    .to('#bg_grad',{ attr: { cy: 300 }})
    .to('#sun',{ attr: { offset: 0.5 }},0)
 

        ScrollTrigger.create({
        trigger: '.scrollElement',
        start: 'top top',
        end: '100% bottom',
        animation: scene03,
        scrub: 1,
        })

    // sun motion 
    // #bg_grad    attr: { cy:  }
    // #sun        attr: { offset:  }

 */

















let fullscreen;
let fsEnter = document.querySelector('#fullscr');
fsEnter.addEventListener('click', (e) => {
    e.preventDefault();
    if (!fullscreen) {
        fullscreen = true;
        document.documentElement.requestFullscreen();
        fsEnter.innerHTML = "Exit Fullscreen";
    }
    else {
        fullscreen = false;
        document.exitFullscreen();
        fsEnter.innerHTML = "Go Fullscreen";
    }
});