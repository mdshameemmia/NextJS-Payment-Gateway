import axios from "axios";

const UserRole =   async (id) => {

   const { data } = await axios.get(`/api/user/role/${id}`);

   const role = data?.role_id?.role;
   
    return role;
}

export default UserRole