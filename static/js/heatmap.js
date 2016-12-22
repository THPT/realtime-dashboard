// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 16.0527412, lng: 106.2337417}
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
        radius: 25
    });
}


// Heatmap data: 500 Points
function getPoints() {
    return [
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(21.0282739, 105.853886),
        new google.maps.LatLng(20.8647119, 106.683842),
        new google.maps.LatLng(16.0756686, 108.224465),
        new google.maps.LatLng(10.7765194, 106.700987),
        new google.maps.LatLng(10.0361904, 105.788036),
        new google.maps.LatLng(10.3898824, 105.434568),
        new google.maps.LatLng(10.3496754, 107.07267),
        new google.maps.LatLng(21.275831, 106.200285),
        new google.maps.LatLng(22.145032, 105.828165),
        new google.maps.LatLng(9.29024341, 105.725128),
        new google.maps.LatLng(21.1855819, 106.07592),
        new google.maps.LatLng(10.2360434, 106.373899),
        new google.maps.LatLng(13.7690305, 109.228381),
        new google.maps.LatLng(10.9816684, 106.650501),
        new google.maps.LatLng(11.5396864, 106.900785),
        new google.maps.LatLng(10.9237964, 108.100049),
        new google.maps.LatLng(9.1772094, 105.151069),
        new google.maps.LatLng(22.668634, 106.257845),
        new google.maps.LatLng(12.6743795, 108.04313),
        new google.maps.LatLng(12.0034275, 107.685046),
        new google.maps.LatLng(21.386117, 103.016355),
        new google.maps.LatLng(10.9452734, 106.816537),
        new google.maps.LatLng(10.4592074, 105.631685),
        new google.maps.LatLng(13.9808145, 108.001424),
        new google.maps.LatLng(22.8282081, 104.980896),
        new google.maps.LatLng(20.5461559, 105.912372),
        new google.maps.LatLng(18.3415468, 105.904641),
        new google.maps.LatLng(20.9401009, 106.33309),
        new google.maps.LatLng(9.78407042, 105.467978),
        new google.maps.LatLng(20.8115669, 105.335322),
        new google.maps.LatLng(20.6546279, 106.057428),
        new google.maps.LatLng(12.2437125, 109.192682),
        new google.maps.LatLng(10.0093214, 105.082311),
        new google.maps.LatLng(14.3461916, 108.003489),
        new google.maps.LatLng(22.399207, 103.44533),
        new google.maps.LatLng(11.9364585, 108.443642),
        new google.maps.LatLng(21.846392, 106.753309),
        new google.maps.LatLng(22.476104, 103.973463),
        new google.maps.LatLng(10.5366014, 106.413011),
        new google.maps.LatLng(20.4349609, 106.177694),
        new google.maps.LatLng(18.6733908, 105.69316),
        new google.maps.LatLng(20.2579789, 105.97595),
        new google.maps.LatLng(11.5656264, 108.990826),
        new google.maps.LatLng(21.322495, 105.400748),
        new google.maps.LatLng(13.0955445, 109.322169),
        new google.maps.LatLng(17.4668277, 106.623176),
        new google.maps.LatLng(15.5728316, 108.470991),
        new google.maps.LatLng(15.1178446, 108.797156),
        new google.maps.LatLng(20.9416489, 107.123658),
        new google.maps.LatLng(16.8176057, 107.099581),
        new google.maps.LatLng(9.59995442, 105.970841),
        new google.maps.LatLng(21.33162, 103.90289),
        new google.maps.LatLng(11.3145644, 106.09426),
        new google.maps.LatLng(20.4539449, 106.347061),
        new google.maps.LatLng(21.593689, 105.844519),
        new google.maps.LatLng(19.8075949, 105.775927),
        new google.maps.LatLng(16.4621577, 107.58481),
        new google.maps.LatLng(10.3528914, 106.363224),
        new google.maps.LatLng(9.93626843, 106.341127),
        new google.maps.LatLng(21.821563, 105.217233),
        new google.maps.LatLng(10.2542454, 105.972312),
        new google.maps.LatLng(21.309961, 105.607572),
        new google.maps.LatLng(21.725782, 104.913649)
    ];
}
