class MenuManagerCLASS {
    constructor () {};

    init () {
        // Create element for the menu
        this.menuBackground = new Div(0, 0, 100, 100, "#ffffff", "menuBackground");
        this.menuPanel = new Div(10, 10, 90, 90, "#000000", "menuPanel", this.menuBackground.div);
        this.menuPanel.div.style("border-radius", "25px")
        this.menu = new Div(2, 1, 78, 79, "#ffffff", "menu", this.menuPanel.div);
        this.menu.div.style("border-radius", "50px")
        this.loadFile = new Div(5, 2, 34, 6, "#ffffff", "loadfile", this.menu.div);
        this.loadFile.div.style("border-radius", "15px");
        this.loadFile.div.style("border", "2px solid black");
        this.loadFile.div.elt.innerHTML = `<p style="position: absolute; left: ${CW*5.5}px; top:${RH*-2.5}px ; font-size: ${RH * 3}px" >load file</p>`;
        this.loadFileInput = new Input(0,0,29,4,"#000000", "loadFileInput", "loadfile");
        this.loadWeb = new Div(40, 2, 69, 6, "#ffffff", "loadWeb", this.menu.div);
        this.loadWeb.div.style("border-radius", "15px");
        this.loadWeb.div.style("border", "2px solid black");
        this.loadWeb.div.elt.innerHTML = `<p style="position: absolute; left: ${CW*4.5}px; top:${RH*-2.5}px ; font-size: ${RH * 3}px" >load web</p>`;
        this.loadWebInput = new Div(0,0,29,4,"#ffffff00", "loadWebInput", "loadWeb");
        this.loadWebInput.div.mouseClicked(youtubeManager.loadMetadata);
        this.inputWeb = createInput("web address");
        this.inputWeb.parent(this.menu.div);
        this.inputWeb.position(CW * 5, RH * 8);
        this.inputWeb.style("width", `${CW *63}px`);
        this.inputWeb.style("height", `${RH *4}px`);
        this.inputWeb.style("border-radius", "25px");
        this.inputWeb.style("font-size", "25px");
        this.inputWeb.elt.setAttribute("type", "url");
        this.bline = new Div(0, 15.8, 78, 16, "#000000", "bline", this.menu.div);
        this.playlist = [];
        this.songcounter = 0;
        this.currentPlaylist = new Div(0, 16.5, 76, 74, "#00ff00", "playlist01", this.menu.div);
        this.currentPlaylist.div.style('overflow-y', 'scroll')
    }

    update () {

    }

    newSong (name) {
        // Create a new song element div and place it in the menu
        let songDiv = new Div(2, 1 +(5*this.songcounter), 70, 5 +(5*this.songcounter), "#000000", `song${this.songcounter}`, this.currentPlaylist.div);
        songDiv.div.style("border-radius", "35px");
        songDiv.div.elt.innerHTML = `<p style="pointer-events:none; color: white; position: absolute; left: ${CW*3}px;" >Playlist 01</p> <div style="background-color: white; position: absolute; left: ${CW * 64}px; top: ${RH * 1.2}px ; border-radius: 25px;" >'  --  '</div>`;
        songDiv.div.elt.setAttribute('data-songnum', `${this.songcounter}`);
        songDiv.div.elt.setAttribute('data-issong', `true`);
        songDiv.div.elt.children[0].innerHTML = name;
        this.playlist.push(this.songDiv);
        this.songcounter++;
    }

    touchMoved (e) {
        // get the movement direction and moved distance form touch events
        if (e.movementX < 0) moves.left += Math.abs(e.movementX);
        if (e.movementX > 0) moves.right += Math.abs(e.movementX);
        if (e.movementY < 0) moves.up += Math.abs(e.movementY);
        if (e.movementY > 0) moves.down += Math.abs(e.movementY);
    }
    mouseClicked (e) {
        // get the max moved direction
        let direction = Math.max(moves.left, moves.right, moves.up, moves.down);
        // Determine wheather it is a drag or click
        // A click if move < 100
        if (direction < 100) {
            songManager.playpause();
            return;
        }
        // Swap left Display menu
        if (moves.left > 100) {
            this.menuBackground.div.style("display", "block");
        }
        // Swap right display settings
        if (moves.right > 100) {
            settingManager.settingBackground.div.style("display", "block");
        }
    }
}

let menuManager = new MenuManagerCLASS();

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

class Input {
    constructor(startx, starty, endx, endy, color, id, parent) {
        this.parent = parent;
        this.id = id;
        this.sx = startx;
        this.sy = starty;
        this.ex = endx;
        this.ey = endy;
        this.color = color;
        this.input = createInput("input", "file");
        this.input.id(this.id);
        this.input.position(CW * this.sx, RH * this.sy);
        this.input.style('width', `${CW * (this.ex-this.sx)}px`);
        this.input.style('height', `${RH * (this.ey-this.sy)}px`);
        this.input.style('background-color', `${this.color}`);
        this.input.style('opacity', "0.0");
        this.input.elt.setAttribute("accept", ".mp3");
        this.input.elt.setAttribute("multiple", "true");
        this.input.input(songManager.inputEvent);
        if (parent !== undefined) {
            this.input.parent(this.parent);
        }
        elements.push(this);
    }
    refresh () {
        this.input.position(CW * this.sx, RH * this.sy);
        this.input.style('width', `${CW * (this.ex-this.sx)}px`);
        this.input.style('height', `${RH * (this.ey-this.sy)}px`);
        this.input.style('background-color', `${this.color}`);
    }
}

