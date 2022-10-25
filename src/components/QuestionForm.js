import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ArrowBack } from '@mui/icons-material';
import deleteIcon from '../asserts/icons/delete.png'

const quizOptions = [
    { id: '0', value: 'option 1' },
    { id: '1', value: 'option 2' },
    { id: '2', value: 'option 3' },
    { id: '3', value: 'option 4' },
]

const QuestionForm = ({ data, setData, index, step, setStep, saved = null, createExam, updateExam, examID = null }) => {

    const [question, setQuestion] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: { id: 1, value: 'option 2' },
    })
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const handleImageSubmit = async (image) => {
        // console.log(image)
        if (!image) {
            alert("Please upload image")
            return;
        }
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        // const resData = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
        //     }/upload`, {
        //     data: data,
        //     skipAuthorization: true
        // })

        // const resData = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
        //     }/upload`, {
        //     headers: {
        //         Authorization: '',
        //         'Content-Type': null
        //     },
        //     data: {
        //         source: data
        //     }
        // });

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
            }/upload`, {
            method: "POST",
            body: data,
            mode: 'no-cors',
        })
        // console.log(resData)

        console.log(res)
        // setImageUrl(resData.data.url)
        // try {
        //     const res = await axios.post('http://localhost:5000/api/v1/image-upload', { imageURL })
        //     console.table(res.data.data)
        //     setImageData(res.data.data)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const deleteQuestion = (index) => {
        let newData = [...data]
        newData[0].questions = newData[0].questions.filter((item, i) => i !== index)
        setData(newData)
    }


    return (
        <div>
            <Toaster />
            <div className='flex flex-col items-center gap-y-2' style={{ margin: '0 20%' }}>
                {saved && saved.questions && saved.questions.length > 0 &&
                    <div className=''>
                        {
                            saved.questions.map((item, i) => {
                                return (
                                    <div className='relative w-full mb-4'>
                                        <img
                                            src={deleteIcon}
                                            alt="delete"
                                            className='h-6 absolute top-3 right-0 cursor-pointer'
                                            style={{ zIndex: 2 }}
                                            onClick={() => deleteQuestion(i)}
                                        />

                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`Question ${i + 1}`} variant="filled" size='small' value={item.question}
                                            onChange={e => {
                                                let newData = [...data]
                                                newData[0].questions[i].question = e.target.value
                                                setData(newData)
                                            }} />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 1`} variant="filled" size='small' value={item.option1}
                                            onChange={e => {
                                                let newData = [...data]
                                                newData[0].questions[i].option1 = e.target.value
                                                setData(newData)
                                            }} />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 2`} variant="filled" size='small' value={item.option2}
                                            onChange={e => {
                                                let newData = [...data]
                                                newData[0].questions[i].option2 = e.target.value
                                                setData(newData)
                                            }}
                                        />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 3`} variant="filled" size='small' value={item.option3}
                                            onChange={e => {
                                                let newData = [...data]
                                                newData[0].questions[i].option3 = e.target.value
                                                setData(newData)
                                            }} />
                                        <TextField type={'text'} fullWidth id="outlined-basic" label={`option 4`} variant="filled" size='small' value={item.option4}
                                            onChange={e => {
                                                let newData = [...data]
                                                newData[0].questions[i].option4 = e.target.value
                                                setData(newData)
                                            }} />
                                        <Autocomplete
                                            id="tags-standard"
                                            fullWidth
                                            options={quizOptions}
                                            getOptionLabel={(option) => option.value}
                                            defaultValue={[]}
                                            value={item.answer}
                                            onChange={(event, newValue) => {
                                                let newData = [...data]
                                                newData[0].questions[i].answer = newValue
                                                setData(newData)
                                            }}
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
                        defaultValue={[]}
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
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept='image/*'
                        className='my-4 '
                        onChange={(e) => handleImageSubmit(e.target.files[0])}
                    />
                    <Button onClick={() => {
                        let newInput = [...data];
                        newInput[index].questions.push({ question: question.question, option1: question.option1, option2: question.option2, option3: question.option3, option4: question.option4, answer: question.answer });
                        setData(newInput);
                        setQuestion({
                            question: '',
                            option1: '',
                            option2: '',
                            option3: '',
                            option4: '',
                            answer: { id: 1, value: 'option 2' }
                        })
                    }}>+ Add more | save</Button>
                </div>
            </div>
            <Button variant="contained" size='small' startIcon={<ArrowBack />} className='float-left relative top-2' onClick={() => setStep(step - 1)}>
                Previous
            </Button>
            <Button variant="contained" size='small' color='success' className='float-right relative top-2' onClick={() => {
                if (question.question) {
                    toast.error('Please save the question first')
                    return;
                }
                if (examID) updateExam();
                else createExam()
            }}>
                Submit
            </Button>
        </div>
    )
}

export default QuestionForm