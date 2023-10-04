import { Layout } from "antd";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;
function DefaultLayout(props: PropsWithChildren) {
    const { children } = props;
    return (
        <Layout>
            <Header className="flex items-center justify-center text-white">
                <Link to="/">
                    <div style={{ width: 80 }}>
                        <img src="/assets/images/99Tech.png" />
                    </div>
                </Link>
            </Header>
            <Content className="h-screen bg-white p-4">{children}</Content>
        </Layout>
    );
}

export default DefaultLayout;
