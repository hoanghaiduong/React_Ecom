import Button from "@material-tailwind/react/Button";
import H6 from "@material-tailwind/react/Heading6";
import Icon from "@material-tailwind/react/Icon";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavbar from "./AdminNavbar";
export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState("-left-64");
    const history = useHistory();
    const [navLinkTG, setnavLinkTG] = useState(false);
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        Swal.fire({
            title: "Đang xử lý",
            timer: 600,
            didOpen: () => {
                Swal.showLoading();
                history.push("/login");
            },
        }).then(() => {
            Swal.fire({ icon: "success", title: "Đăng xuất thành công" });
        });
    };
    const GetAuth = localStorage.getItem("auth_token");
    var AuthLogOut = "";
    if (GetAuth) {
        AuthLogOut = (
            <Button
                ripple="dark"
                className="flex items-center text-center font-weight-bold w-full d-block px-4"
                color="red"
                onClick={handleLogout}
            >
                <Icon name="logout" size="2xl" />
                <span>Đăng xuất</span>
            </Button>
        );
    }

    return (
        <>
            <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div
                className={`h-full fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <H6 color="gray">Dương Tailwind</H6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4 text-gray-700">
                                <NavLink
                                    to="/admin/dashboard"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500  to-gray-400 text-white shadow-lg"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/admin/category"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500  to-gray-400 text-white shadow-lg"
                                >
                                    <Icon name="category" size="2xl" />
                                    Thêm danh mục
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-4 text-gray-700">
                                <NavLink
                                    to="/admin/view-category"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500  to-gray-400 text-white shadow-lg"
                                >
                                    <Icon name="toc" size="2xl" />
                                    Các danh mục sẵn
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/admin/add-product"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500 to-gray-400 text-white shadow-lg"

                                >
                                    <Icon name="add_shopping_cart" size="2xl" />
                                   Thêm Sản phẩm
                                </NavLink>
                               

                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/admin/view-product"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500  to-gray-400 text-white shadow-lg"

                                >
                                    <Icon name="format_list_bulleted" size="2xl" />
                                   Sản phẩm
                                </NavLink>
                               

                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/admin/profile"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500  to-gray-400 text-white shadow-lg"
                                >
                                    <Icon name="account_circle" size="2xl" />
                                    Profile
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/admin/maps"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-gray-500  to-gray-400 text-white shadow-lg"
                                >
                                    <Icon name="map" size="2xl" />
                                    Maps
                                </NavLink>
                            </li>

                        </ul>

                        <ul className="flex-col min-w-full flex list-none absolute bottom-0">
                            <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 rounded-lg text-white mb-2">
                                {AuthLogOut}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
