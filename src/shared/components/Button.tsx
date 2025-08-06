import { forwardRef } from 'react';
import { Button as ChakraButton, Spinner } from '@chakra-ui/react';
import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import type { ButtonVariant, ButtonSize } from '../types';

interface ButtonProps extends Omit<ChakraButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantMapping: Record<ButtonVariant, ChakraButtonProps['variant']> = {
  primary: 'solid',
  secondary: 'outline',
  danger: 'solid',
  outline: 'outline',
};

const colorSchemeMapping: Record<ButtonVariant, string> = {
  primary: 'primary',
  secondary: 'gray',
  danger: 'red',
  outline: 'gray',
};

const sizeMapping: Record<ButtonSize, ChakraButtonProps['size']> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <ChakraButton
        ref={ref}
        variant={variantMapping[variant]}
        colorScheme={colorSchemeMapping[variant]}
        size={sizeMapping[size]}
        loading={loading}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner size="sm" mr={2} />}
        {children}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
