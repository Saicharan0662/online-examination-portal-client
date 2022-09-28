import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const QuestionCard = ({ question, response, setResponse }) => {

    const [currQuestion, setCurrQuestion] = useState(0);
    // console.log(question);

    return (
        <div className='mx-12'>
            <div className=' my-4 px-8 py-4 rounded-md' style={{ background: '	#FAF9F6' }}>
                <h3>{currQuestion + 1}. {question[currQuestion]?.question}</h3>
                <div className='my-8'>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="option1"
                                checked={response[currQuestion] && response[currQuestion] === 'option 1'}
                                control={<Radio />}
                                label={question[currQuestion].options[0]}
                                onClick={() => {
                                    let temp = [...response];
                                    temp[currQuestion] = 'option 1';
                                    setResponse(temp);
                                }}
                            />
                            <FormControlLabel
                                value="option2"
                                checked={response[currQuestion] && response[currQuestion] === 'option 2'}
                                control={<Radio />}
                                label={question[currQuestion].options[1]}
                                onClick={() => {
                                    let temp = [...response];
                                    temp[currQuestion] = 'option 2';
                                    setResponse(temp);
                                }}
                            />
                            <FormControlLabel
                                value="option3"
                                checked={response[currQuestion] && response[currQuestion] === 'option 3'}
                                control={<Radio />}
                                label={question[currQuestion].options[2]}
                                onClick={() => {
                                    let temp = [...response];
                                    temp[currQuestion] = 'option 3';
                                    setResponse(temp);
                                }}
                            />
                            <FormControlLabel
                                value="option4"
                                checked={response[currQuestion] && response[currQuestion] === 'option 4'}
                                control={<Radio />}
                                label={question[currQuestion].options[3]}
                                onClick={() => {
                                    let temp = [...response];
                                    temp[currQuestion] = 'option 4';
                                    setResponse(temp);
                                }}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className='w-full flex justify-between'>
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<ArrowBack />}
                    disabled={currQuestion === 0}
                    onClick={() => setCurrQuestion(currQuestion - 1)}
                >
                    Previous
                </Button>
                <Button
                    variant='contained'
                    size='small'
                    endIcon={<ArrowForward />}
                    disabled={currQuestion === question.length - 1}
                    onClick={() => setCurrQuestion(currQuestion + 1)}
                >
                    Next
                </Button>
            </div>
        </div >
    )
}

export default QuestionCard