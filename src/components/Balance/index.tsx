import { formatHex } from "../../format/currency";

type Props = {
  balance: string;
  className?: string;
};

const Balance = ({ balance, className }: Props) => {
  return <p className={className}>{formatHex(balance)}</p>;
};

export { Balance };
