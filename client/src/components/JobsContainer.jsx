import React from 'react'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';
import Wrapper from '../assets/wrappers/JobsContainer';

const JobsContainer = () => {
    const { data } = useAllJobsContext();
    const { jobs, totalJobs, numOfPages } = data;

    if (jobs.length === 0) {
        return <Wrapper>
            <h2>no jobs to display...</h2>
        </Wrapper>
    }
    return (
        <Wrapper>
            <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer