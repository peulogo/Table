import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../store/actions'

function PageItem({index, currentPage}) {
  const dispatch = useDispatch()
  const setPage = () => dispatch(setCurrentPage(index))
  return (
    <li className={index === currentPage ? 'active': ''} onClick={setPage}>
        {index}
    </li>
  )
}

export default PageItem