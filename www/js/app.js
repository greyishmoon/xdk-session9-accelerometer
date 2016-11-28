function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    // Listener for button
    $('#exampleButton').on("click", runFunction);
    
//    // Alternative button listener showing inline function
//    $('#exampleButton').on("click", function(){
//        runFunction();
//    });
    
}
document.addEventListener("app.Ready", onAppReady, false) ;


function runFunction()
{
    $("#exampleText").text("TEXT WAS REPLACED!");
    $("#exampleAppend").append(" APPENDED TEXT!");
//    alert("CLICKED");
}