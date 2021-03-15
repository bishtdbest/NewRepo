launch_success="";
land_success="";
launch_year="";

window.onload = () => {
  document.getElementById("sucLaunchTrue").onclick=launchOnClick;
  document.getElementById("sucLaunchFalse").onclick=launchOnClick;
  document.getElementById("sucLandTrue").onclick=landOnClick;
  document.getElementById("sucLandFalse").onclick=landOnClick;
  var yrBtn= document.getElementsByClassName("year-btn yrBtn");

  for(var i = 0; i < yrBtn.length; i++) {
            var yr = yrBtn[i];
            yr.onclick = yrBtnOnClick;
        }
  
    getData(launch_success,land_success,launch_year);

 }

 function yrBtnOnClick(){
   launch_year = this.innerHTML;
   getData(launch_success,land_success,launch_year);
 }

function launchOnClick() {
launch_success = (this.innerHTML == "True" ? "true" : "false");
getData(launch_success,land_success,launch_year);
}

function landOnClick() {
land_success = (this.innerHTML == "True" ? "true" : "false");;
getData(launch_success,land_success,launch_year);
}

function getData(launchsuccess,landsuccess,launchyear) {
  url = "https://api.spaceXdata.com/v3/launches?limit=100";
  if(launchsuccess !=""){
    url = url + "&launch_success="+launchsuccess;
  }

  if(landsuccess !=""){
    url = url + "&land_success="+landsuccess;
  }

  if(launchyear !=""){
    url = url + "&launch_year="+launchyear;
  }
 
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var d = JSON.parse(xhttp.responseText); 
       var list = "";
       for(var i=0;i<d.length;i++){
         var flightNo = d[i].flight_number;
         document.getElementById("eventList").innerHTML ="";
         
        list = list + creList(d[i]);
       }
       document.getElementById("eventList").innerHTML=list;
    }
};
xhttp.open("GET", url, true);
xhttp.send();
}

function creList(det,list){
  
var d = '<div class="event-item"><figure><img src="'+det.links.mission_patch+'" alt=""></figure><h2><a href="#">'+det.mission_name+'</a></h2><ul><li><strong class="event-label">Mission Ids:</strong> <span class="label-value">'+det.mission_id+'</span></li><li><strong class="event-label">Launch Year:</strong> <span class="label-value">'+det.launch_year+'</span></li><li><strong class="event-label">Successful Launch:</strong> <span class="label-value">'+det.launch_success+'</span></li><li><strong class="event-label">Successful Landing:</strong> <span class="label-value">'+det.rocket.first_stage.cores[0].land_success+'</span></li></ul></div>'
return d;
}