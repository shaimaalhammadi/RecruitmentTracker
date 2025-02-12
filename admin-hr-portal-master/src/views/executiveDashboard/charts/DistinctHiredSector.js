import React, { useEffect } from 'react'
import { useState } from 'react'

import { Chart } from 'react-chartjs-2'

function DistinctHiredSector(chartData) {
  const labels = [...chartData.chartData.hired, ...chartData.chartData.resigned]
  const [userData, setUserData] = useState({
    labels: labels.map((ele) => ele._id),
    datasets: [
      {
        type: 'bar',
        borderWidth: 2,
        fill: false,
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgb(255,99,132)',
        label: 'Number of Resigned Employees',
        data: chartData.chartData.resigned.map((ele) => ele.count),
      },
      {
        type: 'bar',
        borderWidth: 1,
        backgroundColor: 'rgb(151,205,243)',
        label: 'Number of Hired Employees',
        data: chartData.chartData.hired.map((ele) => ele.count),
      }
    ],
  })

  useEffect(() => {
    setUserData({
      labels: labels.map((ele) => ele._id),
      datasets: [
        {
          type: 'bar',
          borderWidth: 2,
          fill: false,
          borderColor: 'rgb(255,99,132)',
          backgroundColor: 'rgb(255,99,132)',
          label: 'Number of Resigned Employees',
          data: chartData.chartData.resigned.map((ele) => ele.count),
        },
        {
          type: 'bar',
          borderWidth: 1,
          backgroundColor: 'rgb(151,205,243)',
          label: 'Number of Hired Employees',
          data: chartData.chartData.hired.map((ele) => ele.count),
        }
      ],
    })
  }, [chartData])

  return (
    <>
      <h5 className='text-style'>Joined vs Resigned</h5>
      <Chart data={userData} />
    </>
  )
}

export default DistinctHiredSector
