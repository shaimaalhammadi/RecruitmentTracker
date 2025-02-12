import React, { useEffect } from 'react'
import { useState } from 'react'

import { Doughnut } from 'react-chartjs-2'
import { Chart as chartJS } from 'chart.js/auto'

function DistinctSelectedSector(chartData) {
  const [userData, setUserData] = useState({
    labels: chartData.chartData.map((ele) => ele._id),
    datasets: [
      {
        label: 'Numbers of shortlisted candidates overall and per sectors',
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
          label: 'Numbers of shortlisted candidates overall and per sectors',
          data: chartData.chartData.map((ele) => ele.count),
          borderWidth: 1,
        },
      ],
    })
  }, [chartData])

  return (
    <>
      <h5 className='text-style'>Numbers of shortlisted candidates per Sector</h5>
      <Doughnut data={userData} />
    </>
  )
}

export default DistinctSelectedSector
