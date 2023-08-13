import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-center text-red-500 bg-slate-200 p-2' >
      <img
          className='h-15 w-40'
      alt="Picture of the author"
       src="https://uploads-ssl.webflow.com/640719dd9c07e6536feb9e93/6411a3a1a733b0d37af827b7_PNG_PYOR%20LOGO%20Black%20Bean%20with%20tagline%20%201-p-500.png"/>
    </div>
  )
}

export default Navbar