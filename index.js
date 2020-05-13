

$(document).ready(() => {
    console.log("Website is ready.")

    var theme = "light"

    // Switch the theme on the click of the button
    // (Only visible to users without sensor)
    $("#switchTheme").click(switchTheme)

    // Check if the sensor is accessible
    if (window.AmbientLightSensor) {
        try {
            // Try to create a new sensor through wich the values can be accessed
            const sensor = new AmbientLightSensor();
            // Callback is executed as soon as the sensor returns a new value
            sensor.onreading = () => {
                console.log(sensor.illuminance)
                // sensor.illumninance represents light level in lux
                // according to official doc: < 50 <=> "dark"
                if (sensor.illuminance < 50) {
                    // TODO: switch to dark mode theme
                    console.log("dark light")
                } else {
                    //TODO: switch to light mode theme
                    console.log("bright light")
                }
            }

            // Error handling of the sensor itself
            sensor.onerror = event => console.error(event.error.message)
            sensor.start();
        } catch (err) {
            // Error handling of everything else above
            console.error(err.message)
        }
    } else {
        // The browser does not support ambient lighting, display that to the user
        $("#error").show()
    }




    function switchTheme() {
        if (theme == "light") {
            theme = "dark"
            $('#bulma_theme').attr('href', 'https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css');
        } else {
            theme = "light"
            $('#bulma_theme').attr('href', 'https://jenil.github.io/bulmaswatch/flatly/bulmaswatch.min.css');
        }
    }
})