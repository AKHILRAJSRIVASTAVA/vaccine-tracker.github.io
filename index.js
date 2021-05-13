console.log("AKHIL");
let fetchbtn = document.getElementById('button');
fetchbtn.addEventListener('click', buttonClickHandler)
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'-'+mm+'-'+dd;
date.value=today;
function open() {
var date = document.getElementById("date");
date.value=today;
console.log(today);  
  
}

fetchbtn.addEventListener('click', buttonClickHandler)
function buttonClickHandler() {
    let text = document.getElementById("pin");
  let x = date.value;
  x = x.split("-").reverse().join("-");
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${text.value}&date=${x}`, true);
  xhr.onload = function () {

    let obj = JSON.parse(this.responseText);
    let i;
    let html = "";
    if (this.status == 200) {
     if(obj.centers=="")
      {   console.log("NO DATA");
         html += `<h3>NO DATA  AVAILABLE OF THE GIVEN LOCATION</h3>`}
     else{
      for (i in obj.centers) {
        for (j in obj.centers[i].sessions) {
          console.log(obj.centers[i].sessions[j]);
          html += `<tr> <td data-label="CENTER ID" id="center">${obj.centers[i].center_id}</td>
        <td data-label="NAME">${obj.centers[i].name}</td>
        <td data-label="ADDRESS">${obj.centers[i].address}</td>
        <td data-label="DATE">${obj.centers[i].sessions[j].date}</td>
        <td data-label="VACCINE">${obj.centers[i].sessions[j].vaccine}</td>
        <td data-label="SLOT">${obj.centers[i].sessions[j].slots[0]}<br>${obj.centers[i].sessions[j].slots[1]}<br>${obj.centers[i].sessions[j].slots[2]}<br>${obj.centers[i].sessions[j].slots[3]}</td>
        <td data-label="AVAILABILTY">${obj.centers[i].sessions[j].available_capacity}</td>
        <td data-label="MIN_AGE_LIMIT">${obj.centers[i].sessions[j].min_age_limit}</td> </tr>`
        }
      }
     } 
      

    }
    else if (this.status == 400) {
      html += `<h3>INVALID INPUT</h3>`;
      console.log("NOT BAD");
    }
    else if (this.status == 401) {
      html += `<h3>UNAUTHORIZED ACCESS</h3>`
    }
    else if (this.status == 500) {
      html += `<h3>INTERNAL SERVER ERROR</h3>`
    }
    else {
      html += `<h3>NETWORK ERROR</h3>`
    }
    let x = document.getElementById("tbody");
    x.innerHTML = html;

  }
  xhr.send();
}