import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import CardHeader from '@material-tailwind/react/CardHeader';
import Checkbox from '@material-tailwind/react/Checkbox';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import axios from 'axios';
import DefaultNavbar from 'components/frontend/DefaultNavbar';
import Container from 'components/frontend/login/Container';
import Page from 'components/frontend/login/Page';
import SimpleFooter from 'components/frontend/SimpleFooter';
import React, { useState } from "react";
import { useHistory } from "react-router";
import Swal from 'sweetalert2';

const Login = () => {
    const history = useHistory();

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
    const [loading, setLoading] = useState(false);
    const [LoginInput, setLoginInput] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        e.persist();
        setLoginInput({
            ...LoginInput,
            [nameInput]: valueInput
        });
    }
    const data = {
        email: LoginInput.email,
        password: LoginInput.password,
    }
    const LoginSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie')
            .then(() => {
                axios.post('api/login', data).then((res) => {
                    const result = res.data;
                    const auth_token = result.token;
                    const auth_name = result.username;

                    if (result.status === 200) {
                        setLoading(false)
                        localStorage.setItem('auth_token', auth_token);
                        localStorage.setItem('auth_name', auth_name);
                        Toast.fire({
                            icon: 'success',
                            title: 'Đăng nhập thành công !',
                            text: 'Xin chào ' + result.username,
                        }).then(() => {
                            if (result.role === 'admin') {
                                history.push('/admin/dashboard');
                            }
                            else {
                                history.push('/');
                            }
                        })
                    }
                    else if (result.status === 401) {
                        setLoading(false)
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'error',
                            title: result.message,
                            backdrop: `
                            rgba(0,0,0,0.7)
                            no-repeat
                          `
                        })
                    }
                    else {
                        setLoading(false)
                        setLoginInput({
                            ...LoginInput,
                            error_list: result.message,
                        })
                    }
                }).catch((error) => {
                    setLoading(false)
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        title: 'Thất bại',
                        text: 'Lỗi kết nối đến máy chủ'
                    })
                })

            }).catch((error) => {
                setLoading(false)
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'error',
                    title: 'Thất bại',
                    text: error.message
                })
                console.log(error)
            })
    }
    if (loading) {
        Swal.fire({
            timer: 1500,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => { setLoading(false) }
        }).then(() => { setLoading(false) })
    }
    return (

        <Page>
            <DefaultNavbar />
            <Container>
                <Card>
                    <CardHeader color="lightBlue">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Đăng nhập
                        </H5>
                    </CardHeader>

                    <form onSubmit={LoginSubmit}>
                        <CardBody>
                            <div className="mb-10 px-4 bg-bb">
                                <InputIcon
                                    outline
                                    size="lg"
                                    type="email"
                                    color="lightBlue"
                                    placeholder="Email Address"
                                    iconName="email"
                                    name="email"
                                    value={LoginInput.email}
                                    onChange={handleInput}
                                    error={LoginInput.error_list.email}
                                />

                            </div>
                            <div className="mb-10 px-4">
                                <InputIcon
                                    outline
                                    type="password"
                                    size="lg"
                                    color="lightBlue"
                                    placeholder="Password"
                                    iconName="lock"
                                    name="password"
                                    value={LoginInput.password}
                                    onChange={handleInput}
                                    error={LoginInput.error_list.password}
                                />

                            </div>
                            <div className="mb-4 px-4">
                                <Checkbox
                                    color="lightBlue"
                                    text="Remember Me"
                                    id="remember"
                                />
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex justify-center bg-bb">
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="lg"
                                    ripple="dark"
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </Container>
            <SimpleFooter />
        </Page>
    );
}
export default Login;