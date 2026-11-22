import { Link } from 'react-router-dom'

const VARIANTS = ['primary', 'secondary', 'ghost']

function Button({ children, variant = 'primary', href, to, type = 'button', className = '', ...rest }) {
  const safeVariant = VARIANTS.includes(variant) ? variant : 'primary'
  const classes = `button button--${safeVariant} ${className}`.trim()

  // `to` is an in-app route (React Router); `href` is a normal link or anchor.
  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  )
}

export default Button
