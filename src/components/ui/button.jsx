import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Button = forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const base = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 shadow-lg hover:shadow-xl px-4 py-2',
    ghost: 'bg-transparent border border-border/50 hover:bg-accent/20 hover:border-accent text-foreground px-4 py-2',
    sm: 'px-3 py-1.5 text-xs',
  };
  const sizeClass = size === 'sm' ? variants.sm : 'px-4 py-2 h-10';
  const variantClass = variant === 'ghost' ? variants.ghost : variants.default;
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={cn(base, sizeClass, variantClass, className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
