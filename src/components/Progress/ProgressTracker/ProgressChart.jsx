import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export const ProgressChart = ({ data }) => {
  const [chartData, setChartData] = useState();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 0, // Adjust padding as needed
        right: 0,
        bottom: 20,
        left: 0,
      },
    },
    elements: {
      point: {
        radius: 2,
        pointStyle: "circle",
      },
    },
  };

  // const generatedColors = () => {
  //   const rand1 = Math.floor(Math.random() * 255) + 1;
  //   const rand2 = Math.floor(Math.random() * 255) + 1;
  //   const rand3 = Math.floor(Math.random() * 255) + 1;
  //   const colors = {
  //     borderColor: `rgba(${rand1}, ${rand2}, ${rand3}, 1)`,
  //     backgroundColor: `rgba(${rand1}, ${rand2}, ${rand3}, 0.5)`,
  //   };
  //   return colors;
  // };

  useEffect(() => {
    if (data && data.length) {
      let labels = [];
      let datasets = [];
      for (let i = 0; i < data.length; i++) {
        // const colors = generatedColors();
        let dataObj = {
          label: data[i].name,
          data: [],
          // borderColor: colors.borderColor,
          // backgroundColor: colors.backgroundColor,
        };
        for (let note of data[i].notes) {
          if (!labels.includes(note.meeting.dayHourUTC)) {
            labels.push(moment(note.meeting.dayHourUTC).format("ddd, MMM DD"));
          }
          dataObj.data.push(note.points);
        }
        datasets.push(dataObj);
      }
      setChartData({
        labels,
        datasets,
      });
    }
  }, [data]);

  return (
    <div className="flex-1 md:h-full w-screen md:w-full p-2">
      {chartData && <Line options={options} data={chartData} />}
    </div>
  );
};
