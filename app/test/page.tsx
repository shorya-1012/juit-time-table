"use client"
import React, { useState } from 'react'
import ToastDemo from './ToastDemo'
import { Button } from '@nextui-org/button';


const page = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='w-full h-full'>
            <Button onClick={()=> setOpen(true)}>open</Button>
            <ToastDemo open={open} setOpen={setOpen} />
        </div>
    )
}

export default page