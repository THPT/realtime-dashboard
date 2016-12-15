<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>THPT Team</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="static/css/custom.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">GIY Realtime Dashboard</a>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-8" id="div-active-user">
          <div class="col-md-12">
            <h4>
              <b>Right now</b>
            </h4>
            <br>
            <h1 id="current-visitor" style="margin-top: -10px">0</h1>
          </div>
        </div>
      </div>
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4" id="div-active-user">
          <div class="col-md-12"><h5><b>Views</b></h5><h2 style="margin-top: -10px">14.7K</h2></div>
          <div class="col-md-12"><h5><b>Watch Time</b></h5><h2 style="margin-top: -10px">03:24</h2></div>
          <div class="col-md-12"><h5><b>Video Shares</b></h5><h2 style="margin-top: -10px">1.6K</h2></div>
          <div class="col-md-12"><h5><b>Current Active Users</b></h5><h2 style="margin-top: -10px">8</h2></div>
        </div>
        <div class="col-md-8" id="div-video-view">
          <h3>Video view per minute</h3>
          <canvas id="video-chart"></canvas>
        </div>
      </div>
      <!-- trending videos: top videos watched in the last 6 hours, (total views, overall watch time, total video shares) -->
      <div class="row">
        <div class="col-md-12" id="div-trending-1">
          <h3>Trending</h3>
          <div class="row">
            <div class="col-md-4">
              <h5>Views</h5>
              <canvas id="trending-view-chart"></canvas>
            </div>
            <div class="col-md-4">
              <h5>Average watch time</h5>
              <canvas id="trending-watchtime-chart"></canvas>                
            </div>
            <div class="col-md-4">
              <h5>Video shares</h5>
              <canvas id="trending-share-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="div-trending-2">
        <h3>Top Videos Watched in last 6 hours</h3>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Video Id</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody id="list-video">
              <!-- <tr>
                <th>1</th>
                <th>28c904fc4a23523ea91cfc2bad6453a6e8eca5551b936c8929cbabe0480c9b11</th>
                <th>231</th>
              </tr> -->
            </tbody>
          </table>
      </div>
    </div> <!-- /container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script type="text/javascript" src="static/js/chart.bundle.min.js"></script>
    <script type="text/javascript" src="static/js/custom.js"></script>
  </body>
</html>