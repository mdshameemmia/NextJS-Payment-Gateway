import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import Swal from "sweetalert2";

import Admin from "components/layouts/Admin.js";
import PieBarChart from "@/components/Cards/PieBarChart";
import CardPageVisits from "@/components/Cards/CardPageVisits";
import UserRole from "@/helpers/UserRole";
import Confirmation from "@/helpers/Confirmation";

export default function Dashboard({ data }) {
  const { data: session, status } = useSession();
  const { t } = useTranslation();
  const router = useRouter();

  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();

  const user_id = session?._id;

  useEffect(() => {
    const getActivity = async () => {
      const { data } = await axios.get(`/api/activity/all-activity`);
      setActivity(data);

      // role status
      const user_role = await UserRole(session?._id);
      setRole(user_role);

      setLoading(false);

      // alert functionality
      if (user_role == "user") {
        const getMember = async (user_id) => {
          const { data } = await axios.post(`/api/direction/`, { id: user_id });

          if (data) {
            Confirmation(
              Swal,
              data.url,
              router,
              data.short_message,
              data.long_message,
              { id: user_id }
            );
          }
        };

        user_id ? getMember(user_id) : "";
      }
    };

    getActivity();

    if (status && status === "unauthenticated") {
      router.push("/user/login");
    }
  }, []);

  return (
    <>
      <Admin>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="flex my-3">
              {role != "user" && (
                <div className="card w-3/12 h-24 mx-12 my-3 bg-teal-700 text-center rounded overflow-hidden shadow-xl">
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href="/user"
                      className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                    >
                      {t("common:User")}
                    </Link>
                  </div>
                </div>
              )}
              {role == "user" && (
                <div className="card w-3/12 h-24 mx-12 my-3 bg-teal-700 text-center rounded overflow-hidden shadow-xl">
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href="/members/create"
                      className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                    >
                      {t("common:Profile")}
                    </Link>
                  </div>
                </div>
              )}
              {
                role != 'superadmin' && <div className="card w-3/12 h-24 mx-12 my-3 bg-gray-700 text-center rounded overflow-hidden shadow-xl">
                <div className="px-6 pt-4 pb-2">
                  <Link
                    href="/payment"
                    className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                  >
                    {t("building:Payment")}
                  </Link>
                </div>
              </div>
              }
              {
                role == 'superadmin' && <div className="card w-3/12 h-24 mx-12 my-3 bg-gray-700 text-center rounded overflow-hidden shadow-xl">
                <div className="px-6 pt-4 pb-2">
                  <Link
                    href="/request-message"
                    className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                  >
                    {t("common:Request Message")}
                  </Link>
                </div>
              </div>
              }
              {role == "admin"  && (
                <div className="card w-3/12 h-24 mx-12 my-3 bg-blue-800 text-center rounded overflow-hidden shadow-xl">
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href="/house-rent"
                      className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                    >
                      {t("building:House Rent")}
                    </Link>
                  </div>
                </div>
              )}
              {role == "superadmin"  && (
                <div className="card w-3/12 h-24 mx-12 my-3 bg-blue-800 text-center rounded overflow-hidden shadow-xl">
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href="/subscription"
                      className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                    >
                      {t("common:Subscription")}
                    </Link>
                  </div>
                </div>
              )}
              {role == "user" && (
                <div className="card w-3/12 h-24 mx-12 my-3 bg-blue-800 text-center rounded overflow-hidden shadow-xl">
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href="/tenant-form"
                      className="inline-block rounded-full px-3 py-1 text-2xl font-bold text-white mr-2 mb-2"
                    >
                      {t("common:Tenant Form")}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="flex">
              <PieBarChart data={data} />
              <CardPageVisits activity={activity} />
            </div>

            <div className="text-center my-3">
              <h1 className="text-2xl font-bold text-red-700">
                {t('common:Hello')}! {session?.username}. {t('common:Welcome to Admin Panel')}.
              </h1>
            </div>
          </div>
        )}
      </Admin>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = { active_user: 4, want_to_leave: 2, already_leave: 3 };
  return {
    props: {
      data,
    },
  };
}
