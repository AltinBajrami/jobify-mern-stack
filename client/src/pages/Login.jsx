import React from 'react'
import { FormRow, Logo, SubmitButton } from '../components'
import styled from 'styled-components'
import { Form, Link, redirect, useActionData, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'


export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: '' };
    if (data.password.length < 3) {
        errors.msg = 'password is to short';
        return errors;
    }
    try {
        await customFetch.post('/auth/login', data);
        queryClient.invalidateQueries();
        toast.success('Successfully logged in');
        return redirect('/dashboard')
    } catch (error) {
        errors.msg = error?.response?.data?.msg;
        return errors;
    }
}

const Login = () => {
    const data = useActionData();
    const navigate = useNavigate();

    const loginDemoUser = async () => {
        const data = {
            email: 'test@test.com',
            password: '12345678'
        };
        try {
            await customFetch.post('/auth/login', data);
            toast.success('Take a test drive');
            navigate('/dashboard')
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    return <Wrapper>
        <Form method="post" className='form'>
            <Logo />
            <h4>Login</h4>
            {data?.msg && <p style={{ color: 'red' }}>{data.msg}</p>}
            <FormRow name={'email'} labelText={'email'} type={'email'} />
            <FormRow name={'password'} labelText={'password'} type={'password'} />
            <SubmitButton />
            <button type='button' className='btn btn-block' onClick={loginDemoUser}>explore the app</button>
            <p>
                Don't have an account? <Link className='member-btn' to={"/register"}>Register</Link>
            </p>
        </Form>
    </Wrapper>
}
const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    align-items: center;
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    .form {
        max-width: 400px;
        border-top: 5px solid var(--primary-500);
    }
    h4 {
        text-align: center;
        margin-bottom: 1.38rem;
    }
    p {
        margin-top: 1rem;
        text-align: center;
        line-height: 1.5;
    }
    .btn {
        margin-top: 1rem;
    }
    .member-btn {
        color: var(--primary-500);
        letter-spacing: var(--letter-spacing);
        margin-left: 0.35rem;
    }
`
export default Login