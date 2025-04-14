import React from 'react'


const WhyChooseCards = ({heading,cards}) => {
  return (
    <div>
    <h1>{heading}</h1>
    <div>
    {cards.map((item, index) => {
          return (
            <div key={index} className="course-card-with-hr">
              <div className="course-card">
                <img src={item.icon} alt="icon" />
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </div>
              {/* {Cards[index+ 1] && <hr />} */}
            </div>
          );
        })}
    </div>
    </div>
  )
}

export default WhyChooseCards