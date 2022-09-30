import React from 'react'

const Chip = ({ label, status = "not-attemted" }) => {
    return (
        <div className='px-4 py-4' style={status === "not-attemted" ? { backgroundColor: "gray" } : { backgroundColor: "lightgreen" }}>
            {label}
        </div>
    )
}

export default Chip