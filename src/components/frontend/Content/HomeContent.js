import TabCategories from "../components/TabCategories";
import TabProducts from "../components/TabProducts";
import HeaderContentHome from "../Header/HeaderContentHome";

export default function HomeContent() {

    return (
        <>
            <HeaderContentHome />
            <TabCategories />
            <TabProducts />
        </>
    );
}