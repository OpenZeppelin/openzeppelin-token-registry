import React from 'react'

export const CodeSnippet = ({ code }) => {
  return (
    <div className='code-snippet'>
      <pre>{code}</pre>
    </div>
  )
}
