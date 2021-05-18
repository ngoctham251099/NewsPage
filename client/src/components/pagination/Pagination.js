import React from 'react'

const Pagination = ({totalPages, handleClick}) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1)
  console.log(pages)
  return (
    <div className="pagination">
      {
        pages.map(num => (
          <button className = "btnPagination"
            style={{
              padding: ".5rem .8rem",
              border: "1px solid #3498db",
              background: "#fff",
              borderRadius: "3px",
              marginRight: "1px",
              color: "#3498db"
            }}
            key={num}
            onClick={() => handleClick(num)}
          >{num}</button>
        ))
      }
    </div>
  )
}

export default Pagination
