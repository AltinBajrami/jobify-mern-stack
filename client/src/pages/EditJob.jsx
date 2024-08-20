import React from 'react'
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitButton } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
    return {
        queryKey: ['job', id],
        queryFn: async () => {
            const { data } = await customFetch.get(`/jobs/${id}`);
            return data;
        }
    }
}
export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    try {
        await queryClient.ensureQueryData(singleJobQuery(id));
        return id;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect('../all-jobs')
    }
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch(`/jobs/${params.id}`, data);
        queryClient.invalidateQueries(['jobs'])
        toast.success('job updated successfully');
        return redirect('../all-jobs');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}
const EditJob = () => {
    const id = useLoaderData()
    const { job } = useQuery(singleJobQuery(id)).data;
    return (
        <Wrapper>
            <Form method='POST' className='form'>
                <h4 className="form-title">edit job</h4>
                <div className="form-center">
                    <FormRow type={'text'} name={'position'} defaultValue={job.position} />
                    <FormRow type={'text'} name={'company'} defaultValue={job.company} />
                    <FormRow type={'text'} name={'jobLocation'} defaultValue={job.jobLocation}
                        labelText={'job Location'} />
                    <FormRowSelect name={'jobStatus'} labelText={'job status'}
                        defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)} />
                    <FormRowSelect name={'jobType'} labelText={'job type'}
                        defaultValue={job.jobType} list={Object.values(JOB_TYPE)} />
                    <SubmitButton formBtn />
                </div>
            </Form>
        </Wrapper>
    )
}

export default EditJob