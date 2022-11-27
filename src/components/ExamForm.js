import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import '../axios';
import QuestionForm from './QuestionForm';
import Navbar from './Navbar'
import toast, { Toaster } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const topicOptions = [
    { title: 'DSA', id: 1 },
    { title: 'DBMS', id: 2 },
    { title: 'CN', id: 3 },
    { title: 'OS', id: 4 },
    { title: 'CD', id: 5 },
]

const ExamForm = () => {

    const navigate = useNavigate();
    const { examID } = useParams();
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        name: '',
        description: '',
        duration: null,
        topics: [],
        questions: [],
    })

    const [data, setData] = useState([])

    const getTopics = topics => {
        let res = [];
        topics.forEach(topic => {
            let _id = 1;
            if (topic === 'DBMS') _id = 2;
            else if (topic === 'CN') _id = 3;
            else if (topic === 'OS') _id = 4;
            else if (topic === 'CD') _id = 5;
            res.push({ title: topic, id: _id })
        })
        return res
    }

    useEffect(() => {
        if (!examID) return;
        setIsLoading(true)
        axios.get(`/exam/${examID}`)
            .then(res => {
                let data = res.data.exam;
                let newData = [...data]
                newData[0].questions = data[0].questions.map((item, index) => {
                    return { question: item.question, option1: item.options[0], option2: item.options[1], option3: item.options[2], option4: item.options[3], answer: { value: item.answer, id: index }, image: item.image }
                })
                setData(data)
                setInput({
                    name: res.data.exam[0].name,
                    description: res.data.exam[0].description,
                    duration: res.data.exam[0].duration,
                    topics: getTopics(res.data.exam[0].topics),
                    questions: res.data.exam[0].questions
                })
                setIsLoading(false)
            })
            .catch(err => {
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }, [])

    const updateExam = () => {
        setIsLoading(true)
        let createdQuestions = []
        let createdTopics = []
        data[0].questions.map((item, i) => (
            createdQuestions.push({
                question: item.question,
                options: [item.option1, item.option2, item.option3, item.option4],
                answer: item.answer.value,
                image: item.image
            })
        ))
        data[0].topics.map((item, i) => (
            createdTopics.push(item.title)
        ))

        axios.patch(`/exam/${examID}`, {
            name: data[0].name,
            description: data[0].description,
            duration: data[0].duration,
            topics: [...createdTopics],
            questions: [...createdQuestions],
        }).then(res => {
            // console.log(res)
            setIsLoading(false)
            toast.success('Exam updated successfully')
            navigate('/dashboard')
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })
    }


    const createExam = () => {
        // console.log(data)
        setIsLoading(true)
        let createdQuestions = []
        let createdTopics = []
        data[0].questions.map((item, i) => (
            createdQuestions.push({
                question: item.question,
                options: [item.option1, item.option2, item.option3, item.option4],
                answer: item.answer.value,
                image: item.image
            })
        ))
        data[0].topics.map((item, i) => (
            createdTopics.push(item.title)
        ))

        axios.post(`/exam`, {
            name: data[0].name,
            description: data[0].description,
            duration: data[0].duration,
            topics: [...createdTopics],
            questions: [...createdQuestions]
        }).then(res => {
            setIsLoading(false)
            toast.success('Exam created successfully')
            navigate('/dashboard')
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })
    }

    return (
        <div className='bg-gray-100'>
            <Toaster />
            <Navbar
                btnText='Logout'
                path='/'
                isLoading={isLoading}
            />
            <div className='min-h-screen w-full flex flex-col items-center my-8'>
                <div className='dashboard-width bg-white flex flex-col items-center justify-center py-16 my-4 rounded-md'>
                    <form className='flex flex-col gap-y-8 w-full px-16'>
                        <h1 className='text-2xl font-semibold align-left'>Create Exam</h1>
                        {step === 0 &&
                            <div>
                                <div className='' style={{ margin: '0 20%' }}>
                                    <TextField required type={'text'} fullWidth id="outlined-basic" label="Name" variant="filled" size='small' value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={2}
                                        defaultValue={input.description}
                                        variant="filled"
                                        onChange={e => setInput({ ...input, description: e.target.value })}
                                        fullWidth
                                    />
                                    <TextField required type={'number'} InputLabelProps={{ shrink: true }} fullWidth id="outlined-basic" label="Duration (minutes)" variant="filled" size='small' value={input.duration} onChange={e => setInput({ ...input, duration: e.target.value })} />
                                    <Autocomplete
                                        multiple
                                        required
                                        id="tags-standard"
                                        options={topicOptions}
                                        getOptionLabel={(option) => option.title}
                                        defaultValue={[]}
                                        value={input.topics}
                                        onChange={(e, value) => setInput({ ...input, topics: value })}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                label="Topics"
                                                placeholder="DSA"
                                            />
                                        )}
                                    />
                                </div>
                                <Button variant="contained" size='small' endIcon={<ArrowForwardIcon />} className='float-right relative top-2'
                                    onClick={() => {
                                        setData([{ ...input }])
                                        setStep(step + 1);
                                    }}>
                                    Next
                                </Button>
                            </div>
                        }
                        {step === 1 &&
                            <>
                                {data.map((saved, index) => {
                                    return (
                                        <QuestionForm key={index} data={data} setData={setData} index={0} step={step} setStep={setStep} saved={saved} createExam={createExam} updateExam={updateExam} examID={examID} />
                                    )
                                })}
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExamForm