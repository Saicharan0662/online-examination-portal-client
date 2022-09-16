import React, { useState } from 'react'
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
    { title: 'C5', id: 1 },
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
                                    <TextField type={'text'} fullWidth id="outlined-basic" label="Name" variant="standard" size='small' value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} />
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
                                    <TextField type={'number'} fullWidth id="outlined-basic" label="Duration (minutes)" variant="standard" size='small' value={input.duration} onChange={e => setInput({ ...input, duration: e.target.value })} />
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={topicOptions}
                                        getOptionLabel={(option) => option.title}
                                        defaultValue={[]}
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
                                <Button variant="contained" size='small' endIcon={<ArrowForwardIcon />} className='float-right relative top-2' onClick={() => setStep(step + 1)}>
                                    Next
                                </Button>
                            </div>
                        }
                        {step === 1 &&
                            <QuestionForm input={input} setInput={setInput} index={0} step={step} setStep={setStep} />
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExamForm