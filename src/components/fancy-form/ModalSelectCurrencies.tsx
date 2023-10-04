import { Input, Modal, ModalProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import tokensConfig from "../../config/tokenConfig.json";
import { OnSelectCurrencyProps } from ".";
import { useEffect, useState } from "react";

const defaultCurrencies = tokensConfig.slice(0, 6);

const filterCurrencyByName = (name: string) => {
    const data = tokensConfig.find((item) => item.currency === name);
    if (data) {
        // fake price fluctuations
        const flag = Math.floor(Math.random() * 10);
        if (flag >= 5) {
            Object.assign(data, {
                price: data.price * 1.02
            });
        } else {
            Object.assign(data, {
                price: data.price * 0.98
            });
        }
    }
    return data;
};

function ModalSelectCurrency(
    props: ModalProps & {
        onSelectCurrency: (props: OnSelectCurrencyProps) => void;
        fromCurrency: string;
        toCurrency: string;
    }
) {
    const { open, onCancel, onSelectCurrency, fromCurrency, toCurrency } = props;
    const [searchValue, setSearchValue] = useState("");
    const [fakeCallApiCurrency, setFakeCallApiCurrency] = useState("");

    useEffect(() => {
        if (fakeCallApiCurrency) {
            const data = filterCurrencyByName(fakeCallApiCurrency);
            if (data) {
                onSelectCurrency({
                    currency: data.currency,
                    price: data.price,
                    image: data.image
                });
            }
        }
    }, [fakeCallApiCurrency]);

    return (
        <Modal title="Select token" open={open} onCancel={onCancel} width={420} footer={null}>
            <div className="grid gap-4 pb-4">
                <Input
                    size="large"
                    placeholder="Search name or paste address"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value.trim().toLocaleLowerCase())}
                />
                <div className="flex items-center justify-start gap-2 w-full flex-wrap">
                    {defaultCurrencies
                        .filter(
                            (item) => item.currency !== fromCurrency && item.currency !== toCurrency
                        )
                        .map((item) => (
                            <div
                                onClick={() =>
                                    onSelectCurrency({
                                        currency: item.currency,
                                        price: item.price,
                                        image: item.image
                                    })
                                }
                                key={item.currency}
                                style={{
                                    padding: "5px 12px 5px 6px",
                                    border: "1px solid rgba(34, 34, 34, 0.07)"
                                }}
                                className="flex items-center rounded-full gap-4">
                                <img
                                    src={item.image}
                                    alt={item.currency}
                                    className="w-6 h-6 object-cover"
                                />
                                <span>{item.currency}</span>
                            </div>
                        ))}
                </div>
            </div>
            <ul
                className="h-96	overflow-auto"
                style={{ borderTop: "1px solid rgba(34, 34, 34, 0.07)" }}>
                {tokensConfig
                    .filter(
                        (item) => item.currency !== fromCurrency && item.currency !== toCurrency
                    )
                    .filter((item) => item.currency.toLocaleLowerCase().includes(searchValue))
                    .map((item) => (
                        <li
                            className="p-2 transition ease-in-out hover:bg-slate-100 flex gap-4"
                            key={item.currency}
                            onClick={() => setFakeCallApiCurrency(item.currency)}>
                            <img
                                src={item.image}
                                alt={item.currency}
                                className="w-6 h-6 object-cover"
                            />
                            <span>{item.currency}</span>
                        </li>
                    ))}
            </ul>
        </Modal>
    );
}

export default ModalSelectCurrency;
