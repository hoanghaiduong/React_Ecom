import axios from "axios";
import StatusCard from "components/admin/StatusCard";
import Card from "@material-tailwind/react/Card";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import Icon from "@material-tailwind/react/Icon";
import Label from "@material-tailwind/react/Label";
export default function ViewCategory() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios.get("/api/view-category").then((res) => {
            const result = res.data;
            console.log(result.status);
            console.log(result.data);
            if (result.status === 200) {
                setCategoryList(result.data);
            }
            setLoading(false);
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;//currentTarget là phần tử cha đi tới phần tử con
        const deleteCate = Swal.mixin();
        deleteCate.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: "Bạn có muốn xoá danh mục này !",
            showCancelButton: true,
            confirmButtonText: 'Xoá :)',
            cancelButtonText: 'Trở về',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-category/${id}`).then((res) => {
                    const result = res.data;
                    if (result.status === 200) {

                        Toast.fire({
                            icon: 'success',
                            title: result.message
                        })
                        thisClicked.closest('tr').remove();
                    }
                    else if (result.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: result.error
                        })

                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                deleteCate.fire({
                    icon: 'info',
                    title: 'An toàn',
                    text: 'Teo liền'
                })
            }
        })


    }
    var ViewCategory_list = "";
    if (loading) {
        Swal.fire({
            timer: 200,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(() => {
            setLoading(false);
        });
    } else {
        ViewCategory_list = categoryList.map((item) => {
            return (
                <tr key={item.id} className="">
                    <td className="border-b border-gray-200 align-middle font-light text-md whitespace-nowrap px-2 py-4 text-left">{item.name}</td>
                    <td className="border-b border-gray-200 align-middle font-light text-md whitespace-nowrap px-2 py-4 text-left">{item.slug}</td>
                    <td className="border-b border-gray-200 align-middle font-light text-md whitespace-nowrap px-2 py-4 text-left">
                        {item.status === 0 ? <Label color="blueGray">Không hoạt động</Label> : <Label color="green">Hoạt động</Label>}
                    </td>
                    <td className="border-b border-gray-200 align-middle flex flex-row justify-evenly items-center font-light text-md whitespace-nowrap px-2 py-4 text-center">
                        <div className="mx-2">
                            <Link to={`edit-category/${item.id}`}>
                                <Button
                                    color="teal"
                                    buttonType="outline"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="dark"
                                >
                                    <Icon name="build" size="sm" />
                                    Sửa
                                </Button>
                            </Link>
                        </div>

                        <div className="mx-2">

                            <Button
                                color="red"
                                buttonType="outline"
                                size="regular"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="dark"
                                onClick={(e) => {
                                    deleteCategory(e, item.id)
                                }}
                            >
                                <Icon name="remove_circle_outline" size="sm" />
                                Xoá
                            </Button>

                        </div>
                    </td>

                </tr>

            );
        });
    }

    return (
        <>

            <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="Traffic"
                            amount="350,897"
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="New Users"
                            amount="2,356"
                            percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Sales"
                            amount="924"
                            percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Performance"
                            amount="49,65%"
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                    </div>
                </div>
            </div>


            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <Card>
                            <CardHeader color="teal" contentPosition="left">
                                <h2 className="text-white text-2xl">Danh mục sản phẩm</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="overflow-x-auto">
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"
                                                >
                                                    Tên
                                                </th>
                                                <th
                                                    className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"

                                                >
                                                    URL Sên
                                                </th>
                                                <th
                                                    className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center"
                                                    style={{
                                                        width: '7%'
                                                    }}
                                                >
                                                    Trạng thái (Show/Hidden)
                                                </th>
                                                <th
                                                    className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center"
                                                    style={{
                                                        width: '15%'
                                                    }}
                                                >
                                                    Chức năng
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ViewCategory_list}
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </div>
        </>
    );
}
