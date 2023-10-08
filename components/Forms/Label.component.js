import React from 'react'

const Label = ({ className, htmlFor, children }) => (
    <label htmlFor={htmlFor} className={className}>{children}</label>
)

export default Label