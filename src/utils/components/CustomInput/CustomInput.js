import React from 'react';

import './CustomInput.css';

export default function CustomInput({type, onChange, placeholder, maxLength}) {
    return(
        <input className='custom-input'
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}/>
    );
}