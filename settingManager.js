class settingManagerCLASS {
    constructor() {

    }
    init () {
        // Disable the timeline control and volume control that currently have problems in android web viewing
        volumeManager.volumeControl.setAttribute("display", "none");
        timelineManager.timelineControl.setAttribute("display", "none");

        // Create elements for the setting panel
        this.settingBackground = new Div(0, 0, 100, 100, "#ffffff", "settingBackground");
        this.settingBackground.div.style("display", "none");
        this.settingPanel = new Div(10, 10, 90, 90, "#000000", "settingPanel", this.settingBackground.div);
        this.settingPanel.div.style("border-radius", "25px")
        this.setting = new Div(2, 1, 78, 79, "#ffffff", "setting", this.settingPanel.div);
        this.setting.div.style("border-radius", "50px")
        this.setting.div.elt.innerHTML = `
        <h1 style="margin-left: 5vw">Settings</h1>
        <div style="margin-left: 5vw">
            <h2>Volume</h2>
            <input id="volInput" type="range" min="0" max="100" step="1">
            <h2>Timeline</h2>
            <input id="timelineInput" type="range" min="0" max="100" step="1">
        </div>
        `;
        // Enable slider input to set voue and timeline of song
        var volInput = document.getElementById("volInput");
        volInput.onchange = function() {
            MySong.setVolume(this.value/100);
        }
        var timelineInput = document.getElementById("timelineInput");
        timelineInput.onchange = function() {
            MySong.jump((this.value/100) * MySong.duration());
        }
        // Update the timeline slider to the current music play timestamp
        setInterval(() => {
            timelineInput.value = (MySong.currentTime() / MySong.duration()) * 100;
        }, 1000);
    }
    update () {

    }
}

let settingManager = new settingManagerCLASS();