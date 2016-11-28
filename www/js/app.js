var watchID;
var accelerometerOptions = { frequency: 2000 };  // Update every 2 seconds
accelerometerOptions.frequency = 3000; //changed my mind - now 3 seconds

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    //setup listener for the toggle switch
	$("#flipswitch").on("change", function() {
		
		if( $(this).val() == "on" ) startSensor();
		else if ( $(this).val() == "off" ) stopSensor();

	});
	
	//setup listener for the slider
	$("#slider").on("slidestop", function() {
		
		
		//the value from the slider is text - it needs to be turned into an integer
		var freq = parseInt($(this).val());
		
		updateFreq(freq);
	
	});
    
}
document.addEventListener("app.Ready", onAppReady, false) ;


function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}


function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);
			
	$('#sensorX').val("Off");
	$('#sensorY').val("Off");
	$('#sensorZ').val("Off");
	//$('#timestamp').val("");
}

function accelerometerSuccess(acceleration) {
	
	$('#sensorX').val(acceleration.x);
	$('#sensorY').val(acceleration.y);
	$('#sensorZ').val(acceleration.z);
	$('#timestamp').val(convertTime(acceleration.timestamp));

}

function accelerometerError() {
   alert('Error');
}

function updateFreq(freq) {
	accelerometerOptions.frequency = freq;
    stopSensor();
    startSensor();
}

////////////// UTIL FUNCTIONS //////////////////

// Convert from DOM Timestamp (UNIX time in milliseconds) as returned by plugins to simple TIME ONLY string 
function convertTime(DOMtime) {
	// convert domTimeStamp to Date which browsers recognise
    var date = new Date(DOMtime);
    // convert to formated time string
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}



