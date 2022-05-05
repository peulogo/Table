import React from 'react'

function Table({id, title, body}) {
  return (
    <tr className='table__item'>
        <td className='id__name'>{id}</td>
        <td>{title}</td>
        <td>{body}</td>
    </tr>
  )
}

export default Table