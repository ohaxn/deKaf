import React, { useState, useEffect } from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';
// @ts-ignore
import Vis from '../Vis.tsx';
// @ts-ignore
import Vis2 from '../Vis2.tsx';

const LeadMetrics = () => {

    const [topicData, setTopicData] = useState(null);

    // const iterate = () => setIterator(iterator + 1);
    if (!topicData) getTopicData();

    function getTopicData() {
        fetch('/kafka/topicData')
            .then(data => data.json())
            .then(topicsData => {
                console.log(topicsData);
                setTimeout(() => {
                    getTopicData();
                }, 5000);
                // if (topicsData.equals(topicData)) return;
                setTopicData(topicsData);
            })
            .catch(err => 'Failed to fetch TopicData!');
    }

    if (!topicData) {
        return (
            <div className='metrics-overview-box'>
                <h3>Key metrics at a glance</h3>
                <div>Loading Topics...</div>
            </div>
        )
    } else {
        const topicsArray = [];
        for (let index in topicData.topicData[0].listTopics) {
            topicsArray.push(
                <div className='single-topic'>
                    <p><strong>Topic:</strong> {topicData.partitionQuantity[index].name}</p>
                    <p><strong>Partitions:</strong> {topicData.partitionQuantity[index].partitionQuantity}</p>
                </div>
            );
        }
        return (
            <div id='lead-metrics-container'>
                <div className='metrics-overview-box'>
                    <h3>Topics and partitions</h3>
                    <hr />
                    <div>{topicsArray}</div>
                </div>

                <div className='metric-panel'>
                    <h3>Quantity of messages per partition</h3>
                    <div className='visualization-panel'><Vis2 dataa={topicData.quantityOfDataInEachPartition}/></div>
                </div>
            </div>
        )
    }
}

export default LeadMetrics;