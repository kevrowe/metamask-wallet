import { PropsWithChildren } from "react";
import { WithClassName } from "../types";

const Title = ({ className, children }: PropsWithChildren & WithClassName) => {
  return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
};

const Heading = ({
  className,
  children,
}: PropsWithChildren & WithClassName) => {
  return <h2 className={`text-xl font-bold mt-2 ${className}`}>{children}</h2>;
};

const Subheading = ({
  className,
  children,
}: PropsWithChildren & WithClassName) => {
  return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
};

export { Heading, Subheading, Title };
