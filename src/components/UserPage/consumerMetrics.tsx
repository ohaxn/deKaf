import React, { useState, useEffect } from 'react';
// @ts-ignore
import Vis from '../Vis.tsx';
// @ts-ignore
import Line from '../Line.tsx'

const ConsumerMetrics = () => {

    const [consumersData, setConsumerData] = useState(null);

    // const iterate = () => setIterator(iterator + 1);
    if (!consumersData) getConsumerData();

    function getConsumerData() {
        fetch('/kafka/requestData')
            .then(data => data.json())
            .then(responseData => {
                console.log('Consumer data:');
                console.log(responseData);
                setTimeout(() => {
                  getConsumerData();
                }, 5000);
                // if (topicsData.equals(topicData)) return;
                setConsumerData(responseData);
            })
            .catch(err => 'Failed to fetch message data!');
    }

    if (!consumersData) {
        return (
            <div className='metrics-container'>
              <div className='metric-panel'>
                <h3>Consumer metrics</h3>
                <div className='visualization-panel'>Loading consumer data...</div>
              </div>
            </div>
        )
    } else {

      const quantity = {};
      const size = {};

      for (let i = 0; i < consumersData.requestData.length; i += 1) {
        const message = consumersData.requestData[i];
        quantity[message.createdAt] = i;
        size[i] = message.size;
      }

      return (
        <div className='metrics-container'>
          <div className='metric-panel'>
            <h3>Consumer metrics</h3>
            <p>Total messages received by consumer: {consumersData.requestCounter}</p>
          </div>

        <div className='metric-panel'>
          <h3>Message quantity over time</h3>
          <Line dataa = {quantity} />
          <div className='visualization-panel'></div>
        </div>

          <div className='metric-panel'>
            <h3>Message size</h3>
            <Line dataa = {size} />
            <div className='visualization-panel'></div>
          </div>
        </div>
      )
    }
}

export default ConsumerMetrics;