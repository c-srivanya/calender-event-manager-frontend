import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-14 w-full glass rounded-3xl border border-glass-border bg-glass px-4 py-3 text-lg ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-pastel-400 focus-visible:ring-offset-2 focus-visible:border-blue-pastel-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-sm hover:shadow-genz-soft hover:border-blue-pastel-300 font-poppins",
        className
      )}
      ref={ref}
      {...props}
    />
  );

});
Input.displayName = 'Input';

export { Input };

