import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styled from 'styled-components';
day.extend(advancedFormat);

const Job = ({
    _id, position, company, jobLocation, jobTitle, createdAt, jobStatus, jobType
}) => {
    const date = day(createdAt).format('MMM Do,YYYY')
    return (
        <Wrapper1>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${jobStatus}`}>
                        {jobStatus}
                    </div>
                </div>
                <footer className="actions">
                    <Link to={`../edit-job/${_id}`} className='btn edit-btn'>Edit</Link>
                    <Form method='post' action={`../delete-job/${_id}`}>
                        <button type='submit' className='btn delete-btn'>Delete</button>
                    </Form>
                </footer>
            </div>
        </Wrapper1>
    )
}

const Wrapper1 = styled.article`
    background-color: var( --dark-mode-bg-secondary-color);
    header{
        padding: 1.5rem;
        border-bottom: 2px solid white;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: center;
    }
    .main-icon{
        background-color: var(--primary-500);
        width: 4rem;
        height: 4rem;
        font-size:1.5rem;
        display: grid;
        place-items: center;
        text-transform:capitalize;
        border-radius: var(--border-radius);
    }
    .info{
        text-transform:capitalize;
        letter-spacing: var(--letter-spacing);
        h5{
            margin-bottom: 0.5rem;
        }
        p{
            color: var(--grey-300);
        }
    }
    .content{
        padding: 2rem 1.5rem;
    }
    .content-center{
        display: grid;
        gap: 1.5rem;
        grid-template-columns: 1fr 1fr;
        align-items: center;
    }
    .status{
        justify-self: start;
        padding: 0.5rem 0.75rem;
        border-radius: var(--border-radius);
        text-transform: capitalize;
    }
    .actions{
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
    }
`
export default Job