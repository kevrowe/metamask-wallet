import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Button = ({
  children,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren) => (
  <button
    {...restProps}
    className={
      "m-2 bg-slate-600 text-white rounded-md p-2 shadow-sm hover:bg-slate-500"
    }
  >
    {children}
  </button>
);

export { Button };
