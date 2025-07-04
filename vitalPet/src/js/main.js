import '../scss/styles.scss';
import * as bootstrap from 'bootstrap'
import { alertError,alertSuccess } from './alerts'; 

const endPointAppointments="http://localhost:3000/appointments"
const $namePet =document.getElementById("name_pet");
const $namePerson =document.getElementById("name_person");
const $phonePerson =document.getElementById("phone_person");
const $dateCite =document.getElementById("date_cite");
const $timeCite =document.getElementById("time_cite");
const $description =document.getElementById("description");
const $form =document.getElementById("form")




$form.addEventListener("submit", function(event){

    event.preventDefault();
    createAppointment();
    showCards(data);

});

//Create a new appoiment for the pet
async function createAppointment(){
const newAppointment={

    namePet:$namePet.value,
    nameOwner:$namePerson.value,
    phone:$phonePerson.value,
    date:$dateCite.value,
    time:$timeCite.value,
    description:$description.value

}


try{
// Here i use promises
let response = await fetch(endPointAppointments, {

    method:"POST",
    headers:{

        "content-type": "application/json"
    },
    body: JSON.stringify(newAppointment)

});

if (!response.ok){
    alertError("los entimos, reintente mas tarde");
    throw new Error(response.statusText);
    
    }else{
        alertSuccess("cita agendada ");
    
    }
    }catch (error){
    console.log(error.message)
    }
    };

async function getAppointment(){
    const response = await fetch(endPointAppointments);
    const data =await response.json();
    console.log(data);
}

//Here i show the iformation throught the cards
function showCards(data){

    const container = document.getElementById("cardContainer");
    container.innerHTML="";
    data.forEach(mascota => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${$namePet}</h5>
          <p class="card-text">Usuario: ${$namePerson}</p>
          <p class="card-text">: ${$phonePerson} años</p>
          <p class="card-text">: ${$dateCite} años</p>
          <p class="card-text">: ${$timeCite} años</p>
          <p class="card-text">: ${$description} años</p>
           <a href="#" class="btn btn-primary">Go</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}


