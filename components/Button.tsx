import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'btn'
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  }[variant]

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClass} ${variantClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
