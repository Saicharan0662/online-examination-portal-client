import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios';
import '../axios';
import QuestionCard from '../components/QuestionCard';
import CountDownTimer from '../components/CountDownTimer';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ExamPannel = () => {

    const { examID } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState([])
    const [response, setResponse] = useState([])
    const [currQuestion, setCurrQuestion] = useState(0);
    const [questionStatus, setQuestionStatus] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [counts, setCounts] = useState({ answered: 0, flagged: 0, rest: 0 })

    useEffect(() => {
        setLoading(true)
        axios.get(`/exam/get-exam-data/${examID}`)
            .then(res => {
                // console.log(res.data.exam[0])
                const initialResponse = new Array(res.data.exam[0].questions.length).fill(null)
                setResponse(initialResponse)
                setExam(res.data.exam[0])
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    useEffect(() => {

        if (!exam || !exam.questions) return;

        let c1 = 0, c2 = 0;
        const items = [...questionStatus]
        for (const item of items) {
            if (item === 'answered') c1++;
            else c2++;
        }

        setCounts({ answered: c1, flagged: c2, rest: exam.questions.length - c1 - c2 })

    }, [questionStatus])

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
            temp.givenAnswer = response[i] ? response[i] : null;
            object.response.push(temp);
        }

        axios.post(`/result/submit/${examID}`, {
            response: { ...object }
        }).then(res => {
            navigate(`/exam/result/${res.data.result._id}`)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='min-h-screen w-full flex flex-col items-center'>
                <div className='flex w-full justify-between items-center px-8 dark-blue-bg' style={{ height: "50px" }}>
                    <h1 className='text-lg font-semibold' style={{ zIndex: 1 }}>{exam.name}</h1>
                    <span className='text-lg font-normal px-6 bg-blue-900' style={{ height: "50px" }}>
                        <p className='relative top-2'>
                            {exam.duration !== undefined &&
                                <CountDownTimer
                                    minutes={exam.duration}
                                    handleSubmit={handleSubmit}
                                />}
                        </p>
                    </span>
                    <Button variant='outlined' className='rounded-md' size='small' color='success' style={{ color: 'lightgreen' }} onClick={() => setOpen(true)}>Submit</Button>
                </div>
                <div className=' w-1/5 absolute left-0 bottom-0 pt-16 px-2 dark-blue-bg flex flex-col justify-between' style={{ height: '99.7vh' }}>
                    <div>
                        <h2 className='text-md font-medium pt-6 -mt-4' style={{ borderTop: "1px solid black" }}>Questions Status</h2>
                        <div>
                            {exam.questions && exam.questions.map((item, index) => {
                                return (
                                    <Chip
                                        label={index + 1}
                                        color={questionStatus[index] ?
                                            (questionStatus[index] === 'answered' ? 'success' : 'secondary')
                                            : 'primary'}
                                        style={{ cursor: 'pointer', margin: '7px', width: '50px', aspectRatio: '1' }}
                                        clickable
                                        onClick={() => {
                                            // let temp = [...questionStatus];
                                            // temp[currQuestion] = "visited";
                                            // setQuestionStatus(temp);
                                            setCurrQuestion(index)
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 className='text-md font-medium pt-6 -mt-4' style={{ borderTop: "1px solid black" }}>Instructions</h2>
                        <div>
                            <Chip
                                label={'no.'}
                                color='primary'
                                style={{ margin: '7px', width: '50px', aspectRatio: '1' }}
                            />
                            <span>Not answered</span>
                        </div>
                        <div>
                            <Chip
                                label={'no.'}
                                color='secondary'
                                style={{ margin: '7px', width: '50px', aspectRatio: '1' }}
                            />
                            <span>Flagged</span>
                        </div>
                        <div>
                            <Chip
                                label={'no.'}
                                color='success'
                                style={{ margin: '7px', width: '50px', aspectRatio: '1' }}
                            />
                            <span>Answered</span>
                        </div>
                    </div>
                </div>
                <div className=' w-3/4 absolute right-0 top-16 flex flex-col justify-between' style={{ height: '91vh' }}>
                    <div>
                        {exam.questions &&
                            <QuestionCard
                                question={exam.questions}
                                response={response}
                                setResponse={setResponse}
                                setCurrQuestion={setCurrQuestion}
                                currQuestion={currQuestion}
                                setQuestionStatus={setQuestionStatus}
                                questionStatus={questionStatus}
                                counts={counts}
                                open={open}
                                setOpen={setOpen}
                                exam={exam}
                                examID={examID}
                            />}
                    </div>
                </div>
                <div className='w-4/5 absolute right-0 bottom-0 flex w-full justify-between px-2 dark-blue-bg'>
                    <div>
                        <Chip
                            label={counts.rest}
                            color='primary'
                            style={{ margin: '7px', width: '50px', aspectRatio: '1' }}
                        />
                        <span>Not answered</span>
                    </div>
                    <div>
                        <Chip
                            label={counts.answered}
                            color='success'
                            style={{ margin: '7px', width: '50px', aspectRatio: '1' }}
                        />
                        <span>Answered</span>
                    </div>
                    <div>
                        <Chip
                            label={counts.flagged}
                            color='secondary'
                            style={{ margin: '7px', width: '50px', aspectRatio: '1' }}
                        />
                        <span>Flagged</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamPannel