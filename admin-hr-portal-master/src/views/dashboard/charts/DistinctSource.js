import React, { useEffect } from 'react'
import { useState } from 'react'

import { Pie } from 'react-chartjs-2'
import { Chart as chartJS } from 'chart.js/auto'

function DistinctSource(chartData) {
  const [userData, setUserData] = useState({
    labels: chartData.chartData.map((ele) => ele._id),
    datasets: [
      {
        label: 'Numbers of interviews as per Application source',
        data: chartData.chartData.map((ele) => ele.count),
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    setUserData({
      labels: chartData.chartData.map((ele) => ele._id),
      datasets: [
        {
          label: 'Numbers of interviews as per Application source',
          data: chartData.chartData.map((ele) => ele.count),
          borderWidth: 1,
        },
      ],
    })
  }, [chartData])

  return (
    <>
      <h5 className='text-style'>Numbers of interviews per Application Source</h5>
      <Pie data={userData} />
    </>
  )
}

export default DistinctSource
