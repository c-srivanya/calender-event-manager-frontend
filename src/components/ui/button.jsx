import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Button = forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const base = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-gradient-to-r from-blue-pastel-500 via-blue-pastel-400 to-primary text-primary-fg shadow-genz hover:shadow-genz hover:shadow-glow-blue font-poppins font-semibold rounded-genz px-6 py-3 text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 glassPulse',
    ghost: 'glass border border-accent-border/50 hover:bg-accent-bg hover:border-accent-border hover:shadow-genz-soft hover:shadow-glow-blue font-poppins rounded-genz transition-all duration-300 px-6 py-3 hover:text-blue-pastel-500 text-foreground',
    sm: 'px-4 py-2 text-sm h-10',
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
