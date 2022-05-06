import React from 'react'

function PageItem({index, setCurrentPage, currentPage}) {
  const setPage = () => setCurrentPage(index)
  return (
    <li className={index === currentPage ? 'active': ''} onClick={setPage}>
        {index}
    </li>
  )
}

export default PageItem