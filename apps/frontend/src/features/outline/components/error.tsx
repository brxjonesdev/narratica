
import React from 'react'
export default function OutlineError({ message }: { message: string }) {
  

    return (
        <div className="flex flex-col items-center justify-center h-full gap-2 bg-red-300/10 m-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-400 ">Something went wrong getting your outline...</h2>          
            <div className='flex gap-2 items-center justify-between'>
                <p className="text-lg">Error: <span className='text-gray-400'>{message}</span></p>      
            </div>
        `</div>
    );
}
