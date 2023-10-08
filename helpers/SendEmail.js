import emailjs from '@emailjs/browser';
import CONSTANT_VARIABLE from '@/utils/env';

const SendEmail = (data) => {
    emailjs.send(
        CONSTANT_VARIABLE.SEND_EMAILJS_SERVIE_KEY,
        CONSTANT_VARIABLE.SEND_EMAILJS_TEMPLATE_KEY,
        data, 
        CONSTANT_VARIABLE.SEND_EMAILJS_PUBLIC_KEY
      )
        .then(({ status }) => {
          console.log(status)
        }, () => {
          // Show error message
          console.log('error')
        });
}

export default SendEmail;