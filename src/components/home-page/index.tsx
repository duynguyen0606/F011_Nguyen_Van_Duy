import { Button } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const dataArr = [
    {
        name: "Three ways sum to n",
        link: "/three-ways-sum-to-n"
    },
    {
        name: "FancyForm",
        link: "/fancy-form"
    },
    {
        name: "MessyReact",
        link: "/messy-react"
    }
];

function HomePage() {
    return (
        <div id="home-page">
            <div className="flex justify-center gap-4 mt-10">
                {dataArr.map((item) => (
                    <Link to={item.link} key={item.name}>
                        <Button size="large">{item.name}</Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
