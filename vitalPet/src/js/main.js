import '../scss/styles.scss';
import * as bootstrap from 'bootstrap'
import { alertError, alertSuccess } from './alerts';

const endPointAppointments = "http://localhost:3000/appointments"
const $namePet = document.getElementById("name_pet");
const $namePerson = document.getElementById("name_person");
const $phonePerson = document.getElementById("phone_person");
const $dateCite = document.getElementById("date_cite");
const $timeCite = document.getElementById("time_cite");
const $description = document.getElementById("description");
const $form = document.getElementById("form");

let isEditing = false;
let editingId = null;

document.addEventListener("DOMContentLoaded", async () => {
  const dato = await getAppointment();
  showCards(dato);
});

$form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (isEditing) {
    await updateAppointment(editingId);
  } else {
    await createAppointment();
  }

  const dato = await getAppointment();
  showCards(dato);

  $form.reset();
  isEditing = false;
  editingId = null;
});


// Here i have a function that add new appointments
async function createAppointment() {
 // This is my object of information, i add this information in my file.Json
    const newAppointment = {
    namePet: $namePet.value,
    namePerson: $namePerson.value,
    phone: $phonePerson.value,
    date: $dateCite.value,
    time: $timeCite.value,
    description: $description.value
  };

  //Evitar que el programa se rompa
   try {
    const response = await fetch(endPointAppointments, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newAppointment)
    });

    if (!response.ok) {
      alertError("Lo sentimos, reintente más tarde");
      throw new Error(response.statusText);
    } else {
      alertSuccess("Cita agendada");
      return newAppointment;
    }

  } catch (error) {
    console.log(error.message);
  }
};


async function updateAppointment(id) {
  const updatedAppointment = {
    namePet: $namePet.value,
    namePerson: $namePerson.value,
    phone: $phonePerson.value,
    date: $dateCite.value,
    time: $timeCite.value,
    description: $description.value
  };

  try {
    const response = await fetch(`${endPointAppointments}/${id}`, {
      
        method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedAppointment)
    });

    if (!response.ok) {
      alertError("Error al actualizar la cita");
      throw new Error(response.statusText);
    }

    alertSuccess("Cita actualizada correctamente");

  } catch (error) {
    console.log(error.message);
  }
}

async function deleteAppointment(id) {
  try {
    const response = await fetch(`${endPointAppointments}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar la cita.");
    }

    alertSuccess("La cita ha sido eliminada exitosamente");

    const citas = await getAppointment();
    showCards(citas);

  } catch (error) {
    alertError("Hubo un problema al eliminar");
  }
}

async function getAppointment() {
  const response = await fetch(endPointAppointments);
  const data = await response.json();
  const appointmentsArray = Object.values(data);
  return appointmentsArray;
}

function showCards(dato) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  dato.forEach(mascota => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4"

    card.innerHTML = `
      <div class="card h-100 ">
        <div class="card-body">
          <h5 class="card-title">Appointment</h5>
          <p class="card-text">User: ${mascota.namePerson}</p>
          <p class="card-text">Contact: ${mascota.phone}</p>
          <p class="card-text">Date: ${mascota.date}</p>
          <p class="card-text">Hour: ${mascota.time}</p>
          <p class="card-text">Description: ${mascota.description}</p>
          <p class="card-text ">Pet: ${mascota.namePet}</p>
          <div class="row mt-2">
            <a href="#" class="btn btn-warning col-5 mx-1 edit-btn" data-id="${mascota.id}">Edit</a>
            <a href="#" class="btn btn-danger col-5 mx-1 delete-btn" data-id="${mascota.id}">Delete</a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-id");
      await deleteAppointment(id);
    });
  });

  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-id");
      const cita = dato.find(item => item.id == id);
      if (cita) {
        $namePet.value = cita.namePet;
        $namePerson.value = cita.namePerson;
        $phonePerson.value = cita.phone;
        $dateCite.value = cita.date;
        $timeCite.value = cita.time;
        $description.value = cita.description;

        isEditing = true;
        editingId = id;
        alertSuccess("Modo edición activado");
      }
    });
  });
}
