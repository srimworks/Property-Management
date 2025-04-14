import React from 'react'

const ServicesCards = ({heading,cards}) => {
  return (
    <div>
<h1>{heading}</h1>
<div>
    {cards.map((item, index) => {
          return (
            <div key={index} className="course-card-with-hr">
              <div className="course-card">
                <img src={item.img} alt="icon" />
                <h2>{item.title}</h2>
        
              </div>
              {/* {Cards[index+ 1] && <hr />} */}
            </div>
          );
        })}
    </div>

    </div>
  )
}

export default ServicesCards