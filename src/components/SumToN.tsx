import { Button, Form, Input, Space } from "antd";
import { useState } from "react";

function SumToNPage() {
    const [value, setValue] = useState("");
    const [form] = Form.useForm();

    const sum_to_n_a = function (n: number) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    };

    const sum_to_n_b = function (n: number) {
        if (n > 0) return (n * (n + 1)) / 2;
        return 0;
    };

    const sum_to_n_c: (n: number) => number = function (n: number) {
        let sum = 0;
        if (n === 0) return sum;
        if (n > 0) {
            sum = n + sum_to_n_c(n - 1);
        }
        return sum;
    };

    const handleSubmit = (value: any) => {
        setValue(value?.number);
        form.resetFields();
    };

    return (
        <div id="sum-to-n-page" className="w-fit mt-20 mx-auto">
            <Space direction="vertical">
                <Form form={form} onFinish={handleSubmit}>
                    <Space.Compact>
                        <Form.Item
                            name="number"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || !isNaN(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Input value must be number!")
                                        );
                                    }
                                })
                            ]}>
                            <Input placeholder="Input number value ..." />
                        </Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ backgroundColor: "#fc72ff" }}>
                            Submit
                        </Button>
                    </Space.Compact>
                </Form>
                <>
                    <div>
                        <span>sum_to_n_a: </span>
                        <span>{sum_to_n_a(+value)}</span>
                    </div>
                    <div>
                        <span>sum_to_n_b: </span>
                        <span>{sum_to_n_b(+value)}</span>
                    </div>
                    <div>
                        <span>sum_to_n_c: </span>
                        <span>{sum_to_n_c(+value)}</span>
                    </div>
                </>
            </Space>
        </div>
    );
}

export default SumToNPage;
