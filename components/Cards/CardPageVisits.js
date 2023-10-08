import React from "react";
import moment from "moment";
import StandardDateFormatWithHour from "@/helpers/StandardDateFormatWithHour";

// components

export default function CardPageVisits({ activity }) {
  return (
    <>
      <div className="relative mx-4 flex flex-col px-3 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-96">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold  text-blueGray-700 text-xl">
                User Activities
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-scroll overflow-y-scroll " >
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse h-1/4">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                  <i className="fas fa-user mx-2"></i>
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                  <i className="fas fa-envelope mx-2"></i>
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Activity
                  <i className="fas fa-tasks mx-2"></i>
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Time
                  <i className="fas fa-clock text-red-white mx-2"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                activity && activity.map( data => {
                  return <tr key={data._id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{data?.user}</th>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{data?.email}</th>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{data?.activity}</th>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{
                    // moment(data?.createdAt, "YYYYMMDD").fromNow()
                    StandardDateFormatWithHour(data?.createdAt)
                    }</th>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
