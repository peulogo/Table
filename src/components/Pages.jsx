import React from 'react'

function Pages(props) {
  function setPage(){
  props.setCurrentPage(props.item)
  }
  return (
    <li className={props.item === props.currentPage ? 'active': ''} onClick={() => setPage()}>
        {props.item}
    </li>
  )
}

export default Pages