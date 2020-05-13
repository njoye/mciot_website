$(document).ready(() => {
    // Loading tweets 
    var url = 'https://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=tecoKIT&count=4';

    $.getJSON(
        url,
        function (data)
        {
            var $tweets = $('#tweets');
            $tweets.empty();
            if (data.length !== 0) {
                $.each(data, function (i, tweet)
                {
                    console.log(tweet.text)
                });
            } else {
                console.log("tweet array empty")
                //$tweets.append($('<li></li>', { text: 'No recent tweets' }));
            }
        }
    );





    console.log("Website has loaded - adding Event Listener for Ambient Light")
    if (window.AmbientLightSensor){
        try{
          const sensor = new AmbientLightSensor();
          // Detect changes in the light
          sensor.onreading = () => {
            console.log(sensor.illuminance)
    
              // Read the light levels in lux 
              // < 50 is dark room
              if (sensor.illuminance < 50) {
                console.log("dark light")
              } else {
                console.log("bright light")
              }
          }
    
          // Has an error occured?
          sensor.onerror = event => console.error(event.error.message)
          sensor.start();
        } catch(err) {
          console.error(err.message)
        }
    } else {
      console.log("Browser doesn't support ambient light")
      $("#error").show()
    }
})