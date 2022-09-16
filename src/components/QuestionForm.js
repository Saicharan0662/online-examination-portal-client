import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const QuestionForm = ({ input, setInput, index = 1 }) => {

    const [question, setQuestion] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: ''
    })

    return (
        <div>
            <TextField type={'text'} fullWidth id="outlined-basic" label={`Question ${index}`} variant="standard" size='small' value={question.question} onChange={e => setQuestion({ ...input, question: e.target.value })} />
            <TextField type={'text'} fullWidth id="outlined-basic" label={`Option 1`} variant="standard" size='small' value={question.options[0]} onChange={e => setQuestion({ ...input, [options[0]]: e.target.value })} />
            <TextField type={'text'} fullWidth id="outlined-basic" label={`Option 2`} variant="standard" size='small' value={question.options[1]} onChange={e => setQuestion({ ...input, [options[1]]: e.target.value })} />
            <TextField type={'text'} fullWidth id="outlined-basic" label={`Option 3`} variant="standard" size='small' value={question.options[2]} onChange={e => setQuestion({ ...input, [options[2]]: e.target.value })} />
            <TextField type={'text'} fullWidth id="outlined-basic" label={`Option 4`} variant="standard" size='small' value={question.options[3]} onChange={e => setQuestion({ ...input, [options[3]]: e.target.value })} />
        </div>
    )
}

export default QuestionForm