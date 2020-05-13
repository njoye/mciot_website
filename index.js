

$(document).ready(() => {
    console.log("Website is ready.")

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
                console.log(sensor.illuminance)
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
    console.log("compatible="+compatible)
    
    if(compatible){
        // Called every 200 milliseconds
        setInterval(200, () => {
            console.log(illuminances)
            if(illuminances.length == 5){
                // One second has passed, check if we should switch the theme
                // calculate the median 
                var median = calculateMedian(illuminances)
                console.log("Median is = " + median)
                if(median <= 50){
                    // Median is a dark room, so switch to the dark theme
                    switchThemeToDark()
                }else{
                    // Median is a light room, switch to light theme
                    switchThemeToLight()
                }
                // Reset the array
                illuminances = []
            }else{
                console.log("added value " + currentIlluminance + " to array")
                // the second hasn't passed yet, just add the current value
                illuminances.push(currentIlluminance)
            }
        })
    }


    /* FUNCTIONS */

    /**
     * Returns the median of any given number array
     * @param {[INT]} arr 
     */
    function calculateMedian(arr){
        var arrSort = arr.sort();
        var mid = Math.ceil(len / 2);
        var median = len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
        return median;
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
        if(theme == "dark"){
            theme = "light"
            $('#bulma_theme').attr('href', 'https://jenil.github.io/bulmaswatch/flatly/bulmaswatch.min.css');
        }
    }

    /**
     * Switches the theme of the website
     * to the dark theme
     */
    function switchThemeToDark(){
        // Check if theme is actually light first, otherwise nothing to do here :) 
        if(theme == "light"){
            theme = "dark"
            $('#bulma_theme').attr('href', 'https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css');
        }
    }


})