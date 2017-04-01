var client = new WebTorrent();
var maglink;
httpGet("https://wt-8a5e2a05e58a7a05cf5d417a51918549-0.run.webtask.io/gifmag", function (res) {
	maglink = res.magnet_link;
});

var appData = {
	progress: undefined,
	numFiles: undefined
}

var app = new Vue({
	el: '#app',
	data: appData,
	methods: {
		loadTorrent: function () {
			console.log("Loading Torrent...");
			appData.progress = "0.00%"

			client.add(maglink, function (torrent) {
				console.log("Metadata received.");
				appData.numFiles = torrent.files.length;

				var interval = setInterval(function () {
					console.log('Progress: ' + (torrent.progress * 100).toFixed(2) + '%');
					appData.progress = (torrent.progress * 100).toFixed(2) + '%';

					if (torrent.progress == 1) {
						console.log("Loaded");
						clearInterval(interval);
					}
				}, 3000);

				var status = torrent.files.length + " files in torrent:"
				torrent.files.forEach(function (file) {
					status += "\n- " + file.name;
					file.appendTo('files');
				});
				console.log(status);
			});
		}
	}
});

function httpGet(url, cb) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			cb(JSON.parse(xmlHttp.responseText));
	}
	xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.send(null);
}