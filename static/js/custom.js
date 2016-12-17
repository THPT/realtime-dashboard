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
    }, {
      label: "Current active user",
      backgroundColor: "rgba(3, 88, 106, 0.3)",
      borderColor: "rgba(3, 88, 106, 0.70)",
      pointBorderColor: "rgba(3, 88, 106, 0.70)",
      pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(151,187,205,1)",
      pointBorderWidth: 1,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  console.log(videoChart.data)
  for (var i = 0; i < data.VideoViews.length-1; i++) {
    // videoViewCounts.push(data.VideoViews[i].ViewCount);
    videoChart.data.datasets[0].data[i] = data.VideoViews[i].ViewCount;
  }
  videoChart.update();

  //Trending video
  var content = "";
  for (i = 0; i < data.TrendingVideos.length; i++) {
        content += "<tr><th>"+(i+1)+"</th><th>"+data.TrendingVideos[i].VideoId+"</th><th>"+data.TrendingVideos[i].Count+"</th></tr>";
  }
  document.getElementById("list-video").innerHTML = content;
}



document.addEventListener("unload", function() {
  if (ws) {
    ws.close();
  }
});
