import React from "react";
import Input from "@material-tailwind/react/Input";
import Icon from "@material-tailwind/react/Icon";
import Textarea from "@material-tailwind/react/Textarea";
import Checkbox from "@material-tailwind/react/Checkbox";
import { useState, useEffect } from "react";
import Button from "@material-tailwind/react/Button";
import axios from "axios";
import Swal from "sweetalert2";
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
import { useHistory } from "react-router";
export default function EditCategory(props) {
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
    const [openTab, setOpenTab] = useState(1);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [categoryInput, setCategoryInput] = useState([]);
    const category_id = props.match.params.id;
    const [errorList, setErrorList] = useState([]);
    useEffect(() => {
        axios
            .get(`/api/edit-category/${category_id}`)
            .then((res) => {
                const result = res.data;
                if (result.status === 200) {
                    setCategoryInput(result.category);
                } else if (result.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: result.message,
                        showConfirmButton: true,
                    }).then((e) => {
                        if (e.isConfirmed) {
                            history.push("/admin/view-category");
                        }
                    });
                }
                setLoading(false);
            })
            .catch(() => { });
    }, [props.match.params.id, history]);
    const handleInput = (e) => {
        e.persist();
        setCategoryInput({
            ...categoryInput,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };
    const data = categoryInput;
    const updateCategory = (e) => {
        e.preventDefault();
        axios.put(`/api/update-category/${category_id}`, data).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: result.message,
                })
                setErrorList([]);
            } else if (result.status === 422) {
                setErrorList(result.error_list);
                Swal.fire({
                    icon: "error",
                    title: "Vui lồng kiểm tra đầu dữ liệu nhập",
                });
                //lỗi validate
            } else if (result.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                }).then(() => {
                    history.push('/admin/view-category');
                });
            }
        });
    };
    if (loading) {
        Swal.fire({
            timer: 100,
            timerProgressBar: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }
    return (
        <>
            <div className="pt-10 pb-28 px-3 md:px-8 sm:px-8 h-full">
                <form onSubmit={updateCategory}>
                    <Tab className="z-0">
                        <TabList color="blueGray" className="flex flex-col sm:flex-row">
                            <TabItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                ripple="light"
                                active={openTab === 1 ? true : false}
                                href="tabItem"
                            >
                                <Icon name="language" size="lg" />
                                Sửa Danh Mục
                            </TabItem>
                            <TabItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                ripple="light"
                                active={openTab === 2 ? true : false}
                                href="tabItem"
                            >
                                <Icon name="account_circle" size="lg" />
                                Thẻ Meta
                            </TabItem>
                        </TabList>

                        <TabContent>
                            <TabPane active={openTab === 1 ? true : false}>
                                <div className="">
                                    <div className="px-4 mb-7 w-full">
                                        <Input
                                            outline
                                            type="text"
                                            color="lightBlue"
                                            placeholder="Con sên URL"
                                            name="slug"
                                            onChange={handleInput}
                                            value={categoryInput.slug}
                                            error={errorList.slug}
                                        />
                                    </div>
                                    <div className="px-4 mb-7 w-full">
                                        <Input
                                            outline
                                            type="text"
                                            color="lightBlue"
                                            placeholder="Tên"
                                            name="name"
                                            onChange={handleInput}
                                            value={categoryInput.name}
                                            error={errorList.name}
                                        />
                                    </div>
                                    <div className="px-4 mb-7 ">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Mô tả"
                                            name="descrip"
                                            onChange={handleInput}
                                            value={categoryInput.descrip}
                                            error={errorList.descrip}
                                        />

                                    </div>
                                    <div className="col-start-1 col-end-3 px-4">
                                        <Checkbox
                                            color="green"
                                            text="Hoạt động/Không hoạt động"
                                            id="checkbox"
                                            name="status"
                                            onChange={handleInput}
                                            value={categoryInput.status}
                                            checked={categoryInput.status}
                                        />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane active={openTab === 2 ? true : false}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Tiêu đề (meta)"
                                            name="meta_title"
                                            onChange={handleInput}
                                            value={categoryInput.meta_title}
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Mô tả (meta)"
                                            name="meta_descrip"
                                            onChange={handleInput}
                                            value={categoryInput.meta_descrip}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Thẻ keyword(meta)"
                                            name="meta_keyword"
                                            onChange={handleInput}
                                            value={categoryInput.meta_keyword}
                                        />
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                        <Button
                            color="blueGray"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                        >
                            Cập nhật danh mục
                        </Button>
                    </Tab>
                </form>
            </div>
        </>
    );
}
