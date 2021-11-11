import HomeContent from "components/frontend/Content/HomeContent";
import HeaderHome from "components/frontend/Header/HeaderHome";
import SubHeaderHome from "components/frontend/Header/SubHeaderHome";

export default function Home() {
    return (
        <>
            <HeaderHome />
            <SubHeaderHome />
            <HomeContent />
        </>
    );
}