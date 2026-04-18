interface HamburgerButtonProps {
  onClick: () => void;
}

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-8 right-8 z-50 w-12 h-12 flex flex-col items-center justify-center gap-2 group"
      aria-label="Open menu"
    >
      <span className="w-8 h-0.5 bg-black transition-transform group-hover:translate-x-1" />
      <span className="w-8 h-0.5 bg-black transition-transform" />
      <span className="w-8 h-0.5 bg-black transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
