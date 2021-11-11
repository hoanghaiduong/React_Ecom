import Button from "@material-tailwind/react/Button";
import Checkbox from "@material-tailwind/react/Checkbox";
import Icon from "@material-tailwind/react/Icon";
import Input from "@material-tailwind/react/Input";
import Tab from "@material-tailwind/react/Tab";
import TabContent from "@material-tailwind/react/TabContent";
import TabItem from "@material-tailwind/react/TabItem";
import TabList from "@material-tailwind/react/TabList";
import TabPane from "@material-tailwind/react/TabPane";
import Textarea from "@material-tailwind/react/Textarea";
import axios from "axios";
import { useState } from "react";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Swal from "sweetalert2";
export default function Category() {
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
    const [loading, setLoading] = useState(false);
    const [openTab, setOpenTab] = useState(1);
    const [categoryInput, setCategoryInput] = useState({
        name: "",
        slug: "",
        status: "",
        featured: "",
        popular: "",
        descrip: "",
        meta_title: "",
        meta_keyword: "",
        name_icon: '',
        meta_descrip: "",
        RateUp: '',
        RateDown: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        const categoryName = e.target.name;
        const categoryValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCategoryInput({
            ...categoryInput,
            [categoryName]: categoryValue,
        });
    };
    const data = {
        name: categoryInput.name,
        slug: categoryInput.slug,
        status: categoryInput.status,
        featured: categoryInput.featured,
        popular: categoryInput.popular,
        descrip: categoryInput.descrip,
        RateUp: categoryInput.RateUp,
        RateDown: categoryInput.RateDown,
        name_icon: categoryInput.name_icon,
        meta_title: categoryInput.meta_title,
        meta_keyword: categoryInput.meta_keyword,
        meta_descrip: categoryInput.meta_descrip,
    };

    const submitCategory = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("/api/store-category", data).then((res) => {
            setLoading(false);
            const result = res.data;
            if (result.status === 200) {
                document.getElementById('CATEGORY_FORM').reset();
                setCategoryInput({
                    name: "",
                    slug: "",
                    status: "",
                    featured: "",
                    popular: "",
                    descrip: "",
                    meta_title: "",
                    meta_keyword: "",
                    meta_descrip: "",
                    name_icon: '',
                    error_list: [],
                });
                setLoading(false);
                Toast.fire({
                    icon: "success",
                    title: result.message,
                });
            }
            else if (result.status === 400) {
                setLoading(false);
                setCategoryInput({
                    ...categoryInput,
                    error_list: result.message,
                });
                Swal.fire({
                    toast: true,
                    position: 'center',
                    icon: "error",
                    title: "Thất bại",
                    text: "Vui lòng thử lại",
                });
            }

        });

    };

    if (loading) {
        Swal.fire({
            timer: 500,
            timerProgressBar: false,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            setLoading(false);
        })
    }

    return (
        <div className="pt-10 pb-28 px-3 md:px-8 sm:px-8 h-full">
            <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                            Tạo Danh Mục
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
                        <TabItem
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenTab(3);
                            }}
                            ripple="light"
                            active={openTab === 3 ? true : false}
                            href="tabItem"
                        >
                            <Icon name="account_circle" size="lg" />
                            Khác
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
                                        error={categoryInput.error_list.slug}
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
                                        error={categoryInput.error_list.name}
                                    />
                                </div>
                                <div className="px-4 mb-7 ">
                                    <Textarea
                                        color="lightBlue"
                                        size="regular"
                                        outline={true}
                                        placeholder="Mô tả"
                                        name="descrip"
                                        onChange={handleInput}
                                        value={categoryInput.descrip}
                                        error={categoryInput.error_list.descrip}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-5 ">
                                    <div className="col-span-1 lg:col-span-1">
                                        <Checkbox
                                            color="green"
                                            text="Hoạt động/Không hoạt động"
                                            id="checkbox"
                                            name="status"
                                            onChange={handleInput}
                                            value={categoryInput.status}
                                            error={categoryInput.error_list.status}
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-1">
                                        <Checkbox
                                            color="green"
                                            text="Đặc sắc/Không đặc sắc"
                                            id="checkbox"
                                            name="featured"
                                            onChange={handleInput}
                                            value={categoryInput.featured}
                                            error={categoryInput.error_list.featured}
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-1">
                                        <Checkbox
                                            color="green"
                                            text="Phổ biến/Không phổ biến"
                                            id="checkbox"
                                            name="popular"
                                            onChange={handleInput}
                                            value={categoryInput.popular}
                                            error={categoryInput.error_list.popular}
                                        />
                                    </div>
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
                        <TabPane active={openTab === 3 ? true : false}>
                            <div className="px-4 mb-7 w-full">

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
                        Tạo danh mục
                    </Button>
                </Tab>
            </form>
        </div>
    );
}
