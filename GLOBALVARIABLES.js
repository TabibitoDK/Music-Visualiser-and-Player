new p5();


let elements = [];
let songs = [];
let Myimage;
let MySong;
let time;
let CW = windowWidth /100;
let RH = windowHeight /100;
let timelineVal = 0;
let canvas;

// let moves = {
//     left: {value: 0},
//     right: {value: 0},
//     up: {value: 0},
//     down: {value: 0},
// };

class movesCLASS {
    constructor() {
        this.reset();
    }
    reset() {
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
        this.ismoving = false;
    }
}
let moves = new movesCLASS();