const VARIANTS = ['primary', 'secondary', 'ghost']

function Button({ children, variant = 'primary', href, type = 'button', className = '', ...rest }) {
  const safeVariant = VARIANTS.includes(variant) ? variant : 'primary'
  const classes = `button button--${safeVariant} ${className}`.trim()

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
