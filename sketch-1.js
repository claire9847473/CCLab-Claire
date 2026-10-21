function setup() {
  createCanvas(800, 500);
}

function draw() {
  if(keyIsDown(' ')){
    background(220)
  }else{
    background(10,35,60);
  }
  
  let c1 = sin(frameCount*0.01);
  let c2 = 100*noise(frameCount*0.02);
  let c3 = 100*noise(frameCount*0.02);
  

  drawCreature(width/2+c1+10, height/2+c1+10, 35+c2, 30+c2, 3,255,125,210,0,60,100,0.1,10);
  drawCreature(width/2+c1+10, height/2+c1-10, 35+c3, 30+c3, 4,255,117,25,50,10,100,0.07,10);
  drawCreature(width/2+c1-10, height/2+c1-10, 35+c2, 30+c2, 5,255,210,0,0,40,0,0.09,10);
  drawCreature(width/2+c1-10, height/2+c1+10, 35+c3, 30+c3, 3,255,140,140,30,5,30,0.08,10);

    drawCreature(width/2+c1-10, height/2+c1+10,35+c3,30+c3, 3,255,155,100,0,60,100,0.1,10);
  drawCreature(width/2+c1-10, height/2+c1-10, 35+c2, 30+c2, 4,255,60,105,50,10,100,0.07,10);
  drawCreature(width/2+c1+10, height/2+c1-10, 35+c2, 30+c2, 5,255,180,60,0,40,0,0.09,10);
  drawCreature(width/2+c1+10, height/2+c1+10, 35+c3, 30+c3, 3,255,70,30,30,5,30,0.08,10);

  if(mouseIsPressed){
    drawEyes(mouseX,mouseY,10+c2*0.8,c2*0.25);
  }
}

function drawCreature(x, y, radius1, radius2, cornerNum,r1,g1,b1,r2,g2,b2,freq,amp) {
  // rgb1 for centre,rgb2 for corners
  push();  
  let D = dist(mouseX, mouseY, x, y);
  
  if(mouseIsPressed){
    translate(mouseX,mouseY);
    D = 0;
  }else{
    translate(x, y);
  }
  rotate(radians(frameCount * 0.2));
  noStroke();

  let rValue = map(D, 0, 500, r1, r2);
  let gValue = map(D, 0, 500, g1, g2);
  let bValue = map(D, 0, 500, b1, b2);
  let tValue = map(D, 0, 500, 70, 30);
  fill(rValue, gValue, bValue,tValue);

  if(keyIsDown(' ')){
    blendMode(DARKEST);
  }else{
    blendMode(ADD);
  }
  
  beginShape();
  for (let a = 0; a <= TWO_PI; a += TWO_PI / cornerNum) {
    // using sin&cos(a) to draw and sin(frameCount) to make it move
    let x1 = cos(a) * radius1 + sin(frameCount * freq) * amp;
    let y1 = sin(a) * radius1 + cos(frameCount * freq) * amp;
    splineVertex(x1, y1);
    let x2 = cos(a + PI / cornerNum) * radius2 + cos(frameCount * freq) * amp;
    let y2 = sin(a + PI / cornerNum) * radius2 + sin(frameCount * freq) * amp;
    splineVertex(x2, y2);
  }
  endShape(CLOSE);

  pop();
}

function drawEyes(posX,posY,eyedist,eyesize) {
  push();
  noStroke();
  fill(0,150);
  ellipse(posX+eyedist/2,posY,eyesize,eyesize*1.5);
  ellipse(posX-eyedist/2,posY,eyesize,eyesize*1.5);
  blendMode(BLEND);
  pop()
}

function keyPressed() {
  if(key == 's'){
    saveCanvas("landscape", "png"); 
  }
}