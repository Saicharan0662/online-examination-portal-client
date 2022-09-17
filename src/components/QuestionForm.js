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

const QuestionForm = ({ data, setData, index, step, setStep, saved = null, createQuestion }) => {

    const [question, setQuestion] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: { id: 1, value: 'option 2' },
    })

    return (
        <div>
            <div className='flex flex-col items-center gap-y-2' style={{ margin: '0 20%' }}>
                {saved && saved.questions && saved.questions.length > 0 &&
                    <div>
                        {
                            saved.questions.map((item, i) => {
                                return (
                                    <>
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`Question ${index + 1}`} variant="standard" size='small' value={item.question} disabled />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 1`} variant="filled" size='small' value={item.option1} disabled />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 2`} variant="filled" size='small' value={item.option2} disabled />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 3`} variant="filled" size='small' value={item.option3} disabled />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 4`} variant="filled" size='small' value={item.option4} disabled />
                                        <Autocomplete
                                            id="tags-standard"
                                            fullWidth
                                            options={quizOptions}
                                            getOptionLabel={(option) => option.value}
                                            defaultValue={[]}
                                            value={item.answer}
                                            disabled
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="correct answer"
                                                    placeholder="option 1"
                                                />
                                            )}
                                        />
                                    </>
                                )
                            })}
                    </div>}

                <div>
                    <TextField required type={'text'} fullWidth id="outlined-basic" label={`Question`} variant="standard" size='small' value={question.question} onChange={e => setQuestion({ ...question, question: e.target.value })} />
                    <TextField required type={'text'} fullWidth id="outlined-basic" label={`option 1`} variant="filled" size='small' value={question.option1} onChange={e => setQuestion({ ...question, option1: e.target.value })} />
                    <TextField required type={'text'} fullWidth id="outlined-basic" label={`option 2`} variant="filled" size='small' value={question.option2} onChange={e => setQuestion({ ...question, option2: e.target.value })} />
                    <TextField required type={'text'} fullWidth id="outlined-basic" label={`option 3`} variant="filled" size='small' value={question.option3} onChange={e => setQuestion({ ...question, option3: e.target.value })} />
                    <TextField required type={'text'} fullWidth id="outlined-basic" label={`option 4`} variant="filled" size='small' value={question.option4} onChange={e => setQuestion({ ...question, option4: e.target.value })} />
                    <Autocomplete
                        id="tags-standard"
                        required
                        fullWidth
                        options={quizOptions}
                        getOptionLabel={(option) => option.value}
                        defaultValue={null}
                        value={question.answer}
                        onChange={(e, value) => setQuestion({ ...question, answer: value })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="correct answer"
                                placeholder="option 1"
                            />
                        )}
                    />
                    <Button onClick={() => {
                        let newInput = [...data];
                        newInput[index].questions.push({ question: question.question, option1: question.option1, option2: question.option2, option3: question.option3, option4: question.option4, answer: question.answer });
                        setData(newInput);
                        console.log(newInput)
                        setQuestion({
                            question: '',
                            option1: '',
                            option2: '',
                            option3: '',
                            option4: '',
                            answer: { id: 1, value: 'option 2' }
                        })
                    }}>+ Add more</Button>
                </div>
            </div>
            <Button variant="contained" size='small' startIcon={<ArrowBack />} className='float-left relative top-2' onClick={() => setStep(step - 1)}>
                Previous
            </Button>
            <Button variant="contained" size='small' color='success' className='float-right relative top-2' onClick={() => {
                createQuestion()
            }}>
                Submit
            </Button>
        </div>
    )
}

export default QuestionForm