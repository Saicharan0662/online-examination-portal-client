import React from 'react'
import { useParams } from 'react-router'

const ExamPannel = () => {

    const { examID } = useParams();
    console.log(examID)

    return (
        <div>ExamPannel</div>
    )
}

export default ExamPannel