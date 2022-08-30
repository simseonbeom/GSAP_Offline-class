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

    
    // text animation
    // #info   

    // bird animation
    // #bird   


    // coluds animation
    // #cloud1  
    // #cloud2  
    // #cloud3  
    // #cloud4  
  

    // sun motion 
    // #bg_grad    attr: { cy:  }
    // #sun        attr: { offset:  }


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