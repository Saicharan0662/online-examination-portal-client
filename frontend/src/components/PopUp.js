import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { Chip } from '@mui/material';

const PopUp = ({ open, setOpen, handleSubmit, title = "title", description = "description", counts }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                    <div className='flex justify-between mt-4'>
                        <span className='flex items-center'>
                            <Chip
                                label={counts.rest}
                                color='primary'
                                style={{ margin: '7px', width: '40px', aspectRatio: '1' }}
                            />
                            <span>Not answered</span>
                        </span>
                        <span className='flex items-center'>
                            <Chip
                                label={counts.flagged}
                                color='secondary'
                                style={{ margin: '7px', width: '40px', aspectRatio: '1' }}
                            />
                            <span>Flagged</span>
                        </span>
                        <span className='flex items-center'>
                            <Chip
                                label={counts.answered}
                                color='success'
                                style={{ margin: '7px', width: '40px', aspectRatio: '1' }}
                            />
                            <span>Answered</span>
                        </span>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PopUp