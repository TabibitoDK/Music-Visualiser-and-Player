class youtubeManagerCLASS {
    constructor() {}
    init () {
        // Request for a short life access token to dropbox using the refresh token
        // save the short life token in local storage for use to fetch songs or playlists
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.token = null;
        let refreshTOKEN = '_QElCR3LuJ0AAAAAAAAAAdhIzNZ7Xpgayo9qHKp_uv77kjIen4haUWzcGqsF_8hZ';
        let Requesturl = 'https://api.dropbox.com/oauth2/token'
        var headers = {
            Authorization: "Basic dm10ZDBhbWJ0cjc2emYwOmJwYTMweGx3eG5uc3V1aw==",
            "Content-Type": "application/x-www-form-urlencoded" 
        }
        var data = {
            "refresh_token": refreshTOKEN,
            "grant_type": 'refresh_token',
            // "redirect_uri": window.location.href,
            "client_id": `vmtd0ambtr76zf0`,
            "client_secret": `bpa30xlwxnnsuuk`,

        }
        var fetchConfig = {
            method: "POST",
            headers: headers, 
            body: `grant_type=refresh_token&refresh_token=${refreshTOKEN}`,          
        }
        fetch(Requesturl, fetchConfig).then(res => res.json()).then(json => localStorage.setItem("short_token", json.access_token));
    }
    loadMetadata () {
        // Load playlist data / songs metadata, song audio data not downloaded yet
        var Requesturl = 'https://api.dropboxapi.com/2/files/list_folder';
        var url = '/My music';
        const TOKEN = localStorage.getItem("short_token");
        var headers = {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": `application/json`,
        }
        var data = {
            "path": url,
        };
        var fetchConfig = {
            method: "POST",
            headers: headers, 
            body: JSON.stringify(data),
        }
        fetch(Requesturl, fetchConfig).then(data => data.json()).then(json => songadd(json));
        function songadd(json) {
            json.entries.forEach(songmeta => {
                if (songmeta['.tag'] == 'file') {
                    let bufferobj = {
                        withData: false,
                        data: songmeta,
                    }
                    songs.push(bufferobj);
                    menuManager.newSong(songmeta.name);
                }
            });
        }
    }
    loadSong (bufferobj) {
        // Generate a download link for the specific song
        var Requesturl = 'https://api.dropboxapi.com/2/files/get_temporary_link';
        const TOKEN = localStorage.getItem("short_token");
        var SongURL = bufferobj.data.path_display;
        var headers = {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": `application/json`,
        }
        var data = {
            'path': SongURL,
        };
        var fetchConfig = {
            method: "POST",
            headers: headers, 
            body: JSON.stringify(data),
        }
	    // fetch(Requesturl, fetchConfig).then(data => data.text()).then(text => console.log(text));
        fetch(Requesturl, fetchConfig).then(data => data.json()).then(json => songadd(json));
        function songadd (json) 
        {
            bufferobj.data = json;
            songManager.bufferchange(bufferobj);
        }
    }
    downloadSong (bufferobj) {
        // Download the song
        if (bufferobj.data.link == undefined) {
            this.loadSong(bufferobj);
        }
        else {
            var audioContext = youtubeManager.audioContext;
            fetch(bufferobj.data.link).then(data => data.arrayBuffer()).then(buffer => audioContext.decodeAudioData(buffer)).then(audioBuffer => bufferadd(audioBuffer));
            function bufferadd (audioBuffer) {
                bufferobj.data = audioBuffer;
                bufferobj.withData = true;
                songManager.bufferchange(bufferobj);
                console.log("downloaded and changed");
            }
        }
    }
}

let youtubeManager = new youtubeManagerCLASS();

// A function similar to the original escape function in js that has been depricated
// This function is simple and has OK performance compared to more
// complicated ones: http://jsperf.com/json-escape-unicode/4
function http_header_safe_url(v) {
	var charsToEncode = /[\u007f-\uffff]/g;
	return v.replace(charsToEncode,
	function(c) {
		return '\\u'+('000'+c.charCodeAt(0).toString(16)).slice(-4);
	}
	);
}