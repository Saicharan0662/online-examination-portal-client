import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import readXlsxFile from 'read-excel-file'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
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

    const navigate = useNavigate();

    const [question, setQuestion] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: { id: 1, value: 'option 2' },
    })
    const [isLoading, setIsLoading] = useState(false)
    // const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const handleImageSubmit = async (image) => {
        if (!image) {
            alert("Please upload image")
            return;
        }
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                }/upload`, {
                method: "POST",
                body: data,
            })
            const file = await res.json()
            // console.log(file.url)
            // setImage(image)
            setImageUrl(file.url)
        } catch (error) {
            console.log(error)
            // setImage(null)
        }
    }

    const updateImage = async (image, i) => {
        if (!image) {
            alert("Please upload image")
            return;
        }
        const datax = new FormData()
        datax.append("file", image)
        datax.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                }/upload`, {
                method: "POST",
                body: datax,
            })
            const file = await res.json()
            let newData = [...data]
            newData[0].questions[i].image = file.url
            setData(newData)
            console.log(file)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteQuestion = (index) => {
        let newData = [...data]
        newData[0].questions = newData[0].questions.filter((item, i) => i !== index)
        setData(newData)
    }

    const readFromExcelSheet = async (e) => {
        setIsLoading(true)
        let createdQuestions = []
        let createdTopics = []

        await readXlsxFile(e.target.files[0]).then((rows, index) => {
            for (let i = 1; i < rows.length; i++) {
                createdQuestions.push({
                    question: rows[i][0],
                    options: rows[i][1].split(','),
                    answer: rows[i][2],
                    image: rows[i][3]
                })
            }
        })
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
        <div>
            <Toaster />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            ></Backdrop>
            <div className='flex flex-col items-center gap-y-2' style={{ margin: '0 20%' }}>
                <div>
                    <div>
                        <p>Upload file</p>
                        <input type="file" onChange={(e) => readFromExcelSheet(e)} />
                    </div>
                    <h2 className='text-center my-6'>OR</h2>
                </div>
                {console.log(saved.questions)}
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
                                        {item.image ?
                                            <div className='relative'>
                                                <img src={item.image} width={100} height={100} />
                                                <img
                                                    src={deleteIcon}
                                                    alt="delete"
                                                    className='h-6 absolute top-3 left-24 cursor-pointer'
                                                    style={{ zIndex: 2 }}
                                                    width={20}
                                                    height={20}
                                                    onClick={() => {
                                                        let newData = [...data]
                                                        newData[0].questions[i].image = null
                                                        setData(newData)
                                                    }}
                                                />
                                            </div>
                                            : <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept='image/*'
                                                className='my-4 '
                                                value={item.image}
                                                onChange={(e) => {
                                                    updateImage(e.target.files[0], i)
                                                }}
                                            />
                                        }
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
                        newInput[index].questions.push({ question: question.question, option1: question.option1, option2: question.option2, option3: question.option3, option4: question.option4, answer: question.answer, image: imageUrl });
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