import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, data, saveData, regenerate }) {
    // const [open, setOpen] = React.useState(open);

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            MCQ generated questions
                        </Typography>
                        <Button color="inherit" onClick={() => regenerate()}> Regenerate </Button>
                        <Button autoFocus color="inherit" onClick={() => saveData()}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {data && data.map((item, index) => {
                        const options = item.options.join(" / ")
                        return (
                            <div className='mx-4'>
                                <p className='font-bold'>Q{index + 1}.</p>
                                <div className='mx-4'>
                                    <p className='font-medium py-2'>{item.question}</p>
                                    <p>
                                        <span className='font-bold py-2'>Options: </span>
                                        <span className='font-normal text-gray'>{options}</span>
                                    </p>
                                    <p>
                                        <span className='font-bold'>Answer: </span>
                                        <span className='font-normal text-gray'>{item.answer}</span>
                                    </p>
                                </div>
                                <Divider />
                            </div>
                        )
                    })}
                </List>
            </Dialog>
        </div>
    );
}