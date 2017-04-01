var client = new WebTorrent();
var maglink = httpGet("https://wt-8a5e2a05e58a7a05cf5d417a51918549-0.run.webtask.io/gifmag").magnet_link;

var app = new Vue({
	el: '#app',
	methods: {
		loadTorrent: function () {
			console.log("Loading Torrent", maglink);
			console.log("Client", client);
			client.add(maglink, function (torrent) {
				console.log("Metadata received.");

				var interval = setInterval(function () {
					console.log('Progress: ' + (torrent.progress * 100).toFixed(2) + '%');
					if (torrent.progress == 1) {
						console.log("Loaded");
						clearInterval(interval);
					}
				}, 3000);

				console.log(torrent.files.length + " files in torrent");
				torrent.files.forEach(function (file) {
					console.log("File", file.name);
					file.appendTo('files');
				});
			});
		}
	}
});

function httpGet(url) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return JSON.parse(xmlHttp.responseText);
}
