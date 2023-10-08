import axios from "axios";
import 'animate.css';

 const Confirmation = (Swal,url,router,short_message, long_message ,authData) => {
  Swal.fire({
    title: short_message,
    text: long_message,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#3FB2DF',
    cancelButtonText:'skip',
    confirmButtonText: 'Update',
    showClass: {
      popup: 'animate__animated animate__fadeInTopRight animate__delay-0.5s'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutTopRight animate__delay-0.5s'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      router.push(`${url}`);

    }else{
      axios.post(`/api/direction/skip`,authData).then(res=>{
        console.log(res)
        Swal.fire({
          title:'You skipped !',
         text: '',
         icon: 'info',
         showClass: {
          popup: 'animate__animated animate__fadeInTopRight animate__delay-0.5s'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutTopRight animate__delay-0.5s'
        }
        }
        )

      })
    }
  })
  
}

export default Confirmation;
