import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";


export default function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation();
  const session = useSession();
  const [role, setRole] = useState("");
  const [totalMessage, setTotalMessage] = useState();

  const user_id = session?.data?._id;
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  useEffect(() => {
    const getRole = async (user_id) => {
      const { data } = await axios.get(`/api/user/role/${user_id}`);
      const role = data?.role_id?.role;
      setRole(role);
    };
    getRole(user_id);

    const getTotalMessage = async (user_id) => {
      const { data } = await axios.get(`/api/request-message/total-unseen`);
      setTotalMessage(data);      
    };
    getTotalMessage(user_id);


  }, [user_id]);

  return (
    <>
      <nav className="bg-cyan-900 text-white md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-cyan-900 m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            href="/"
            className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-3xl uppercase font-bold p-4 px-0"
          >
            {t("common:ABC")}
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="#pablo"
                    className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold p-4 px-0"
                  >
                    ABC
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-cyan-900 rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid  border-blueGray-500 placeholder-blueGray-300 text-white bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-white text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {t("common:Admin Layout Page")}
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li
                className={
                  router.pathname.indexOf("/admin/dashboard") !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href={`/admin/dashboard`}>
                  <i className="fas fa-tv mr-2 text-sm"></i>
                  {t("common:Dashboard")}
                </Link>
              </li>
              {
                role != 'superadmin' && <li
                className={
                  router.pathname.indexOf("members") !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href={`/members/`}>
                  <i className="fas fa-users mr-2 text-sm"></i>
                  {t("common:Members")}
                </Link>
              </li>
              }
              {
                role != 'superadmin' && <li
                className={
                  router.pathname.indexOf("relatives") !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href={`/relatives/`}>
                  <i className="fas fa-users mr-2 text-sm"></i>
                  {t("common:Other's Family Member")}
                </Link>
              </li>
              }
              {
                role != 'superadmin' && <li
                className={
                  router.pathname.indexOf("tenant-form") !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href={`/tenant-form/`}>
                  <i className="fas fa-wpforms mr-2 text-sm"></i>
                  {t("common:Tenant Form")}
                </Link>
              </li>

              }
              {role == "admin" && (
                <li
                  className={
                    router.pathname.indexOf("building") !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/building/`}>
                    <i className="fas fa-building mr-2 text-sm"></i>
                    {t("building:Building")}
                  </Link>
                </li>
              )}

              {role == "admin" && (
                <li
                  className={
                    router.pathname.indexOf("house-rent") !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/house-rent/`}>
                    <i className="fas fa-dollar mr-2 text-sm"></i>
                    {t("building:House Rent")}
                  </Link>
                </li>
              )}

            {
              role != 'superadmin' && <li
              className={
                router.pathname.indexOf("payment") !== -1
                  ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                  : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
              }
            >
              <Link href={`/payment/`}>
                <i className="fas fa-dollar mr-2 text-sm"></i>
                {t("building:Payment")}
              </Link>
            </li>
             }

              

              {role == "superadmin" && (
                <li
                  className={
                    router.pathname.indexOf("subscription") !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/subscription/`}>
                    <i className="fas fa-users mr-2 text-sm"></i>
                    {t("common:Subscription")}
                  </Link>
                </li>
              )}
              {role == "superadmin" && (
                <li
                  className={
                    router.pathname.indexOf("package") !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/package/`}>
                    <i className="fas fa-dollar mr-2 text-sm"></i>
                    {t("common:Package")}
                  </Link>
                </li>
              )}
              {role != "user" && (
                <li
                  className={
                    router.pathname.indexOf("notice") !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/notices/`}>
                    <i className="fas fa-bell mr-2 text-sm"></i>
                    {t("common:Notice")}
                  </Link>
                </li>
              )}

              {role == "superadmin" && (
                <li
                  className={
                    router.pathname.indexOf("request-message") !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/request-message/`}>
                    <i className="fas fa-message mr-2 text-sm"></i>
                    {t("common:Request Message")}
                    {totalMessage != 0 && (
                      <span className="badge mx-1 mt-3 px-2 bg-red-500 text-white ">
                        {totalMessage != 0 ? totalMessage : ""}
                      </span>
                    )}
                  </Link>
                </li>
              )}
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-white text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {t("common:Auth Layout Page")}
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-1">
              {role != "user" && (
                <li
                  className={
                    router.pathname.indexOf(`user`) !== -1
                      ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                      : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                  }
                >
                  <Link href={`/user/`}>
                    <i className="fas fa-user mr-2 text-sm"></i>
                    {t("common:User")}
                  </Link>
                </li>
              )}
              <li
                className={
                  router.pathname.indexOf(`profile`) !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href={`/profile/`}>
                  <i className="fas fa-user mr-2 text-sm"></i>
                  {t("common:Profile")}
                </Link>
              </li>

              <li
                className={
                  router.pathname.indexOf("logout") !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href={``} onClick={() => signOut()}>
                  <i className="fas fa-power-off text-white-400 mr-2 text-sm"></i>
                  {t("common:Logout")}
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-white text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {t("common:No Layout Page")}
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-1">
              <li
                className={
                  router.pathname.indexOf("landing") !== -1
                    ? "text-xs uppercase p-3 block text-green-900 font-bold bg-white"
                    : "text-xs uppercase p-3 block hover:text-black font-bold hover:font-bold hover:bg-green-300"
                }
              >
                <Link href="/">
                  <i className="fas fa-newspaper  text-white-400 mr-2 text-sm"></i>
                  {t("common:Landing Page")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
