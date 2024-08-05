import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer';
import AreaChart from './AreaChart'
import BarChart from './BarChart';

const ChartsContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(true);

    return (
        <Wrapper>
            <h4>Monthly applications </h4>
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'area' : 'bar'} chart
            </button>
            {barChart ? <AreaChart data={data} /> : <BarChart data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer