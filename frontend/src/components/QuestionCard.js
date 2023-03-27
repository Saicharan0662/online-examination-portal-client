import React from 'react'
import { useNavigate } from 'react-router'
import PopUp from './PopUp';
import axios from 'axios';
import '../axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const QuestionCard = ({ question, response, setResponse, currQuestion, setCurrQuestion, setQuestionStatus, questionStatus, counts, open, setOpen, exam, examID }) => {

    const navigate = useNavigate();

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
        })
            .then(res => {
                // console.log(res)
                navigate(`/exam/result/${res.data.result._id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='mx-12 '>
            <PopUp
                open={open}
                setOpen={setOpen}
                handleSubmit={handleSubmit}
                title={"Are you sure you want to submit?"}
                description="You will not be able to change your response after submitting. However, you can submit multiple times."
                counts={counts}
            />
            <div className=' my-4 px-8 py-4 rounded-md text-white' style={{ background: 'rgb(30 58 138)' }}>
                <h3>{currQuestion + 1}. {question[currQuestion]?.question}</h3>
                {question[currQuestion]?.image &&
                    <div className='my-4'>
                        <img src={question[currQuestion]?.image} alt={'media'} style={{ width: 400, height: 200 }} />
                    </div>}
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
                                    if (temp[currQuestion] === 'option 1') {
                                        temp[currQuestion] = null;
                                        setResponse(temp)

                                        let status = [...questionStatus]
                                        status[currQuestion] = null
                                        setQuestionStatus(status);
                                        return;
                                    }
                                    temp[currQuestion] = 'option 1';
                                    setResponse(temp);

                                    let status = [...questionStatus]
                                    status[currQuestion] = 'answered'
                                    setQuestionStatus(status);
                                }}
                            />
                            <FormControlLabel
                                value="option2"
                                checked={response[currQuestion] && response[currQuestion] === 'option 2'}
                                control={<Radio />}
                                label={question[currQuestion].options[1]}
                                onClick={() => {
                                    let temp = [...response];
                                    if (temp[currQuestion] === 'option 2') {
                                        temp[currQuestion] = null;
                                        setResponse(temp)

                                        let status = [...questionStatus]
                                        status[currQuestion] = null
                                        setQuestionStatus(status);
                                        return;
                                    }

                                    temp = [...response];
                                    temp[currQuestion] = 'option 2';
                                    setResponse(temp);

                                    let status = [...questionStatus]
                                    status[currQuestion] = 'answered'
                                    setQuestionStatus(status);
                                }}
                            />
                            <FormControlLabel
                                value="option3"
                                checked={response[currQuestion] && response[currQuestion] === 'option 3'}
                                control={<Radio />}
                                label={question[currQuestion].options[2]}
                                onClick={() => {
                                    let temp = [...response];
                                    if (temp[currQuestion] === 'option 3') {
                                        temp[currQuestion] = null;
                                        setResponse(temp)

                                        let status = [...questionStatus]
                                        status[currQuestion] = null
                                        setQuestionStatus(status);
                                        return;
                                    }

                                    temp = [...response];
                                    temp[currQuestion] = 'option 3';
                                    setResponse(temp);

                                    let status = [...questionStatus]
                                    status[currQuestion] = 'answered'
                                    setQuestionStatus(status);
                                }}
                            />
                            <FormControlLabel
                                value="option4"
                                checked={response[currQuestion] && response[currQuestion] === 'option 4'}
                                control={<Radio />}
                                label={question[currQuestion].options[3]}
                                onClick={() => {
                                    let temp = [...response];
                                    if (temp[currQuestion] === 'option 4') {
                                        temp[currQuestion] = null;
                                        setResponse(temp)

                                        let status = [...questionStatus]
                                        status[currQuestion] = null
                                        setQuestionStatus(status);
                                        return;
                                    }

                                    temp = [...response];
                                    temp[currQuestion] = 'option 4';
                                    setResponse(temp);

                                    let status = [...questionStatus]
                                    status[currQuestion] = 'answered'
                                    setQuestionStatus(status);
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
                {(currQuestion !== question.length - 1) ?
                    <div>
                        <Button
                            variant='contained'
                            size='small'
                            color='secondary'
                            endIcon={<ArrowForward />}
                            onClick={() => {
                                let status = [...questionStatus]
                                status[currQuestion] = 'flagged'
                                setQuestionStatus(status);
                                setCurrQuestion(currQuestion + 1)
                            }}
                            style={{ marginRight: '10px' }}
                        >
                            Flag
                        </Button>
                        <Button
                            variant='contained'
                            size='small'
                            endIcon={<ArrowForward />}
                            onClick={() => {
                                setCurrQuestion(currQuestion + 1)
                            }}
                        >
                            Next
                        </Button>
                    </div> :
                    <Button
                        variant='contained'
                        size='small'
                        color='success'
                        // endIcon={<ArrowForward />}
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        Submit
                    </Button>}
            </div>
        </div >
    )
}

export default QuestionCard