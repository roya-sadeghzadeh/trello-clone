'use client'
import React from 'react';
import styles from './styles.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  fullWidth?: boolean;
  variant?: 'default' | 'editable';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ fullWidth = false, variant = 'default', className = '', ...props }, ref) => {
    const inputClasses = [
      styles.input,
      styles[variant],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <input ref={ref} className={inputClasses} {...props} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'editable';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      variant = 'default',
      resize = 'vertical',
      className = '',
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaClasses = [
      styles.textarea,
      styles[variant],
      styles[resize],
      fullWidth && styles.fullWidth,
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <textarea ref={ref} className={textareaClasses} rows={rows} {...props} />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
