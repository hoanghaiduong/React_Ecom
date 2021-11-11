import NavbarHome from "components/frontend/Navbar";
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "routes/Frontend/routes";
import DefaultFooter from "components/frontend/DefaultFooter";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
export default function FrontendLayout() {
    const [showGoTop, setShowGoTop] = useState(false)
    const handleClickTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowGoTop(true)
            }
            else {
                setShowGoTop(false)
            }
            //setShowGoTop(window.scrollY>=200)
        }
        window.addEventListener('scroll', handleScroll)

        //clean up function

        return () => {
            window.removeEventListener('scroll', handleScroll)
            setShowGoTop(false);
        }
    }, [])
    return (
        <>
            <div className="absolute w-full z-50">
                <NavbarHome />
            </div>
            <main>
                <Switch>
                    {PublicRoutes.map((routeData, id) => {//lọc qua các phần tử
                        return routeData.component &&
                            <Route
                                key={id}
                                path={routeData.path}
                                exact={routeData.exact}
                                name={routeData.name}
                                render={(props) => (
                                    <routeData.component {...props} />
                                )}
                            />;
                    })}
                    {/* Tat ca Link co prefix la / mac dinh se vao / */}
                    <Redirect from="/" to="/" />
                </Switch>
            </main>
            <DefaultFooter />

            <>
                {showGoTop && (<div className="" onClick={handleClickTop} style={{ position: "fixed", bottom: 50, right: 50, transition: "all" }}>
                    <Button
                        color="indigo"
                        buttonType="outline"
                        size="lg"
                        rounded={true}
                        block={false}
                        iconOnly={true}
                        ripple="dark"
                    >
                        <Icon name="vertical_align_top" size="lg" />
                    </Button>
                </div>)}
            </>

        </>
    );
}