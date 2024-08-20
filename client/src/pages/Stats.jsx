import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils/customFetch'
import { ChartsContainer, StatsContainer } from '../components';
import { useQuery } from '@tanstack/react-query';

const statsQuery = {
    queryKey: ['stats'],
    queryFn: async () => {
        const response = await customFetch.get('/jobs/stats');
        return response.data;
    }
}

export const loader = (queryClient) => async () => {

    await queryClient.ensureQueryData(statsQuery);
    return '';
}

const Stats = () => {
    // const { defaultStats, monthlyApplications } = useLoaderData();
    const { data } = useQuery(statsQuery)
    console.log(data);
    const { defaultStats, monthlyApplications } = data
    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthlyApplications?.length > 1 && (
                <ChartsContainer data={monthlyApplications} />
            )}
        </>
    )
}

export default Stats