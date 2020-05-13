$(document).ready(() => {
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
    }
})