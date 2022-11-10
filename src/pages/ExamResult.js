import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import '../axios';
import Navbar from '../components/Navbar';
import moment from 'moment/moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ExamResult = () => {

    const { resultID } = useParams();
    const [result, setResult] = useState(null);
    useEffect(() => {
        axios.get(`/result/${resultID}`)
            .then(res => {
                // console.log(res.data.result[0]);
                setResult(res.data.result[0]);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <Navbar
                btnText='Dashboard'
                path='/dashboard'
            />
            <div className='min-h-screen w-full flex flex-col items-center bg-gray-100'>
                {result &&
                    <div className='dashboard-width' >
                        <div>
                            <h1 className='text-lg font-semibold mt-6'>Exam Result</h1>
                            <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                            key={"Exam Name"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                                {"Exam Name"}
                                            </TableCell>
                                            <TableCell align="right">{result.examDetails[0].name}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Exam Description"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                                {"Exam Description"}
                                            </TableCell>
                                            <TableCell align="right">{result.examDetails[0].description}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Score"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                                {"Score"}
                                            </TableCell>
                                            <TableCell align="right">{`${result.score}%`}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={"Date"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                                {"Date"}
                                            </TableCell>
                                            <TableCell align="right">{`${moment(result.createdAt).format('MMM Do YY')}`}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold mt-6'>Your Response</h1>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SNo.</TableCell>
                                            <TableCell align="left">Question</TableCell>
                                            <TableCell align="right">Answer</TableCell>
                                            <TableCell align="right">Your Answer</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {result.examDetails[0].questions.map((row, index) => {
                                            if (!result.response[index]) return;
                                            return (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    style={{ backgroundColor: row.answer === (result.response[index] && result.response[index].givenAnswer) ? 'lightgreen' : '#ffcccb' }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.question}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.answer?.includes('1') && row.options[0]}
                                                        {row.answer?.includes('2') && row.options[1]}
                                                        {row.answer?.includes('3') && row.options[2]}
                                                        {row.answer?.includes('4') && row.options[3]}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {result.response[index].givenAnswer && result.response[index].givenAnswer.includes('2') && row.options[1]}
                                                        {result.response[index].givenAnswer && result.response[index].givenAnswer.includes('3') && row.options[2]}
                                                        {result.response[index].givenAnswer && result.response[index].givenAnswer.includes('4') && row.options[3]}
                                                        {result.response[index].givenAnswer && result.response[index].givenAnswer.includes('1') && row.options[0]}
                                                        {result.response[index].givenAnswer === null && 'Not Answered'}
                                                    </TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default ExamResult