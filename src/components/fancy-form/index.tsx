import { Button } from "antd";
import { useState } from "react";
import DrawerWallet from "./DrawerWallet";
import ModalSelectCurrency from "./ModalSelectCurrencies";
import NumericInput from "./NumericsInput";
import PopoverSettings from "./PopoverSettings";
import { ArrowIcon, SelectIcon, SettingIcon } from "./icons";
import "./style.scss";

enum CurrencyStatus {
    FROMCURRENCY,
    TOCURRENCY
}

type CurrencyType = {
    balance: number;
    type: string;
    price: number;
    image: string;
};

type SwapFromCurrencyToCurrencyType = {
    balance: number;
    fromCurrencyPrice: number;
    toCurrencyPrice: number;
};

export type OnSelectCurrencyProps = {
    currency: string;
    price: number;
    image: string;
};

const defaultCurrencyState = {
    balance: 0,
    type: "",
    price: 0,
    image: ""
};

const formatCurrency = (amount: number) => {
    const fixedAmount = amount.toFixed(2);
    return Intl.NumberFormat("en-US").format(+fixedAmount);
};

const swapToUSD = ({ balance, price }: { balance: number; price: number }) => {
    return balance * price ? balance * price : 0;
};

const swapFormCurrencyToCurrency = ({
    balance,
    fromCurrencyPrice,
    toCurrencyPrice
}: SwapFromCurrencyToCurrencyType) => {
    return balance * (fromCurrencyPrice / toCurrencyPrice)
        ? balance * (fromCurrencyPrice / toCurrencyPrice)
        : 0;
};

function FancyFormPage() {
    const [openDrawerWallet, setOpenDrawerWallet] = useState(false);
    const [fromCurrency, setFromCurrency] = useState<CurrencyType>(defaultCurrencyState);
    const [toCurrency, setToCurrency] = useState<CurrencyType>(defaultCurrencyState);
    const [modalStatus, setModalStatus] = useState({
        type: CurrencyStatus.FROMCURRENCY,
        status: false
    });
    const [errorMessage, setErrorMessage] = useState<{ type: number; content: string } | null>(
        null
    );

    const onSelectCurrency = (props: OnSelectCurrencyProps) => {
        const { currency, price, image } = props;
        if (modalStatus.type === CurrencyStatus.FROMCURRENCY) {
            setFromCurrency((prev) => {
                return {
                    ...prev,
                    type: currency,
                    price,
                    image
                };
            });
            setErrorMessage({
                type: CurrencyStatus.TOCURRENCY,
                content: "Please select your token!"
            });
            if (fromCurrency.balance && toCurrency.balance) {
                setToCurrency((prev) => {
                    return {
                        ...prev,
                        balance: swapFormCurrencyToCurrency({
                            balance: price,
                            fromCurrencyPrice: price,
                            toCurrencyPrice: prev.price
                        })
                    };
                });
                setErrorMessage(null);
            }
        } else {
            setToCurrency({
                balance: swapFormCurrencyToCurrency({
                    balance: fromCurrency.balance,
                    fromCurrencyPrice: fromCurrency.price,
                    toCurrencyPrice: price
                }),
                type: currency,
                price,
                image
            });
            setErrorMessage(null);
        }
        setModalStatus((prev) => {
            return { ...prev, status: false };
        });
    };

    const onChangeInputFromCurrency = (value: string) => {
        const _value = Number(value);
        setFromCurrency((prev) => {
            return {
                ...prev,
                balance: _value
            };
        });

        if (!fromCurrency.type && !toCurrency.type) {
            setErrorMessage({
                type: CurrencyStatus.FROMCURRENCY,
                content: "Please select your token!"
            });
            return;
        }

        if (toCurrency.type) {
            setToCurrency((prev) => {
                return {
                    ...prev,
                    balance: swapFormCurrencyToCurrency({
                        balance: _value,
                        fromCurrencyPrice: fromCurrency.price,
                        toCurrencyPrice: toCurrency.price
                    })
                };
            });
        } else {
            setErrorMessage({
                type: CurrencyStatus.TOCURRENCY,
                content: "Please select your token!"
            });
        }
    };

    const swapCurrencyFC = () => {
        const tempCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(tempCurrency);
    };

    return (
        <div id="fancy-form">
            <div className="fancy-form-box">
                <div className="pb-4 pt-2 px-2 flex justify-between">
                    <div className="flex gap-2 text-base font-medium">
                        <button>Swap</button>
                        <button onClick={() => setOpenDrawerWallet(true)}>Buy</button>
                    </div>
                    <PopoverSettings>
                        <button>
                            <SettingIcon />
                        </button>
                    </PopoverSettings>
                </div>
                <div className="fancy-form-item">
                    <span>You pay</span>
                    <div className="fancy-input">
                        <NumericInput
                            style={{ flex: 1 }}
                            value={fromCurrency.balance.toString()}
                            onChange={(value) => {
                                onChangeInputFromCurrency(value);
                            }}
                        />
                        <Button
                            className={`btn-select ${!fromCurrency.type && "select-nothing"}`}
                            onClick={() =>
                                setModalStatus({ type: CurrencyStatus.FROMCURRENCY, status: true })
                            }>
                            {fromCurrency.type ? (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={fromCurrency.image}
                                        alt={fromCurrency.type}
                                        className="w-6 h-6 object-cover"
                                    />
                                    <span>{fromCurrency.type}</span>
                                </div>
                            ) : (
                                "Select token"
                            )}
                            <SelectIcon color={fromCurrency.type ? "#000" : "#fff"} />
                        </Button>
                    </div>
                    <span className="amount">
                        {fromCurrency.price
                            ? `$${formatCurrency(
                                  swapToUSD({
                                      balance: fromCurrency.balance,
                                      price: fromCurrency.price
                                  })
                              )}`
                            : "-"}
                    </span>
                    {errorMessage?.type === CurrencyStatus.FROMCURRENCY && (
                        <div className="text-xs text-red-500">{errorMessage.content}</div>
                    )}
                </div>
                <div className="divider-swapper">
                    <div className="box-icon" onClick={() => swapCurrencyFC()}>
                        <ArrowIcon />
                    </div>
                </div>
                <div className="fancy-form-item">
                    <span>You receive</span>
                    <div className="fancy-input">
                        <NumericInput
                            onChange={() => {}}
                            style={{ flex: 1 }}
                            value={toCurrency.balance.toString()}
                        />
                        <Button
                            className={`btn-select ${!toCurrency.type && "select-nothing"}`}
                            onClick={() =>
                                setModalStatus({ type: CurrencyStatus.TOCURRENCY, status: true })
                            }>
                            {toCurrency.type ? (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={toCurrency.image}
                                        alt={toCurrency.type}
                                        className="w-6 h-6 object-cover"
                                    />
                                    <span>{toCurrency.type}</span>
                                </div>
                            ) : (
                                "Select token"
                            )}
                            <SelectIcon color={toCurrency.type ? "#000" : "#fff"} />
                        </Button>
                    </div>
                    <span className="amount">
                        {toCurrency.price
                            ? `$${formatCurrency(
                                  swapToUSD({
                                      balance: toCurrency.balance,
                                      price: toCurrency.price
                                  })
                              )}`
                            : "-"}
                    </span>
                    {errorMessage?.type === CurrencyStatus.TOCURRENCY && (
                        <div className="text-xs text-red-500">{errorMessage.content}</div>
                    )}
                </div>
                {fromCurrency.balance && toCurrency.balance ? (
                    <div
                        className="px-3 py-4 mt-1 rounded-xl"
                        style={{ border: "1px solid rgba(34, 34, 34, 0.07)" }}>
                        {`1 ${fromCurrency.type} = ${swapFormCurrencyToCurrency({
                            balance: fromCurrency.balance,
                            fromCurrencyPrice: fromCurrency.price,
                            toCurrencyPrice: toCurrency.price
                        }).toFixed(2)} ${toCurrency.type}`}
                        &nbsp;
                        <span>
                            {`($${swapToUSD({ balance: 1, price: fromCurrency.price }).toFixed(
                                2
                            )})`}
                        </span>
                    </div>
                ) : (
                    ""
                )}
                <Button onClick={() => setOpenDrawerWallet(true)} className="btn-connect-wallet">
                    Connect wallet
                </Button>
            </div>
            <ModalSelectCurrency
                onSelectCurrency={onSelectCurrency}
                open={modalStatus.status}
                onCancel={() =>
                    setModalStatus((prev) => {
                        return { ...prev, status: false };
                    })
                }
                fromCurrency={fromCurrency.type}
                toCurrency={toCurrency.type}
            />
            <DrawerWallet open={openDrawerWallet} onClose={() => setOpenDrawerWallet(false)} />
        </div>
    );
}

export default FancyFormPage;
