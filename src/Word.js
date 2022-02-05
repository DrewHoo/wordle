import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import { LetterField } from './LetterField';

export const Word = React.forwardRef((props, ref) => {
    console.log(props)
    return <Input inputRef={ref} inputProps={{...props, maxLength: 5, 'fontSize': '5rem',}} sx={{ 
        // width: '2em',
        fontSize: '3.8rem',
        letterSpacing: '1.25rem',
        lineHeight: '1.75rem',
        // m: 1, 
        width: '18.5rem', 
        height: '6rem' 
    }} />
})


