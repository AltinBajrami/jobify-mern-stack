import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect, useOutletContext } from 'react-router-dom'
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';
import { SubmitButton } from '../components';

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 500000) {
        toast.error('Image size to large');
        return null;
    }

    try {
        await customFetch.patch('/users/update-user', formData);
        queryClient.invalidateQueries(['currentUser']);
        toast.success('Profile updated successfully');
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    return null;
}
const Profile = () => {
    const { user } = useOutletContext();
    const { name, email, location, lastName } = user;

    return (
        <Wrapper>
            <Form method='post' className='form' encType='multipart/form-data'>
                <h4 className="form-title">profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">Select an image(max 0.5mb)</label>
                        <input type="file" name="avatar" id="avatar" className='form-input' accept='image/*' />
                    </div>
                    <FormRow type={'text'} name={'name'} defaultValue={name} />
                    <FormRow type={'text'} name={'lastName'} defaultValue={lastName} />
                    <FormRow type={'email'} name={'email'} defaultValue={email} />
                    <FormRow type={'text'} name={'location'} defaultValue={location} />
                    <SubmitButton formBtn={true} />
                </div>
            </Form>
        </Wrapper>
    )
}

export default Profile