

function Card({children, reverse}) {
  // return (
  //   <div className={`card ${reverse && 'reverse'}`}>
  //     {children}
  //   </div>
  // )

  return (
    <div className="card" style ={{
      backgroundColor: reverse? 'black' : '#ffffff',
      color: reverse? '#ffffff' : 'black'
    }}>{children}</div>
  )
}

Card.defaultProps = {
  reverse: false
}

export default Card