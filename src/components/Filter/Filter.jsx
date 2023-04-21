import React, { useState } from 'react'
import "./Filter.css"
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const Filter = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [statusButton, setStatusButton] = useState(props.items[0]);

  function handleClick(event) {
    const { name } = event.target;
    let newStatusButton = name;
    setStatusButton(newStatusButton);
    setIsClicked(!isClicked);
  }

  function handleFilter(event) {
    handleClick(event);
    const { name } = event.target;
    props.onFilter(name);
  }



  return (
    <div className='filter'>
      <div className='dropdown'>
        <button name={statusButton} style={{ backgroundColor: statusButton.background }} onClick={handleClick} className='filter-btn'>{statusButton} {isClicked === true ? <RxCaretUp /> : <RxCaretDown />}</button>

        {/* dropdown content */}
        <div className='dropdown-content' style={{ display: isClicked === true && "block" }}>
          {props.items.map((item, itemIndex) => {
            return <button id={itemIndex} name={item} onClick={handleFilter}>{item}</button>
          })}
        </div>
      </div>
    </div>
  )
}

export default Filter