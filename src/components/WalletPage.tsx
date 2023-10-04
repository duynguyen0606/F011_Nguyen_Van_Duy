// interface WalletBalance {
//     currency: string;
//     amount: number;
// }
// interface FormattedWalletBalance {
//     currency: string;
//     amount: number;
//     formatted: string;
// }

import { Link } from "react-router-dom";

// const PRIORITY_MAP = {
//     Osmosis: 100,
//     Ethereum: 50,
//     Arbitrum: 30,
//     Zilliqa: 20,
//     Neo: 20
// };

// // optimize getPriority
// const getPriority = (blockchain: any): number => {
//     return PRIORITY_MAP[blockchain] || -99;
// };

// const WalletPage: React.FC<Props> = (props: Props) => {
//     const { children, ...rest } = props;
//     // The value could be change, we did not know for sure
//     const balances = useWalletBalances();
//     const prices = usePrices();

//     // Handle filter, soft, map in 1 FC
//     const optimizedBalances = useMemo(() => {
//         const intermediateBalances = balances.map((balance: WalletBalance) => ({
//             ...balance,
//             priority: getPriority(balance.blockchain),
//             formatted: balance.amount.toFixed()
//         }));

//         return (
//             intermediateBalances
//                 // Author try to get the priority > -99 and amount <=0
//                 .filter(({ priority, amount }) => priority > -99 && amount <= 0)
//                 .sort((lhs, rhs) => rhs.priority - lhs.priority)
//         );
//     }, [balances]);

//     //We could try the memo(WalletRow) in here
//     const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
//         const usdValue = prices[balance.currency] * balance.amount;
//         return (
//             <WalletRow
//                 className={classes.row}
//                 key={balance.currency}
//                 amount={balance.amount}
//                 usdValue={usdValue}
//                 formattedAmount={balance.formatted}
//             />
//         );
//     });

//     return <div {...rest}>{rows}</div>;
// };

// export default WalletPage;

function WalletPage() {
    return (
        <div className="text-center text-lg">
            <h2>
                You should check the refactor code in&nbsp;
                <Link to="https://inquisitive-molecule-39e.notion.site/React-732b5e100c5f46f0a765270506f22919?pvs=4">
                    <span className="underline">here</span>
                </Link>
            </h2>
        </div>
    );
}

export default WalletPage;
