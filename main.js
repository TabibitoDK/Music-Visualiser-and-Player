/// <reference path="p5js/TSDef/p5.global-mode.d.ts" />


function preload () {
    Myimage = loadImage("source/spot.png");
    MySong = loadSound("source/English technological speaking.mp3");
}

function setup () {
    canvas = createCanvas(windowWidth, windowHeight);
    imageManager.init();
    songManager.init();
    youtubeManager.init();
    volumeManager.init();
    timelineManager.init();
    menuManager.init();
    settingManager.init();
}

function draw () {
    background(255);
    imageManager.update();
    songManager.update();
    timelineManager.update();
    settingManager.update();
    
}

function windowResized() {
    CW = windowWidth /100;
    RH = windowHeight /100;
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked (e) {
    console.log(e);
    // Check if drag event occur or not
    if (e.target.id == "defaultCanvas0") {
        menuManager.mouseClicked(e);
    }
    // Close menu
    else if (e.target.id == "menuBackground") {
        menuManager.menuBackground.div.style("display", "none");
    }
    // Close setting
    else if (e.target.id == "settingBackground") {
        settingManager.settingBackground.div.style("display", "none");
    }
    // Change song
    else if (e.target.getAttribute('data-songnum') !== null) {
        console.log(e.target.getAttribute('data-songnum'));
        songManager.bufferchange(songs[parseInt(e.target.getAttribute('data-songnum'))]);
    }
    moves.reset();
}

function touchMoved (e) {
    menuManager.touchMoved(e);
    console.log(e);
    e.preventDefault();
}

function mouseReleased (e) {
    volumeManager.mouseReleased(e);
    timelineManager.mouseReleased(e);
}
