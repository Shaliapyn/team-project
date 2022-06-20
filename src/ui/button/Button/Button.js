const Button = ({ className, onClick, children, ...props }) => {
  return (
    <button type="button" className={`btn rounded-pill ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button

//  default apperarance
// rounded-pill - button looks like a pill

// btn-block - make btn like a block

// btn-primary - blue
// btn-success - green
// btn-danger - red

// btn-lg - large button
// btn-sm - small button
//
//
//
//
//
//
//
