import { Drawer, DrawerProps } from 'antd';

const walletList = [
    { name: 'Uniswap Wallet', image: '/assets/images/uniswap.png' },
    { name: 'Install MetaMask', image: '/assets/images/metamask.svg' },
    { name: 'WalletConnect', image: '/assets/images/app-uniswap.svg' },
    { name: 'Coinbase Wallet', image: '/assets/images/coinbase.svg' }
];

function DrawerWallet(props: DrawerProps) {
    const { open, onClose } = props;
    return (
        <Drawer title="Connect wallet" placement="right" width={320} onClose={onClose} open={open}>
            <div className="grid gap-1 rounded-lg overflow-hidden">
                {walletList.map((item) => (
                    <div
                        style={{ backgroundColor: 'rgb(249, 249, 249)' }}
                        key={item.name}
                        className="flex gap-2 items-center p-4">
                        <div>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg"
                                style={{ border: '1px solid rgba(34, 34, 34, 0.07)' }}
                            />
                        </div>
                        <span className="font-semibold">{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="py-4" style={{ color: 'rgb(125, 125, 125)' }}>
                By connecting a wallet, you agree to Uniswap Labs'{' '}
                <span className="font-semibold">Terms of Service</span> and consent to its{' '}
                <span className="font-semibold">Privacy Policy.</span> (Last Updated 6.7.23)
            </div>
        </Drawer>
    );
}

export default DrawerWallet;
