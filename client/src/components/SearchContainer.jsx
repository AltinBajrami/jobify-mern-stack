import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useAllJobsContext } from '../pages/AllJobs';
import { Form, Link, useSubmit } from 'react-router-dom';
import FormRow from '../components/FormRow'
import FormRowSelect from '../components/FormRowSelect'
import SubmitButton from '../components/SubmitButton'
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../server/utils/constants';

const SearchContainer = () => {
    const { searchValues } = useAllJobsContext();
    const submit = useSubmit();

    const debounce = (onChange) => {
        let timeout;
        return (e) => {
            const form = e.currentTarget.form;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onChange(form);
            }, 2000);
        };
    };

    return (
        <Wrapper>
            <Form className='form'>
                <h5 className="form-title">
                    search form
                </h5>
                <div className="form-center">
                    <FormRow type='search' name={'search'} defaultValue={searchValues?.search}
                        onChange={debounce((form) => submit(form))} />

                    <FormRowSelect labelText={'job status'} name='jobStatus' defaultValue={searchValues?.jobStatus}
                        list={['all', ...Object.values(JOB_STATUS)]} onChange={(e) => submit(e.currentTarget.form)} />

                    <FormRowSelect labelText={'job type'} name='jobType' defaultValue={searchValues?.jobType}
                        list={['all', ...Object.values(JOB_TYPE)]} onChange={(e) => submit(e.currentTarget.form)} />

                    <FormRowSelect labelText={'sort'} name='sort' defaultValue={searchValues?.sort}
                        list={[...Object.values(JOB_SORT_BY)]} onChange={(e) => submit(e.currentTarget.form)} />

                    <Link to={'/dashboard/all-jobs'} className='btn form-btn delete-btn'>Reset search value</Link>
                </div>
            </Form>
        </Wrapper>
    )
}

export default SearchContainer