import React from 'react'

const BottomContent = ({title,content,btnText}) => {
  return (
    <div className='desc-main-block'>
    <h1 className='desc-heading'>{title}</h1>
    <p className='desc-content'>{content}</p>

    {btnText.length>0 && <button className='desc-button'>{btnText}</button>}
 
</div>
  )
}

export default BottomContent