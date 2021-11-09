import Icon from '@material-tailwind/react/Icon';
import Nav from '@material-tailwind/react/Nav';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavLink from '@material-tailwind/react/NavLink';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    /* const history = useHistory();
 */
    /* const logoutSubmit = (e) => {
        e.preventDefault();
        const questionSWAL = Swal.mixin({

            focusConfirm: false,
            buttonsStyling: true
        })
        questionSWAL.fire({
            title: 'Bạn có muốn đăng xuất ?',
            icon: "question",
            showCancelButton: true,
            confirmButtonText: 'Có, Đăng Xuất!',
            cancelButtonText: 'Không, Tôi muốn ở lại!',
            reverseButtons: true,
            showLoaderOnConfirm: true,
        }).then((response) => {
            if (response.isConfirmed) {
                let timerInterval;
                questionSWAL.fire({
                    title: 'Vui lòng chờ',
                    html: 'Khoảng <b></b> milliseconds.',
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 50)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then(() => {
                    axios.get("/sanctum/csrf-cookie").then(() => {
                        axios.post('api/logout')
                            .then((res) => {
                                const result = res.data;
                                questionSWAL.fire({
                                    icon: 'success',
                                    title: result.message
                                }).then(() => {
                                    localStorage.removeItem('auth_token');
                                    localStorage.removeItem('auth_name');
                                    history.push("/login");
                                })
                            })
                            .catch((err) => {
                                questionSWAL.fire({ icon: 'error', 'title': err.message });
                            })
                    })
                })

            } else if (
                response.dismiss === Swal.DismissReason.cancel
            ) {
                //nếu ấn huỷ
            }
        })
    } */
    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <NavLink
                        to="#"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <NavbarBrand>Dương Tailwind</NavbarBrand>
                    </NavLink>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            <Link to="/">
                                <NavLink
                                    ripple="light"
                                >
                                    <Icon name="description" size="2xl" />
                                    &nbsp;Home
                                </NavLink>
                            </Link>
                            <Link to="/login">
                                <NavLink
                                    ripple="light"
                                >
                                    <Icon name="login" size="2xl" />
                                    &nbsp;Đăng nhập
                                </NavLink>
                            </Link>
                            <Link to="/register">
                                <NavLink ripple="light" >
                                    <Icon name="app_registration" size="2xl" />
                                    &nbsp;Đăng Ký
                                </NavLink>
                            </Link>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
