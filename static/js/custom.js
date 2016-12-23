var ws = new WebSocket("ws://localhost:8080/ws");
var videoCanvas = document.getElementById("video-chart");
var videoChart = new Chart(videoCanvas, {
  type: 'line',
  data: {
    labels: ["20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
    datasets: [{
      label: "Video view",
      backgroundColor: "rgba(38, 185, 154, 0.31)",
      borderColor: "rgba(38, 185, 154, 0.7)",
      pointBorderColor: "rgba(38, 185, 154, 0.7)",
      pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointBorderWidth: 1,
      data: [0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0],
      fill: false
    }]
  },
  options: {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Count'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Minutes ago'
        }
      }],
    }
  }
});

var userCanvas = document.getElementById("user-chart");
var userChart = new Chart(userCanvas, {
  type: 'doughnut',
  animation:{
        animateScale:true
  },
  data: {
    labels: ["Female", "Male"],
    datasets: [{
      label: "Gender",
      data: [300, 50],
        backgroundColor: [
            "#FF6384",
            "#36A2EB"
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB"
        ]
    }]
  }
});

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 16.0527412, lng: 106.2337417}
    });
    window.heatmap = new google.maps.visualization.HeatmapLayer({
      radius: 25
    });
}


ws.onopen = function() {
  console.log("Ahrrr, I'm connected")
}

ws.onmessage = function(event) {
  console.log(event);
  var data = JSON.parse(event.data);
  console.log(data);
  document.getElementById("js-active-user").innerHTML = data.UserView.Current;
  document.getElementById("js-video-view").innerHTML = data.VideoViews[19].ViewCount;
  var videoViewCounts = [];
  for (var i = 0; i < data.VideoViews.length-1; i++) {
    // videoViewCounts.push(data.VideoViews[i].ViewCount);
    videoChart.data.datasets[0].data[i] = data.VideoViews[i].ViewCount;
  }
  videoChart.update();



  //Trending video
  var content = "";
  for (i = 0; i < data.TrendingVideos.length; i++) {
    content += "<tr><th>"+(i+1)+"</th><th>"+
    data.TrendingVideos[i].VideoId+"</th><th>"+
    data.TrendingVideos[i].VideoName+"</th><th>"+
    data.TrendingVideos[i].Category+"</th><th>"+
    data.TrendingVideos[i].Count+"</th></tr>";
  }
  document.getElementById("list-video").innerHTML = content;

  reloadHeatmap(data.LocationCount)
}

function reloadHeatmap(locations) {
  var data = []
  for (var i = 0; i < cities.length; i++) {
    for (var k in locations) {
      if (k == cities[i].name) {
        data.push(new google.maps.LatLng(cities[i].latitude, cities[i].longitude))
      }
    }
  }

  window.heatmap.setMap(null);

  window.heatmap = new google.maps.visualization.HeatmapLayer({
      data: data,
      radius: 25
  });
  window.heatmap.setMap(map);
}



document.addEventListener("unload", function() {
  if (ws) {
    ws.close();
  }
});
