import { formatHexToEth } from "../../format/currency";

type Props = {
  balance: string;
  className?: string;
};

const Balance = ({ balance, className }: Props) => {
  return <p className={className}>{formatHexToEth(balance)}</p>;
};

export { Balance };
