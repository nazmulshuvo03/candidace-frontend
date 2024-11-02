import React from 'react'

const ErrorComponent = ({errorMessage}) => {
  return (
    <div className='custom_container my-10 text-base sm:text-lg text-red-500'>
        {errorMessage}
    </div>
  )
}

export default ErrorComponent