class songManagerCLASS {
    constructor () {}

    init () {
        this.fft = new p5.FFT();
        this.visualiser = new SoundVisualiser(CW *50, RH * 50, RH * 18, RH * 1, 50);
    }

    update () {
        let spectrum = this.fft.analyze();
        strokeWeight(10);
        this.visualiser.update(spectrum)
        strokeWeight(1);

    }
    playpause () {
        if (MySong.isPlaying()) {
            MySong.pause();
        } else {
            MySong.loop();
            console.log(MySong);
        }
    }

    inputEvent () {
        console.log(this.elt.files);
        this.elt.files.forEach(file => {
            let name = file.name;
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function () {
                getAudioContext().decodeAudioData(reader.result).then(audioBuffer => bufferadd(audioBuffer));
            }
            function bufferadd (audioBuffer) {
                songs.push(audioBuffer);
                menuManager.newSong(name);
            }
        });
    }
    
    bufferchange (audioBuffer) {
        MySong.setBuffer([audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)])
        MySong.stop();
    }
}

let songManager = new songManagerCLASS();






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