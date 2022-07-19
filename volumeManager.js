class volumeManagerCLASS {
    constructor() {
        this.volumeControl = document.getElementById("volumeControl");
        this.volumeSlider = document.getElementById("volumeSlider");
        this.volumeMaxLine = document.getElementById("volumeMaxLine");
    }

    init() {
        let volumeControl = this.volumeControl;
        let volumeSlider = this.volumeSlider;
        let volumeMaxLine = this.volumeMaxLine;

        volumeControl.setAttribute('cx', `${CW * 0}px`);
        volumeControl.setAttribute('cy', `${RH * 100}px`);
        volumeSlider.setAttribute('cx', `${CW * 0}px`);
        volumeSlider.setAttribute('cy', `${RH * 100}px`);
        volumeMaxLine.setAttribute('cx', `${CW * 0}px`);
        volumeMaxLine.setAttribute('cy', `${RH * 100}px`);

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
            console.log(e.pressure)
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
    
    }
    mouseReleased (e) {
        this.volumeControl.setAttribute("fill-opacity", "0.0");
        this.volumeSlider.setAttribute("fill-opacity", "0.0");
        this.volumeMaxLine.setAttribute("stroke-opacity", "0.0");
        this.volumeMaxLine.setAttribute("pointer-events", "none");
    }
}

let volumeManager = new volumeManagerCLASS();


