import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import CardHeader from '@material-tailwind/react/CardHeader';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import axios from 'axios';
import DefaultNavbar from 'components/frontend/DefaultNavbar';
import Container from 'components/frontend/login/Container';
import Page from 'components/frontend/login/Page';
import SimpleFooter from 'components/frontend/SimpleFooter';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import Alert from "@material-tailwind/react/Alert";
/* import setCookie from 'components/SetCookie'; */


export default function Register() {

    const [loading, setLoading] = useState(false)
    const [registerInput, SetRegisterInput] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        error_list: [],
    });
    const history = useHistory();
    const handleInput = (e) => {
        e.persist();
        const inputValue = e.target.value;
        const inputName = e.target.name;
        SetRegisterInput({
            ...registerInput, //lấy ra tất cả các initState
            //set giá trị cho input dạng object
            // ví dụ : { name: "hoanghaiduong",email:"hhd1711@gmail.com",password:"123"  }
            [inputName]: inputValue,
        });
    };
    const data = {
        name: registerInput.name,
        email: registerInput.email,
        password: registerInput.password,
        password_confirmation: registerInput.password_confirmation,
    };
    const registerSubmit = (e) => {
        setLoading(true)
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then(() => {
            axios({
                url: "api/register",
                method: "POST",
                data: JSON.stringify(data),
            }).then((res) => {
                const result = res.data;
                console.log(result);
                if (result.status === 200) {
                    setLoading(false)
                    Swal.fire({
                        icon: "success",
                        title: result.message,
                    }).then(() => {
                        localStorage.setItem('auth_token', result.token);
                        localStorage.setItem('auth_name', result.username);
                        /*  setCookie('auth_token', result.token)
                         setCookie('auth_name', result.username) */
                        history.push('/login')
                    })
                }
                else {
                    setLoading(false)
                    SetRegisterInput({
                        ...registerInput,
                        error_list: result.message, //error_list là key sau ":" là value
                    });
                }
            }).catch((err) => {

                console.log(err)
            })
        })
    }
    if (loading) {

        Swal.fire({
            title: 'Đang xử lý !',
            timer: 1500,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
    }
    return (
        <Page>
            <DefaultNavbar />
            <Container>
                <Card>
                    <CardHeader color="lightBlue">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Đăng Ký
                        </H5>
                    </CardHeader>

                    <form onSubmit={registerSubmit}>
                        <CardBody>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    outline
                                    size="lg"
                                    type="text"
                                    color="lightBlue"
                                    placeholder="Tên của bạn"
                                    iconName="account_circle"
                                    name="name"
                                    value={registerInput.name}
                                    onChange={handleInput}
                                />
                                <div className="my-2">
                                    {registerInput.error_list.name && <Alert color="pink">{registerInput.error_list.name}</Alert>}
                                </div>
                            </div>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    outline
                                    size="lg"
                                    type="email"
                                    color="lightBlue"
                                    placeholder="Địa chỉ Email"
                                    iconName="email"
                                    name="email"
                                    value={registerInput.email}
                                    onChange={handleInput}
                                />
                                <div className="my-2">
                                    {registerInput.error_list.email && <Alert color="pink">{registerInput.error_list.email}</Alert>}
                                </div>
                            </div>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    outline
                                    type="password"
                                    size="lg"
                                    color="lightBlue"
                                    placeholder="Mật khẩu"

                                    iconName="lock"
                                    name="password"
                                    value={registerInput.password}
                                    onChange={handleInput}
                                />
                                <div className="my-2">
                                    {registerInput.error_list.password && <Alert color="pink">{registerInput.error_list.password}</Alert>}
                                </div>
                            </div>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    outline
                                    type="password"
                                    size="lg"
                                    color="lightBlue"
                                    placeholder="Nhập lại mật khẩu"
                                    iconName="lock"
                                    name="password_confirmation"
                                    value={registerInput.password_confirmation}
                                    onChange={handleInput}
                                />
                                <div className="my-2">
                                    {registerInput.error_list.password_confirmation && <Alert color="pink">{registerInput.error_list.password_confirmation}</Alert>}
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex justify-center">
                                <Button
                                    color="lightBlue"
                                    buttonType="link"
                                    size="lg"
                                    ripple="dark"
                                >
                                    Register
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
