import React from "react";
import Chart from "chart.js/auto";

export default function PieBarChart({data}) {

  React.useEffect(() => {
  
    let config = {
      type: "doughnut",
      data: {
        labels: ["Active", "Want to Leave", "Left"],
        datasets: [
          {
            label: "My First Dataset",
            data: [data.active_user, data.want_to_leave, data.already_leave],
            backgroundColor: [  "#22c55e","#fde047",'#f87171'],
            hoverOffset: 4,
          },
        ],
      },
    };
    let ctx = document.getElementById("pie-bar-chart").getContext("2d");
    window.myPieChart = new Chart(ctx, config);
    return () => {
      window.myPieChart.destroy();
    };
  }, [data]);
  return (
    <>
      <div className="card p-3 w-full lg:w-3/12 min-h-20 bg-white  shadow mb-6 rounded ">
        <h1 className="text-center text-xl ">User Status</h1>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div>
            <canvas id="pie-bar-chart" height={`10px`}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
