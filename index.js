

$(document).ready(() => {
    var theme = "light"
    var illuminances = []
    var compatible = true

    // Assuming a bright value for the start
    var currentIlluminance = 100

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
                // sensor.illumninance represents light level in lux
                // according to official doc: < 50 <=> "dark"
                currentIlluminance = sensor.illuminance
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
        compatible = false
        $("#error").show()
    }


    // Test if the browser is compatible, if not we don't need to waste 
    // computing power for the interval    
    if (compatible) {
        // Called every 200 milliseconds
        setInterval(function () {
            if (illuminances.length >= 5) {
                // One second has passed, check if we should switch the theme
                // calculate the median 
                var average = calculateAverage(illuminances)

                if (average < 50) {
                    // Median is a dark room, so switch to the dark theme
                    switchThemeToDark()
                } else {
                    // Median is a light room, switch to light theme
                    switchThemeToLight()
                }
                // Reset the array
                illuminances = []
            } else {
                // the second hasn't passed yet, just add the current value
                illuminances.push(currentIlluminance)
            }
        }, 200)
    }


    /* FUNCTIONS */

    /**
     * Returns the median of any given number array
     * @param {[NUMBER]} arr 
     */
    function calculateMedian(arr) {
        var arrSort = arr.sort((f, s) => {
            if (f < s) { return -1; }
            else if (f > s) { return 1; }
            else { return 0; }
        })
        var mid = Math.ceil(arr.length / 2);
        var median = arr.length % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
        return median;
    }

    /**
     * Returns the average of any given number array
     * @param {[NUMBER]} arr 
     */
    function calculateAverage(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum / arr.length;
    }

    /**
     * Switches the theme of the website
     */
    function switchTheme() {
        if (theme == "light") {
            switchThemeToDark()
        } else {
            switchThemeToLight()
        }
    }

    /**
     * Switches the theme of the website
     * to the light theme
     */
    function switchThemeToLight() {
        // Check if theme is actually dark first, otherwise nothing to do here :)
        if (theme == "dark") {
            theme = "light"
            $('#bulma_theme').attr('href', 'https://jenil.github.io/bulmaswatch/flatly/bulmaswatch.min.css');
        }
    }

    /**
     * Switches the theme of the website
     * to the dark theme
     */
    function switchThemeToDark() {
        // Check if theme is actually light first, otherwise nothing to do here :) 
        if (theme == "light") {
            theme = "dark"
            $('#bulma_theme').attr('href', 'https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css');
        }
    }
})