import React, { createContext, useContext } from 'react'
import { customFetch } from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';
import { useQuery } from '@tanstack/react-query';

const allJobsQuery = (params) => {
    const { search, jobType, jobStatus, sort, page } = params;
    return {
        queryKey: ['jobs', search ?? '', jobType ?? 'all', jobStatus ?? 'all', sort ?? 'newest', page ?? 1],
        queryFn: async () => {
            const { data } = await customFetch('/jobs', { params });
            console.log(data);

            return data;
        }
    }
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
}

const AllJobsContext = createContext();

const AllJobs = () => {
    const { searchValues } = useLoaderData()
    const { data } = useQuery(allJobsQuery(searchValues));
    return (
        <AllJobsContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    )
}

export const useAllJobsContext = () => useContext(AllJobsContext)


export default AllJobs