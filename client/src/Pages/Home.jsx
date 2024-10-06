import React from 'react'

const Home = () => {

    const handleSumbit = (e) =>
    {
        e.preventDefault();
    }

  return (
    <div className=''>
        <form onSubmit={handleSumbit}>
            <div className="flex flex-col items-center justify-center">
                <label className='font-semibold'>Type Your Message Here:</label>
                <input type="text" placeholder='Send Message...' name="" id="" className='border-[2px] border-black rounded-xl p-2 w-[50%]'/>
                <button className='font-semibold bg-blue-300 p-4 rounded-2xl px-10 m-1'>Send</button>
            </div>
        </form>
    </div>
  )
}

export default Home