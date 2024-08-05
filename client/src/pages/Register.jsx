import React from 'react'
import { FormRow, Logo, SubmitButton } from '../components'
import styled from 'styled-components'
import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success("User registered successfully")
    return redirect('/login');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const Register = () => {

  return <Wrapper>
    <Form className='form' method='post'>
      <Logo />
      <h4>Register</h4>
      <FormRow name={'name'} type={'text'} />
      <FormRow name={'lastName'} labelText={'lastName'} type={'text'} />
      <FormRow name={'location'} labelText={'location'} type={'text'} />
      <FormRow name={'email'} labelText={'email'} type={'email'} />
      <FormRow name={'password'} labelText={'password'} type={'password'} />
      <SubmitButton />
      <p>
        Already a member?
        <Link to={'/login'} className='member-btn'>Login</Link>
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
export default Register;