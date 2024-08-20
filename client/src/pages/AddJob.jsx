import React from 'react'
import { Form, redirect, useNavigation, useOutletContext } from 'react-router-dom'
import { FormRow, FormRowSelect, SubmitButton } from '../components'
// import Wrapper from '../assets/wrappers/DashboardFormPage'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import styled from 'styled-components'


export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/jobs', data);
        toast.success('Job added successfully')
        queryClient.invalidateQueries(['jobs'])
        return redirect('all-jobs');
    } catch (err) {
        toast.error(err?.response?.data?.msg);
        return err;
    }
}

const AddJob = () => {
    const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form className='form' method='post'>
                <h4 className="form-title">Add job</h4>
                <div className="form-center">
                    <FormRow type={'text'} name={'position'} />
                    <FormRow type={'text'} name={'company'} />
                    <FormRow type={'text'} name={'jobLocation'} labelText={'job location'} defaultValue={user.location} />
                    <FormRowSelect name={'jobStatus'} labelText={'job status'}
                        defaultValue={JOB_STATUS.PENDING} list={JOB_STATUS} />
                    <FormRowSelect name={'jobType'} labelText={'job type'}
                        defaultValue={JOB_TYPE.FULL_TIME} list={JOB_TYPE} />
                    <SubmitButton formBtn={true} />
                </div>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    border-radius: var(--border-radius);
    width: 100%;
    background-color: var(--background-secondary-color);
    padding: 3rem 2rem 4rem;
    .form-title{
        text-align: center;
        margin-bottom: 2rem;
    }
    .form{
        margin: 0;
        box-shadow: none;
        border-radius: 0;
        padding: 0;
        width: 100%;
        max-width: 100%;
    }
    .form-row{
        margin-bottom: 0;
    }
    .form-center{
        display: grid;
        row-gap: 1rem;
    }
    .form-btn{
        align-self: end;
        margin-top: 1rem;
        display: grid;
        place-items: center;
    }
    @media (min-width : 992px){
        .form-center{
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
            align-items: center;
        }
    }
    @media (min-width : 1200px){
        .form-center{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`
export default AddJob