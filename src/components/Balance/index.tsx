import { formatBalance } from "../../format/currency";

type Props = {
  balance: string;
  className?: string;
};

const Balance = ({ balance, className }: Props) => {
  return <p className={className}>{formatBalance(balance)}</p>;
};

export { Balance };
