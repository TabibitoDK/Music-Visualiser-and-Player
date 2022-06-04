/// <reference path="p5js/TSDef/p5.global-mode.d.ts" />


function preload () {
    Myimage = loadImage("source/spot.png");
    MySong = loadSound("source/English technological speaking.mp3");
}

function setup () {
    canvas = createCanvas(windowWidth, windowHeight);
    imageManager.init();
    songManager.init();
    volumeManager.init();
    timelineManager.init();
    menuManager.init();

}

function draw () {
    background(255);
    imageManager.update();
    songManager.update();
    timelineManager.update();
    
}

function windowResized() {
    CW = windowWidth /100;
    RH = windowHeight /100;
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked (e) {
    console.log(e);
    if (e.target.id == "defaultCanvas0") {
        menuManager.mouseClicked(e);
    }
    else if (e.target.id == "menuBackground") {
        menuManager.menuBackground.div.style("display", "none");
    }
    else if (e.target.getAttribute('data-songnum') !== null) {
        console.log(e.target.getAttribute('data-songnum'));
        songManager.bufferchange(songs[parseInt(e.target.getAttribute('data-songnum'))]);
    }
    moves.reset();
}

function touchMoved (e) {
    menuManager.touchMoved(e);
}

function mouseReleased (e) {
    volumeManager.mouseReleased(e);
    timelineManager.mouseReleased(e);
}
