currEngine = 0;

engines=[
    {name:"Google", url:"https://www.google.it/search?q="},
    {name:"Google Images", url:"https://www.google.com/search?&tbm=isch&q="},
    {name:"DuckDuckGo", url:"https://duckduckgo.com/?q="},
    {name:"Wikipedia", url:"https://en.wikipedia.org/w/index.php?search="},
    {name:"GitHub", url:"https://github.com/search?utf8=✓&q="}
];

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var month = today.getMonth();
    var weekDay = today.getDay();
    var day = today.getDate();
    if(m==0 && s==0)
        writeDate();
    m = checkTime(m);
    //s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function weekDayToString(weekDay){
    switch(weekDay){
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        case 0:
            return "Sunday";
            break;
        default:
            return "Error: weekDay number "+today.getDay();
    }
}

function monthToString(month){
    switch(month){
        case 0: 
            return "January";
            break;
        case 1: 
            return "February";
            break;
        case 2: 
            return "March";
            break;
        case 3: 
            return "April";
            break;
        case 4: 
            return "May";
            break;
        case 5: 
            return "June";
            break;
        case 6: 
            return "July";
            break;
        case 7: 
            return "August";
            break;
        case 8: 
            return "September";
            break;
        case 9: 
            return "October";
            break;
        case 10: 
            return "November";
            break;
        case 11: 
            return "December";
            break;
        default:
            return "Error in month conversion, number="+month;
    }
}

function dayToString(day){
    switch(day){
        case 1:
        case 21:
        case 31:
            return day+"st";
            break;
        case 2:
            return day+"nd";
            break;
        case 3:
            return day+"rd";
            break;
        default:
            return day+"th";
    }
}

function writeDate() {
    var today = new Date();
    var month = today.getMonth();
    var weekDay = today.getDay();
    var day = today.getDate();
    var year = today.getFullYear();
    document.getElementById('weekday').innerHTML = weekDayToString(weekDay);
    document.getElementById('date').innerHTML = monthToString(month)+" "+dayToString(day)+", "+year;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function changeEngine(n){
    if(n<engines.length){
        $("#dropdown-btn").html(engines[n].name);
    }
    currEngine=n;
    setDefaultEngine(n, 30);
}
    
function generateEngines(){
    for(var i = 0; i < engines.length; i++){
        $("#engine-list").html($("#engine-list").html()+'<a class="dropdown-item" href="#" onclick="changeEngine('+i+')">'+engines[i].name+'</a>');
    }
    //$("#prova").dropdown('dispose');
}

function setDefaultEngine(cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "defaultEngine=" + cvalue + ";" + expires + ";path=/";
}
function getDefaultEngine() {
    var name = "defaultEngine=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function newSearch(){
    window.open(engines[currEngine].url+document.getElementById('field').value,"_self");
}

$(document).ready(function(){
    $('dropdown-toggle').dropdown();
    startTime();
    writeDate();
    generateEngines();
    var defEngine=getDefaultEngine();
    if(defEngine == "")
        changeEngine(0);
    else
        changeEngine(defEngine);
    document.getElementById("search-bar").addEventListener("keydown", function(e) {
        if (e.keyCode == 13) { newSearch(); }
    }, false);
});
