"use client"
import React, { useState } from 'react'
import ToastDemo from './ToastDemo'


const page = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className='w-full h-full'>
            <ToastDemo open={open} setOpen={setOpen} />
        </div>
    )
}

export default page