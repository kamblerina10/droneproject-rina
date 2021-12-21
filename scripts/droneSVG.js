let leftBtn = document.getElementById('leftBtn')
let rightBtn = document.getElementById('rightBtn')
let moveBtn = document.getElementById('moveBtn')
let drone_image = document.getElementById('drone_image')
let reportBtn = document.getElementById('reportBtn')
let placeBtn = document.getElementById('placeBtn')
let attackBtn = document.getElementById('attackBtn')

let angleRotation = 0;
let x= 0, y=0;
let drone_direction = ''
let fire_d = 150;
let max_X = 360, max_Y = 360, min_X = 0, min_Y = 0

placeBtn.addEventListener('click',()=>{
    let xCord = document.getElementById('xCord').value 
    let yCord = document.getElementById('yCord').value 
    let dir_drone = document.getElementById('dir_drone').value 

    if(dir_drone === 'east'){
        angleRotation = 0
    }else if(dir_drone === 'west'){
        angleRotation = 180
    }else if(dir_drone === 'north'){
        angleRotation = 270
    }else if(dir_drone === 'south'){
        angleRotation = 90
    }else{
        angleRotation = 0
    }

    if(xCord){
        xCord = parseInt(xCord)
        x = xCord
    }
            
    if(yCord){
        yCord = parseInt(yCord)
        y = yCord
    }
            
    drone_image.setAttribute('x',x)
    drone_image.setAttribute('y',y)
    drone_image.setAttribute('transform',`rotate(${angleRotation})`)
    drone_image.style.display = 'block'
    document.querySelector('.btn_actions').style.display = 'block'
    console.log(`placebtn x:${x},y:${y}, dir_drone: ${dir_drone}`)
})

rightBtn.addEventListener('click', ()=>{
    console.log(`rightBtn x:${x}, y:${y}`)

    angleRotation +=90
    if(angleRotation>=360){
        angleRotation = 0
    }
    drone_image.setAttribute('x', x)
    drone_image.setAttribute('y', y)
    drone_image.setAttribute('transform', `rotate(${angleRotation})`)
})

leftBtn.addEventListener('click', ()=>{
    
    
    if(angleRotation === 0){
        angleRotation = 360
    }
    angleRotation -=90
    console.log(`leftBtn x:${x}, y:${y}, angleRotation:${angleRotation}`)
    drone_image.setAttribute('x', x)
    drone_image.setAttribute('y', y)
    drone_image.setAttribute('transform', `rotate(${angleRotation})`)
})

moveBtn.addEventListener('click', ()=>{
    //angleRotation = Math.abs(angleRotation)
    console.log(` moveBtn1 x:${x}, y:${y}, angleRotation:${angleRotation}`)
    if(angleRotation === 270){
        y = y - 10
    }else if(angleRotation === 180){
        x = x - 10
    }else if(angleRotation === 360 || angleRotation === 0){
        x = x + 10
    }else if(angleRotation === 90){
        y = y + 10
    }
    console.log(`moveBtn2 x:${x} ,y:${y}`)
    
    if(x>340 && (angleRotation === 0 || angleRotation === 360)){
        x = 320
        alert("bounday limit finished")               
    }else if(y>340 && (angleRotation === 90)){
        y = 320
        alert("bounday limit finished")                
    }else if(x<0 && (angleRotation === 180)){
        x = 10
        alert("bounday limit finished")                
    }else if(y<0 && (angleRotation === 270)){
        y = 10
        alert("bounday limit finished")
    }else{
        drone_image.setAttribute('x', x)
        drone_image.setAttribute('y', y)
    }
})

reportBtn.addEventListener('click',()=>{
            
    if(angleRotation === 0 || angleRotation === 360){
        drone_direction = 'East'
    }else if(angleRotation === 180){
        drone_direction = 'West'
    }else if(angleRotation === 270){
        drone_direction = 'North'
    }else if(angleRotation === 90){
        drone_direction = 'South'
    }
    console.log(`x:${x}, y:${y}, angle: ${angleRotation}, drone_direction: ${drone_direction}`)
    let msg = `x: ${x}, y: ${y}, Direction: `+drone_direction
    alert(msg)

})

attackBtn.addEventListener('click',()=>{
    console.log(`attackBtn x:${x}, y:${y}, angle:${angleRotation}`)
    let fireImgX = 0;
    let fireImgY = 0;
    if(angleRotation === 0 || angleRotation === 360){
        fireImgX = x+100;
        fireImgY = y+10
    }else if(angleRotation === 180){
        fireImgY = y+10
        fireImgX = x-100;
    }else if(angleRotation === 90){
        fireImgX = x+10;
        fireImgY = y+100
    }else if(angleRotation === 270){
        fireImgY = y-100
        fireImgX = x+10;
    }
    console.log(`attackBtn2 fireImgX:${fireImgX}, fireImgY:${fireImgY}, angle:${angleRotation}`)
    if(fireImgX > max_X || fireImgX < min_X){
        alert('Can not fire, too close to boundary')
    }else if(fireImgY > max_Y || fireImgY < min_Y){
        alert('Can not fire, too close to boundary')
    }else{
        let fireImg = document.createElementNS('http://www.w3.org/2000/svg','image')
        fireImg.setAttribute('href', 'images/fire.png')
        fireImg.setAttribute('width', '60')
        fireImg.setAttribute('height', '60')
        fireImg.setAttribute('x',fireImgX)
        fireImg.setAttribute('y',fireImgY)
        drone_image.insertAdjacentElement('beforebegin', fireImg);
        
        setTimeout(()=>{
            
            fireImg.setAttribute('href', 'images/fire_smoke.png')
            fireImg.setAttribute('width', '60')
            fireImg.setAttribute('height', '60')
            fireImg.setAttribute('x',fireImgX)
            fireImg.setAttribute('y',fireImgY)
            fireImg.setAttribute('opacity','0.9')
            console.log("fireImg:",fireImg)
            drone_image.insertAdjacentElement('beforebegin', fireImg);
            
        },300)
    }
})
