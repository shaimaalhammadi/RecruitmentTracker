import React, { useEffect } from 'react'
import { useState } from 'react'

import { Bar } from 'react-chartjs-2'
import { Chart as chartJS } from 'chart.js/auto'

function DistinctSector(chartData) {
  const [userData, setUserData] = useState({
    labels: chartData.chartData.map((ele) => ele._id),
    datasets: [
      {
        label: '',
        data: chartData.chartData.map((ele) => ele.count),
      },
    ],
  })
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Numbers of interviews per Sector',
      // },
    },
  };

  useEffect(() => {
    setUserData({
      labels: chartData.chartData.map((ele) => ele._id),
      datasets: [
        {
          label: '',
          data: chartData.chartData.map((ele) => ele.count),
        },
      ],
    })
  }, [chartData])

  return (
    <>
      <h5 className='text-style'>Numbers of interviews per Sector</h5>
      <Bar options={options} data={userData} />
    </>
  )
}

export default DistinctSector
