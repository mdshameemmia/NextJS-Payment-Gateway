import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import Link from "next/link";

import Button from "@/components/Forms/Button.component";
import Admin from "@/components/layouts/Admin";
import StandardDateFormat2 from "@/helpers/StandardDateFormat2";
import UserRole from "@/helpers/UserRole";
import SendMessage from "@/helpers/SendMessage";
import SendEmail from "@/helpers/SendEmail";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const session = useSession();
  const [role, setRole] = useState();

  const user_id = session?.data?._id;

  useEffect(() => {
    const getUsers = async (user_id) => {
      const { data } = await axios.post(`/api/payment`, { user_id: user_id });
      console.log(data, "=============");
      setUsers(data);
      setLoading(false);

      // role
      const user_role = await UserRole(user_id);
      setRole(user_role);
    };

    user_id ? getUsers(user_id) : "";
  }, [user_id]);

  const sendMessageAndBillGen = async (user_id) => {
    const { data } = await axios.post(
      `/api/payment/bill-gen-and-send-message`,
      { user_id }
    );

    data.map((user) => {
      const mail_content = {
        user_name: "Hello Sir",
        user_email: user.email,
        message: "You are requested to pay house rent. Thank You.",
      };
      SendEmail(mail_content);
      SendMessage(
        user.mobile,
        "You are requested to pay house rent. Thank You."
      );
    });
    toast("Successfully Bill generate & send message");
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  return (
    <Admin>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className="text-center text-xl text-gray-800 font-bold">
            {t("building:Payment")}
          </h1>

          <div className="flex justify-end mr-5 mb-3">
            {role != "user" && (
              <Button
                type="button"
                className={`button text-white bg-green-500 font-bold mx-1 px-2 rounded button-sm p-1`}
                event={() => sendMessageAndBillGen(user_id)}
              >
                <i className="fa fa-forward"></i> Send Message
              </Button>
            )}
          </div>
          <div style={{ overflow: "scroll" }}>
            <table className="table-auto border border-1 w-full text-center">
              <thead>
                <tr key="">
                  <th className="border border-slate-300 px-2">Ser No</th>
                  <th className="border border-slate-300 px-2">Name</th>
                  <th className="border border-slate-300 px-2">Amount</th>
                  <th className="border border-slate-300 px-2">Date</th>
                  <th className="border border-slate-300 px-2">Status</th>
                  <th className="border border-slate-300 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td className="border border-slate-300 px-2">
                          {index + 1}
                        </td>
                        <td className="border border-slate-300 px-2">
                          {user?.member_id?.first_name +
                            " " +
                            user?.member_id?.last_name}
                        </td>
                        <td className="border border-slate-300 px-2">
                          {user?.amount}
                        </td>
                        <td className="border border-slate-300 px-2">
                          {StandardDateFormat2(user?.date)}
                        </td>
                        <td className="border border-slate-300 px-2">
                          {user?.status ?? "Unpaid"}
                        </td>
                        <td>
                          {user?.status != "Paid" && (
                            <Link href={`/payment/pay/${user._id}`}>
                              <Button
                                type="button"
                                className={`button text-white bg-green-500 font-bold mx-1 px-2 rounded button-sm p-1`}
                              >
                                <i className="fa fa-forward"></i> Pay
                              </Button>
                            </Link>
                          )}
                          {user?.status == "Paid" && (
                            <Link
                              href={`/payment/invoice/${user._id}`}
                              target="_blank"
                            >
                              <Button
                                type="button"
                                className={`button text-white bg-gray-500 font-bold mx-1 px-2 rounded button-sm p-1`}
                              >
                                <i className="fa fa-file"></i>
                              </Button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Admin>
  );
};
export default Payment;
