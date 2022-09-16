import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ArrowBack } from '@mui/icons-material';

const quizOptions = [
    { id: 0, value: 'option 1' },
    { id: 1, value: 'option 2' },
    { id: 2, value: 'option 3' },
    { id: 3, value: 'option 4' },
]

const QuestionForm = ({ input, setInput, index, step, setStep }) => {

    const [question, setQuestion] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
    })

    return (
        <div>
            <div className='flex flex-col items-center gap-y-2' style={{ margin: '0 20%' }}>
                <TextField type={'text'} fullWidth id="outlined-basic" label={`Question ${index + 1}`} variant="standard" size='small' value={question.question} onChange={e => setQuestion({ ...input, question: e.target.value })} />
                <TextField type={'text'} fullWidth id="outlined-basic" label={`option 1`} variant="filled" size='small' value={question.option1} onChange={e => setQuestion({ ...input, option1: e.target.value })} />
                <TextField type={'text'} fullWidth id="outlined-basic" label={`option 2`} variant="filled" size='small' value={question.option2} onChange={e => setQuestion({ ...input, option2: e.target.value })} />
                <TextField type={'text'} fullWidth id="outlined-basic" label={`option 3`} variant="filled" size='small' value={question.option3} onChange={e => setQuestion({ ...input, option3: e.target.value })} />
                <TextField type={'text'} fullWidth id="outlined-basic" label={`option 4`} variant="filled" size='small' value={question.option4} onChange={e => setQuestion({ ...input, option4: e.target.value })} />
                <Autocomplete
                    id="tags-standard"
                    fullWidth
                    options={quizOptions}
                    getOptionLabel={(option) => option.value}
                    defaultValue={null}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="correct answer"
                            placeholder="option 1"
                        />
                    )}
                />
            </div>
            <Button variant="contained" size='small' startIcon={<ArrowBack />} className='float-left relative top-2' onClick={() => setStep(step - 1)}>
                Previous
            </Button>
            <Button variant="contained" size='small' color='success' className='float-right relative top-2' onClick={() => { }}>
                Submit
            </Button>
        </div>
    )
}

export default QuestionForm