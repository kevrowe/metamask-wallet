type Props = {
  accounts: string[];
  listClassName?: string;
  listItemRender: (accountId: string) => JSX.Element;
};

const AccountList = ({ accounts, listClassName, listItemRender }: Props) => {
  return (
    <ul className={`list-none ${listClassName}`}>
      {accounts?.map(listItemRender)}
    </ul>
  );
};

export { AccountList };
