interface CartoonButtonProps {
  label: string;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export function CartoonButton({
  label,
  color = 'bg-accent/30',
  hasHighlight = true,
  disabled = false,
  onClick,
  href,
}: CartoonButtonProps) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const buttonClasses = `relative h-8 md:h-9 px-3 md:px-4 text-[10px] md:text-xs rounded-full font-medium text-foreground border border-primary/40 transition-all duration-200 overflow-hidden group
    ${color}
    animate-pulse-glow
    hover:shadow-[0_2px_0_0_hsl(var(--primary)/0.5),0_0_30px_hsl(var(--primary)/0.4)]
    ${disabled ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0.5 active:shadow-[0_1px_0_0_hsl(var(--primary)/0.3)]'}`;

  const content = (
    <>
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      {hasHighlight && !disabled && (
        <div className="absolute top-1/2 left-[-100%] w-10 h-14 bg-white/25 -translate-y-1/2 rotate-12 transition-all duration-500 ease-in-out group-hover:left-[200%]" />
      )}
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center ${buttonClasses}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={buttonClasses}
    >
      {content}
    </button>
  );
}

export default CartoonButton;
