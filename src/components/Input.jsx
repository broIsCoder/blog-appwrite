import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = "px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    ...props },
    ref) {
    const id = useId();
    
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id}
                    className='inline-block mb-1 pl-1'>
                    {label}
                </label>
            )}

            <input
                className={`rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 duration-200 border border-gray-200 w-full ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
})


export default Input