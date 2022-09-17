import React, { useState } from 'react'
import axios from 'axios';
import '../axios';
import QuestionForm from './QuestionForm';
import Navbar from './Navbar'
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

    const [step, setStep] = useState(0);
    const [input, setInput] = useState({
        name: '',
        description: '',
        duration: null,
        topics: [],
        questions: []
    })

    const [data, setData] = useState([])

    const createQuestion = () => {
        console.log(data)
        let createdQuestions = []
        let createdTopics = []
        data[0].questions.map((item, i) => {
            createdQuestions.push({
                question: item.question,
                options: [item.option1, item.option2, item.option3, item.option4],
                answer: item.answer.value
            })
        })
        data[0].topics.map((item, i) => {
            createdTopics.push(item.title)
        })
        axios.post(`/exam`, {
            name: data[0].name,
            description: data[0].description,
            duration: data[0].duration,
            topics: [...createdTopics],
            questions: [...createdQuestions]
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <div className='bg-gray-100'>
            <Navbar />
            <div className='min-h-screen w-full flex flex-col items-center my-8'>
                <div className='dashboard-width bg-white flex flex-col items-center justify-center py-16 my-4 rounded-md'>
                    <form className='flex flex-col gap-y-8 w-full px-16'>
                        <h1 className='text-2xl font-semibold align-left'>Create Exam</h1>
                        {step === 0 &&
                            <div>
                                <div className='' style={{ margin: '0 20%' }}>
                                    <TextField required type={'text'} fullWidth id="outlined-basic" label="Name" variant="standard" size='small' value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={2}
                                        defaultValue={input.description}
                                        variant="standard"
                                        onChange={e => setInput({ ...input, description: e.target.value })}
                                        fullWidth
                                    />
                                    <TextField required type={'number'} fullWidth id="outlined-basic" label="Duration (minutes)" variant="standard" size='small' value={input.duration} onChange={e => setInput({ ...input, duration: e.target.value })} />
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
                                                variant="standard"
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
                                        <QuestionForm key={index} data={data} setData={setData} index={0} step={step} setStep={setStep} saved={saved} createQuestion={createQuestion} />
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