

$(document).ready(() => {
    var theme = "light"

    $("#switchTheme").click(() => {
        if(theme == "light"){
            theme = "dark"
            $('#bulma_theme').attr('href','https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css');
        }else{
            theme = "light"
            $('#bulma_theme').attr('href','https://jenil.github.io/bulmaswatch/flatly/bulmaswatch.min.css');
        }

        console.log("switchting theme to " + theme)

        


    })



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
                // TODO: switch to dark mode theme

                console.log("dark light")
              } else {
                //TODO: switch to light mode theme
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