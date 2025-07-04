import Swal from "sweetalert2";


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  
  
  export function alertSuccess(message){
   
      Toast.fire({
  
          icon: "succes",
          title: message
      })
  }
  
  export function alertError(message){
   
      Toast.fire({
  
          icon: "error",
          title: message
      })
  }
