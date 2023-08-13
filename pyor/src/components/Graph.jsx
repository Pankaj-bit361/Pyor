"use client";
import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import EChartsReact from 'echarts-for-react';
const Graph = ({data}) => {



const [options,setoptions]=useState({})


useEffect(()=>{
  let  option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '2023', "Feb", "Mar", "Apr", "May", "Jun"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.coin,
            type: 'line',
            areaStyle: {}
          }
        ]
      };
setoptions(option)

},[data])



  return (
    <div className='mt-10 text-white '>
    <h1 className='text-center uppercase'>{data.name}</h1>
    <EChartsReact option={options}/>
    
    </div>
  )
}

export default Graph