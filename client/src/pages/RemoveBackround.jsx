import React from 'react'
import { Eraser} from 'lucide-react'
import { useState } from 'react'
function RemoveBackround() {
  
  const [input, setInput] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Eraser className='w-6 text-[#FF4938]'/>
          <h1 className='text-xl font-semibold'>Backround Removal</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input 
          type="file" 
          accept='image/*'
          onChange={(e)=>setInput(e.target.files[0])} 
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' 
          required 
        />

        <p className='text-sm text-gray-500 font-light mt-1'>supports JPG, PNG, and other image formats</p>

        
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          <Eraser className='w-5'/>
          Remove Backround
        </button>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[24rem]  '>
        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#FF4938]'/>
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Eraser className='w-9 h-9 '/>
            <p>upload an iamge & click "Remove Backround" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackround