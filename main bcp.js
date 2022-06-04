/// <reference path="p5js/TSDef/p5.global-mode.d.ts" />


new p5();
let elements = [];
let songs = [];
let imageRenderer;
let Myimage, MySong;
let time = 0;
let volumeVal = 0;
let timelineVal = 0;
let CW = windowWidth /100;
let RH = windowHeight /100;

// UI elements //
let volumeControl = document.getElementById("volumeControl");
let volumeSlider = document.getElementById("volumeSlider");
let volumeMaxLine = document.getElementById("volumeMaxLine");
let timelineControl = document.getElementById("TimelineControl");
let timelineBaseBar = document.getElementById("timelineBaseBar");
let timelineBar = document.getElementById("timelineBar");
let timelineSlider = document.getElementById("timelineSlider");

class Div {
    constructor(startx, starty, endx, endy, color, id, parent) {
        this.parent = parent;
        this.id = id;
        this.sx = startx;
        this.sy = starty;
        this.ex = endx;
        this.ey = endy;
        this.color = color;
        this.div = createDiv();
        this.div.id(this.id);
        this.div.position(CW * this.sx, RH * this.sy);
        this.div.style('width', `${CW * (this.ex-this.sx)}px`);
        this.div.style('height', `${RH * (this.ey-this.sy)}px`);
        this.div.style('background-color', `${this.color}`);
        if (parent !== undefined) {
            this.div.parent(this.parent);
        }
        elements.push(this);
    }
    refresh () {
        this.div.position(CW * this.sx, RH * this.sy);
        this.div.style('width', `${CW * (this.ex-this.sx)}px`);
        this.div.style('height', `${RH * (this.ey-this.sy)}px`);
        this.div.style('background-color', `${this.color}`);
    }
}

class SoundVisualiser {
    constructor(originx, originy, diameter,length, numberOfNodes) {
        this.originx = originx;
        this.originy = originy;
        this.diameter = diameter;
        this.length = length;
        this.numberOfNodes = numberOfNodes;
        this.angle = 2*PI / numberOfNodes;
    }
    update(dataArray) {
        // let sumData = 1;
        // for (let i=0 ; i<this.numberOfNodes ; i++) {
        //     sumData = sumData + dataArray[i];
        // }
        for (let i=0 ; i<this.numberOfNodes ; i++) {
            let data = dataArray[i] * dataArray[i] / 4000;
            // let data = dataArray[i] / sumData * 500;
            Rotatedline(this.originx, this.originy, this.diameter, data+2, this.angle*i);
        }
    }
}

function Rotatedline (cx, cy, distancePoint, distance, angle) {
    let x = 0;
    let y = distancePoint;
    let stx = x * cos(angle) - y * sin(angle);
    let sty = x * sin(angle) + y * cos(angle);
    y = distance;
    let edx = x * cos(angle) - y * sin(angle);
    let edy = x * sin(angle) + y * cos(angle);
    line(cx+stx-edx, cy+sty-edy, cx+stx+edx, cy+sty+edy);
}

function preload () {
    Myimage = loadImage("source/人生は最高の暇つぶし／HoneyWorks feat.Hanon bg.jpg");
    MySong = loadSound("source/人生は最高の暇つぶし／HoneyWorks feat.Hanon.mp3");
}

function setup () {
    createCanvas(windowWidth, windowHeight);
    imageRenderer = createGraphics(Myimage.width, Myimage.height);
    imageRenderer.ellipse((Myimage.width/100) * 50, (Myimage.height/100) * 50, (Myimage.width/100) * 55, (Myimage.width/100) * 55);
    Myimage.mask(imageRenderer);
    fft = new p5.FFT();
    visualiser = new SoundVisualiser(CW *50, RH * 50, RH * 18, RH * 1, 50);

    // add event listener for volume and controls //
    volumeEvents();

    // menu elements // 
    menuPanel = new Div(10, 10, 90, 90, "#000000", "menuPanel");
    menuPanel.div.style("border-radius", "25px")
    menu = new Div(2, 1, 78, 79, "#ffffff", "menuPanel", menuPanel.div);
    menu.div.style("border-radius", "50px")
    loadFile = new Div(5, 2, 34, 6, "#ffffff", "loadfile", menu.div);
    loadFile.div.style("border-radius", "15px");
    loadFile.div.style("border", "2px solid black");
    loadFile.div.elt.innerHTML = `<p style="position: absolute; left: ${CW*5.5}px; top:${RH*-2.5}px ; font-size: ${RH * 3}px" >load file</p>`;
    loadWeb = new Div(40, 2, 69, 6, "#ffffff", "loadWeb", menu.div);
    loadWeb.div.style("border-radius", "15px");
    loadWeb.div.style("border", "2px solid black");
    loadWeb.div.elt.innerHTML = `<p style="position: absolute; left: ${CW*4.5}px; top:${RH*-2.5}px ; font-size: ${RH * 3}px" >load web</p>`;
    inputWeb = createInput("web address");
    inputWeb.parent(menu.div);
    inputWeb.position(CW * 5, RH * 8);
    inputWeb.style("width", `${CW *63}px`);
    inputWeb.style("height", `${RH *4}px`);
    inputWeb.style("border-radius", "25px");
    inputWeb.style("font-size", "25px");
    inputWeb.elt.setAttribute("type", "url");
    bline = new Div(0, 15.8, 78, 16, "#000000", "bline", menu.div);
    playlist01 = new Div(2, 18, 74, 22, "#000000", "playlist01", menu.div);
    playlist01.div.style("border-radius", "35px");
    playlist01.div.elt.innerHTML = `<p style="color: white; position: absolute; left: ${CW*3}px;" >Playlist 01</p> <div style="background-color: white; position: absolute; left: ${CW * 66}px; top: ${RH * 1.2}px ; border-radius: 25px;" >'  --  '</div>`;

}

function draw () {
    background(255);
    stroke(0);
    imageRenderer.background(0, 0, 0, 0);
    imageRenderer.fill(0, 0, 0, 255);

    // draw image //
    image(Myimage, CW * 50 - 250, RH * 50 - 140, 500, 280);

    time = time + deltaTime;

    // run visualiser //
    let spectrum = fft.analyze();
    strokeWeight(10);
    visualiser.update(spectrum)
    strokeWeight(1);

}

function windowResized() {
    CW = windowWidth /100;
    RH = windowHeight /100;
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked (e) {
    if (e.target.id == "defaultCanvas0") {
        if (MySong.isPlaying()) {
            MySong.pause();
          } else {
            MySong.loop();
            console.log(MySong);
          }
    }
}

function mouseReleased (e) {
    volumeControl.setAttribute("fill-opacity", "0.0");
    volumeSlider.setAttribute("fill-opacity", "0.0");
    volumeMaxLine.setAttribute("stroke-opacity", "0.0");
    volumeMaxLine.setAttribute("pointer-events", "none");

    timelineControl.setAttribute("fill-opacity", "0.0");
    timelineBaseBar.setAttribute("stroke-opacity", "0.0");
    timelineBar.setAttribute("stroke-opacity", "0.0");
    timelineSlider.setAttribute("stroke-opacity", "0.0");
    timelineSlider.setAttribute("pointer-events", "none");

    if (e.target !== timelineSlider) return;
    MySong.jump(timelineVal);
    if (MySong.isPlaying() == true) return;
    MySong.pauseTime = timelineVal;
    MySong.startTime = timelineVal;

}

function volumeEvents () {
    volumeControl.setAttribute('cx', `${CW * 0}px`);
    volumeControl.setAttribute('cy', `${RH * 100}px`);
    volumeSlider.setAttribute('cx', `${CW * 0}px`);
    volumeSlider.setAttribute('cy', `${RH * 100}px`);
    volumeMaxLine.setAttribute('cx', `${CW * 0}px`);
    volumeMaxLine.setAttribute('cy', `${RH * 100}px`);
    timelineControl.setAttribute('cx', `${CW * 100}px`);
    timelineControl.setAttribute('cy', `${RH * 0}px`);
    timelineBaseBar.setAttribute('x1', `${CW * 97}px`);
    timelineBaseBar.setAttribute('y1', `${RH * 17}px`);
    timelineBaseBar.setAttribute('x2', `${CW * 97}px`);
    timelineBaseBar.setAttribute('y2', `${RH * 95}px`);
    timelineBar.setAttribute('x1', `${CW * 97}px`);
    timelineBar.setAttribute('y1', `${RH * 17}px`);
    timelineBar.setAttribute('x2', `${CW * 97}px`);
    timelineBar.setAttribute('y2', `${RH * 95}px`);
    timelineSlider.setAttribute('x1', `${CW * 97}px`);
    timelineSlider.setAttribute('y1', `${RH * 0}px`);
    timelineSlider.setAttribute('x2', `${CW * 97}px`);
    timelineSlider.setAttribute('y2', `${RH * 100}px`);
    timelineSlider.setAttribute('stroke-width', `${CW * 200}px`);
    
    volumeControl.onpointermove = function (e) {
        volumeControl.setAttribute("fill-opacity", "1.0");
        volumeSlider.setAttribute("fill-opacity", "0.5");
        volumeMaxLine.setAttribute("stroke-opacity", "1.0");
        volumeMaxLine.setAttribute("pointer-events", "visible");
    }
    volumeControl.onpointerdown = function (e) {
        volumeControl.setAttribute("fill-opacity", "1.0");
        volumeSlider.setAttribute("fill-opacity", "0.5");
        volumeMaxLine.setAttribute("stroke-opacity", "1.0");
        volumeMaxLine.setAttribute("pointer-events", "visible");
    }
    volumeControl.onpointerout = function (e) {
        if (e.buttons ==1) return;
        volumeControl.setAttribute("fill-opacity", "0.0");
        volumeSlider.setAttribute("fill-opacity", "0.0");
        volumeMaxLine.setAttribute("stroke-opacity", "0.0");
        volumeMaxLine.setAttribute("pointer-events", "none");
    }

    volumeMaxLine.onpointermove = function (e) {
        let dist = sqrt(e.clientX*e.clientX + (windowHeight-e.clientY)*(windowHeight-e.clientY));
        if (e.buttons !== 1) return;
        volumeSlider.setAttribute('r', `${dist}`);
        MySong.setVolume((dist-100)/200);
        console.log(dist);
    }

    timelineControl.onpointermove = function (e) {
        timelineControl.setAttribute("fill-opacity", "1.0");
        timelineBaseBar.setAttribute("stroke-opacity", "1.0");
        timelineBar.setAttribute("stroke-opacity", "1.0");
        timelineSlider.setAttribute("stroke-opacity", "0.0");
        timelineSlider.setAttribute("pointer-events", "visible");

    }

    timelineControl.onpointerleave = function (e) {
        if (e.buttons ==1) return;
        timelineControl.setAttribute("fill-opacity", "0.0");
        timelineBaseBar.setAttribute("stroke-opacity", "0.0");
        timelineBar.setAttribute("stroke-opacity", "0.0");
        timelineSlider.setAttribute("stroke-opacity", "0.0");
        timelineSlider.setAttribute("pointer-events", "none");
    }

    timelineSlider.onpointermove = function (e) {
        let dist = e.clientY;
        if (e.buttons !== 1) return;
        if (dist > RH * 95 || dist < RH * 17) return;
        timelineVal = ((dist-RH*17) / (RH * (95-17))) * MySong.duration();
        if (timelineVal < 0 || timelineVal >= MySong.duration()) return;
        timelineBar.setAttribute('y2', `${dist}`);
        // MySong.setVolume((dist-100)/200);
        console.log(dist);
    }
}
