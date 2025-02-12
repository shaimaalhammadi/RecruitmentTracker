import React, { useEffect } from 'react'
import { useState } from 'react'

import { Pie } from 'react-chartjs-2'

function JobLevelSector(chartData) {
  const [userData, setUserData] = useState({
    labels: chartData.chartData.map((ele) => ele._id),
    datasets: [
      {
        label: '',
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
          label: '',
          data: chartData.chartData.map((ele) => ele.count),
          borderWidth: 1,
        },
      ],
    })
  }, [chartData])

  return (
    <>
      <h5 className='text-style'>Numbers of candidates per Job Level</h5>
      <Pie data={userData} />
    </>
  )
}

export default JobLevelSector
