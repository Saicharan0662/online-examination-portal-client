import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios';
import '../axios';
import moment from 'moment/moment';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar'
import Tags from '../components/Tags';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SingleExamResults = () => {

    const { examID, studentID } = useParams();
    const [results, setResults] = useState([]);
    const [examDetails, setExamDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/result/student/${studentID}/exam/${examID}`)
            .then(res => {
                setResults(res?.data?.results)
                setExamDetails(res?.data?.results[0]?.examDetails)
                setIsLoading(false)
            })
            .catch(err => {
                toast.error(err.response.data.message)
                setIsLoading(false)
            })
    }, [])


    return (
        <div>
            <Navbar
                btnText='Logout'
                path='/'
                isLoading={isLoading}
            />
            <div className='min-h-screen w-full flex flex-col px-14 py-8 bg-gray-100'>
                <Toaster />
                <div className='dashboard-width' >
                    <div>
                        <h1 className='text-xl font-bold'>Exam Result</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        key={'name'}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>
                                            {'Name'}
                                        </TableCell>
                                        <TableCell align="right">{examDetails?.name}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={'description'}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>
                                            {'Description'}
                                        </TableCell>
                                        <TableCell align="right">{examDetails?.description}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={'attempts'}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>
                                            {'Total Attempts'}
                                        </TableCell>
                                        <TableCell align="right">{results?.length}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={'topics'}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontWeight: 600 }}>
                                            {'Topic'}
                                        </TableCell>
                                        <TableCell align="right">
                                            {examDetails && examDetails.topics !== undefined && examDetails.topics.map((topic, index) => {
                                                return (
                                                    <span key={index} className='mr-1'>
                                                        <Tags tag={topic} />
                                                    </span>
                                                )
                                            })}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="my-6">
                        <h3 className='text-lg font-semibold my-3'>Your Attempts</h3>
                        <div className='flex gap-y-4 justify-around flex-wrap'>
                            {results.map((result, index) => {
                                return (
                                    <span
                                        className='px-4 py-2 mx-4 bg-white rounded-md cursor-pointer'
                                        key={index}
                                        onClick={() => {
                                            navigate(`/exam/result/${result._id}`)
                                        }}
                                    >
                                        <p className='text-sm'>Attempted on: {moment(result.createdAt).format('MMM Do YY')}</p>
                                        <p className='font-medium'>{result.score}%</p>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleExamResults