import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import Button from '@mui/material/Button';
import axios from 'axios';
import '../axios';
import QuestionCard from '../components/QuestionCard';

const ExamPannel = () => {

    const navigate = useNavigate();
    const { examID } = useParams();
    const [exam, setExam] = useState([])
    const [response, setResponse] = useState([])

    useEffect(() => {
        axios.get(`/exam/get-exam-data/${examID}`)
            .then(res => {
                console.log(res.data.exam[0])
                setExam(res.data.exam[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = () => {
        let object = {};
        object.examID = examID;
        object.studentID = JSON.parse(localStorage.getItem('userData')).user.userID;
        object.score = 0;
        object.response = [];
        for (let i = 0; i < response.length; i++) {
            let temp = {};
            temp.question = exam.questions[i].question;
            temp.questionID = exam.questions[i]._id;
            temp.givenAnswer = response[i];
            object.response.push(temp);
        }

        axios.post(`/result/submit/${examID}`, {
            response: { ...object }
        })
            .then(res => {
                console.log(res)
                navigate(`/exam/result/${res.data.result._id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='min-h-screen w-full flex flex-col items-center'>
            <div className='flex w-full justify-between items-center px-8 bg-gray-200 ' style={{ height: "50px" }}>
                <h1 className='text-lg font-semibold' style={{ zIndex: 1 }}>{exam.name}</h1>
                <span className='text-lg font-normal bg-gray-300 px-6' style={{ height: "50px" }}>
                    <p className='relative top-2'>{exam.duration}</p>
                </span>
                <Button variant='contained' className='rounded-md' size='small' color='success' onClick={() => handleSubmit()}>Submit</Button>
            </div>
            <div className='min-h-screen w-1/4 absolute left-0 pt-16 px-2 bg-gray-200'>
                <h2>Questions</h2>

            </div>
            <div className='min-h-screen w-3/4 absolute right-0 top-16'>
                {exam.questions && <QuestionCard question={exam.questions} response={response} setResponse={setResponse} />}
            </div>
        </div>
    )
}

export default ExamPannel