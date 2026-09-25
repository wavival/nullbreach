"use client";

import { useState } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function PasswordInput({
  label,
  className = "",
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative block">
      {label && <span className="block text-sm">{label}</span>}
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`${label ? "mt-1 " : ""}w-full rounded border border-border bg-surface-alt p-2 pr-16 text-foreground outline-none focus:border-primary ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-2 bottom-2 rounded px-1 text-body-sm text-foreground-muted hover:text-primary"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? "hide" : "show"}
      </button>
    </span>
  );
}
