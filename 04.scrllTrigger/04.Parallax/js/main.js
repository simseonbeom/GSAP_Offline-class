let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    markers:true  
});




scene1.from("#right_rock", { x: 500, ease: "power1.in" }, 0)
scene1.from("#big_right_bottom_rock", { x: 1500, ease: "power1.in" }, 0)
scene1.from("#small_right_bottom_rock", { x: 700, ease: "power1.in" }, 0)

scene1.from("#small_left_bottom_rock", { x: -1000, ease: "power1.in" }, 0)
scene1.from("#big_left_bottom_rock", { x: -2500, ease: "power1.in" }, 0)
scene1.from("#md_left_bottom_rock", { y: 400, ease: "power1.in" }, 0)
scene1.from("#small_left_right_rock", { x: -200, ease: "power1.in" }, 0)
scene1.from("#small_left_rock", { x: -120, ease: "power1.in" }, 0)

scene1.from("#small_left_center_rock", { y: 200, ease: "power1.in" }, 0)
scene1.from("#small_left_top_rock", { y: 100, ease: "power1.in" }, 0)
scene1.from("#small_left_top_rock-2", { y: 150, ease: "power1.in" }, 0)

scene1.from("#right_planet", {x:30, y: 30, ease: "power1.in" }, 0)
gsap.set("#planet", {transformPerspective:'600px',transformOrigin:"80% 50% -400px"})
scene1.from("#planet", {opacity:0,z:-300, scale: 0, ease: "power1.in" }, 0)
scene1.from("#title", {opacity:0, y: 30, ease: "power1.in" }, 0)