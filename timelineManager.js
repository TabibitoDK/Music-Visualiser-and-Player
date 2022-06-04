class timelineManagerCLASS {
    constructor () {
        this.timelineControl = document.getElementById("TimelineControl");
        this.timelineBaseBar = document.getElementById("timelineBaseBar");
        this.timelineBar = document.getElementById("timelineBar");
        this.timelineSlider = document.getElementById("timelineSlider");
    }

    init () {
        let timelineControl = this.timelineControl;
        let timelineBaseBar = this.timelineBaseBar;
        let timelineBar = this.timelineBar;
        let timelineSlider = this.timelineSlider;

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

    
    update () {
        let dist = ((MySong.currentTime()/ MySong.duration()) * (RH * (95-17))) + (RH*17);
        this.timelineBar.setAttribute('y2', `${dist}px`);
    }

    mouseReleased (e) {
        this.timelineControl.setAttribute("fill-opacity", "0.0");
        this.timelineBaseBar.setAttribute("stroke-opacity", "0.0");
        this.timelineBar.setAttribute("stroke-opacity", "0.0");
        this.timelineSlider.setAttribute("stroke-opacity", "0.0");
        this.timelineSlider.setAttribute("pointer-events", "none");

        if (e.target !== this.timelineSlider) return;
        MySong.jump(timelineVal);
        if (MySong.isPlaying() == true) return;
        MySong.pauseTime = timelineVal;
        MySong.startTime = timelineVal;
    }
}

let timelineManager = new timelineManagerCLASS();
