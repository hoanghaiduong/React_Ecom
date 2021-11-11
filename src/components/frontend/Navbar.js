import Button from "@material-tailwind/react/Button";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Icon from "@material-tailwind/react/Icon";
import Nav from "@material-tailwind/react/Nav";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavItem from "@material-tailwind/react/NavItem";
import NavLink from "@material-tailwind/react/NavLink";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const NavbarHome = () => {

    const [openNavbar, setOpenNavbar] = useState(false);
    const [loading, setLoading] = useState(false)

    const history = useHistory();

    const token_isset = localStorage.getItem('auth_token');
    const logoutSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Bạn có muốn đăng xuất ?',
            icon: "question",
            showCancelButton: true,
            confirmButtonText: 'Có, Đăng Xuất!',
            cancelButtonText: 'Không, Tôi muốn ở lại!',
            reverseButtons: true,
        }).then((response) => {
            if (response.isConfirmed) {
                setLoading(true);
                axios.get("/sanctum/csrf-cookie").then(() => {
                    axios.post('api/logout').then((res) => {
                        const result = res.data;
                        if (res.status === 200) {
                            setLoading(false);
                            Toast.fire({
                                icon: 'success',
                                title: result.message
                            }).then(() => {
                                localStorage.removeItem('auth_token');
                                localStorage.removeItem('auth_name');
                                history.replace('/');
                            }).catch(() => {
                                setLoading(false);
                            })
                        }
                    }).catch((error) => {
                        setLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: error.message
                        })
                    })
                })
            } else if (
                response.dismiss === Swal.DismissReason.cancel
            ) {
                //nếu ấn huỷ
            }
        }).catch(() => {
            setLoading(false);
        })
    }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    if (loading) {

        Swal.fire({
            title: 'Vui lòng chờ',
            timer: 700,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()

            }
        }).then(() => { setLoading(false); })

    }
    var AuthButtons = "";
    if (!token_isset) {
        AuthButtons = (
            <>
                <DropdownItem color="lightBlue">
                    <Link className="items-center flex flex-row" to="/login">
                        <Icon name="account_circle" size="md" />
                        <span className="ml-2">Đăng nhập</span>
                    </Link>
                </DropdownItem>
                <DropdownItem color="lightBlue">
                    <Link className="items-center flex flex-row" to="/register">
                        <Icon name="account_circle" size="md" />
                        <span className="ml-2">Đăng Ký</span>
                    </Link>
                </DropdownItem>
            </>
        )

    }
    else {
        AuthButtons = (
            <>
                <DropdownItem color="lightBlue">
                    <Link className="items-center flex flex-row" to="/profile">
                        <Icon name="manage_accounts" size="md" />
                        <span className="ml-2">Hồ Sơ</span>
                    </Link>
                </DropdownItem>
                <DropdownItem color="lightBlue">
                    <Link className="items-center flex flex-row" to="#">
                        <Icon name="receipt_long" size="md" />
                        <span className="ml-2">Đơn hàng</span>
                    </Link>
                </DropdownItem>
                <DropdownItem color="lightBlue">
                    <Link className="items-center flex flex-row" to="#">
                        <Icon name="savings" size="md" />
                        <span className="ml-2">Ví Tiền</span>
                    </Link>
                </DropdownItem>
                <DropdownItem color="lightBlue">
                    <Link className="items-center flex flex-row" to="#">
                        <Icon name="request_quote" size="md" />
                        <span className="ml-2">Mã giảm giá của tôi</span>
                    </Link>
                </DropdownItem>
                <DropdownItem color="transperent">

                    <Button onClick={logoutSubmit}>
                        <Icon name="logout" size="md" />
                        <span className="ml-2">Đăng Xuất</span>
                    </Button>
                </DropdownItem>

            </>
        )

    }
    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <NavbarBrand>FASHION</NavbarBrand>
                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <Link to="/">
                            <NavItem active="light" ripple="light">
                                <Icon name="language" size="md" />
                                Trang chủ
                            </NavItem>
                        </Link>
                        <Link to="#">
                            <NavLink ripple="light">
                                <Icon name="settings" size="md" />
                                Cửa hàng
                            </NavLink>
                        </Link>
                        <div className="text-white">
                            <Dropdown
                                color="transparent"
                                size="sm"
                                buttonType="link"
                                buttonText={
                                    <div className="py-2.5 font-medium flex items-center">
                                        <Icon
                                            name="view_carousel"
                                            size="2xl"
                                            color="white"
                                        />
                                        <span className="ml-2">
                                            Tài khoản
                                        </span>
                                    </div>
                                }
                                ripple="light"
                            >
                                {AuthButtons}
                            </Dropdown>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
export default NavbarHome;