import { Collapse, CollapseProps, Popover, PopoverProps, Switch } from 'antd';
import { PropsWithChildren } from 'react';

function PopoverSettings(props: PropsWithChildren<PopoverProps>) {
    const { children } = props;
    return (
        <Popover
            title="UniswapX"
            trigger="click"
            placement="bottomRight"
            overlayStyle={{
                width: 280
            }}
            content={
                <div className="divide-y divide-slate-200">
                    <div className="flex items-center justify-between py-2 gap-4">
                        <span>
                            When available, aggregates liquidity sources for better prices and gas
                            free swaps.
                        </span>
                        <div>
                            <Switch />
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2 gap-4">
                        <span>Local routing</span>
                        <div>
                            <Switch />
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2 gap-4">
                        <span>Max slippage</span>
                    </div>
                    <div className="flex items-center justify-between py-2 gap-4">
                        <span>Transaction Deadline</span>
                    </div>
                </div>
            }>
            {children}
        </Popover>
    );
}

export default PopoverSettings;
