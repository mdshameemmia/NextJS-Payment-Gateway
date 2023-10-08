import CONSTANT_VARIABLE from "@/utils/env";
import axios from "axios";

const SendMessage = (number, message) => {

  const url = CONSTANT_VARIABLE.MESSAGE_URL;
  const api_key = CONSTANT_VARIABLE.MESSAGE_API_KEY;
  const senderid = CONSTANT_VARIABLE.MESSAGE_SENDER_ID;

  const message_url = `${url}?api_key=${api_key}&type=text&number=${number}&senderid=${senderid}&message=${message}`;
  
  axios.post(`${message_url}`).then(res => {
    console.log(res.data.success_message)
  })
    
}

export default SendMessage;