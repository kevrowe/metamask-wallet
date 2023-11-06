type Props = {
  accounts: string[];
  listClassName?: string;
  listItemRender: (accountId: string) => JSX.Element;
};

const AccountList = ({ accounts, listClassName, listItemRender }: Props) => {
  return accounts.length > 0 ? (
    <ul className={`list-none ${listClassName}`}>
      {accounts?.map(listItemRender)}
    </ul>
  ) : (
    <p>No accounts</p>
  );
};

export { AccountList };
