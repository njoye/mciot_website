$(document).ready(() => {
    console.log("Website has loaded - adding Event Listener for Ambient Light")

    window.addEventListener('devicelight', function(event){
        console.log(event.value)
    })
})