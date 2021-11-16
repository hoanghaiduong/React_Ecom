import Button from '@material-tailwind/react/Button';
import Icon from "@material-tailwind/react/Icon";
import Input from "@material-tailwind/react/Input";
import Tab from "@material-tailwind/react/Tab";
import TabContent from "@material-tailwind/react/TabContent";
import TabItem from "@material-tailwind/react/TabItem";
import TabList from "@material-tailwind/react/TabList";
import TabPane from "@material-tailwind/react/TabPane";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import StatusCard from "components/admin/StatusCard";
import Textarea from "@material-tailwind/react/Textarea";
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Checkbox from "@material-tailwind/react/Checkbox";
import Small from "@material-tailwind/react/Small";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
/* import { DropzoneArea } from 'material-ui-dropzone'; */
import { DropzoneDialog } from 'material-ui-dropzone';
import Swal from 'sweetalert2';

export default function Product() {
    useEffect(() => {
        axios.get(`/api/all-category`).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                setCategoryList(result.data);
            }
        })
    }, [])

    const [openTab, setOpenTab] = useState(1);
    const [open, setOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [productInput, setProductInput] = useState({
        category_id: '',
        name: '',
        brand_id: '',
        tag_id: '',
        original_price: '',
        quantity: 0,
        description: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        slug: '',
        selling_price: '',
        featured: false,
        popular: false,
        status: false,
    });
    const [listError, setListError] = useState([]);
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar]);
    const [picture, setPicture] = useState([]);//khởi tạo mảng chưa
    const handlePreviewAvatar = (e) => {
        const img = e.target.files[0];
        img.preview = URL.createObjectURL(img);
        setAvatar(img);
    }

    const handleInput = (e) => {
        e.persist = () => { };
        const ProductName = e.target.name;
        const ProductValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setProductInput({
            ...productInput,
            [ProductName]: ProductValue
        });
    }
    const handleImage = (files) => {
        //files la mot array []

        setPicture({
            image: files
        });
        setOpen(false);
    }
    const arr_image = picture.image;

    const formData = new FormData();

    arr_image && arr_image.forEach((i) => {
        formData.append('image', i);
    });

    formData.append('avatar', avatar);
    formData.append('category_id', productInput.category_id);
    formData.append('brand_id', productInput.brand_id);
    formData.append('tag_id', productInput.tag_id);
    formData.append('name', productInput.name);
    formData.append('original_price', productInput.original_price);
    formData.append('quantity', productInput.quantity);
    formData.append('description', productInput.description);
    formData.append('meta_title', productInput.meta_title);
    formData.append('meta_keyword', productInput.meta_keyword);
    formData.append('meta_description', productInput.meta_description);
    formData.append('slug', productInput.slug);
    formData.append('selling_price', productInput.selling_price);
    formData.append('featured', productInput.featured === true ? 1 : 0);
    formData.append('popular', productInput.popular === true ? 1 : 0);
    formData.append('status', productInput.status === true ? 1 : 0);

    const submitProduct = (e) => {
        e.preventDefault();
        axios.post(`/api/store-product`, formData).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                document.getElementById('Product_FORM').reset();
                Swal.fire({
                    icon: 'success',
                    title: result.message
                })
                setProductInput({
                    category_id: '',
                    name: '',
                    brand_id: '',
                    tag_id: '',
                    original_price: '',
                    quantity: '',
                    description: '',
                    meta_title: '',
                    meta_keyword: '',
                    meta_description: '',
                    slug: '',
                    selling_price: '',
                    featured: '',
                    popular: '',
                    status: '',
                });
                setPicture(['']);
                setAvatar('');
                setListError(['']);
            }
            else if (result.status === 422) {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                })//result.errors
                setListError(result.errors);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                })
            }

        })
    }

    return (
        <>
            <div className="pt-14  px-3 md:px-8 h-auto">
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

            <div className="pt-10 pb-28 px-3 md:px-8 sm:px-8 h-full -mt-10">
                <form encType="mutipart/form-data" onSubmit={submitProduct} id="Product_FORM">
                    <Tab className="z-0">
                        <TabList color="red" className="flex flex-col sm:flex-row">
                            <TabItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                ripple="light"
                                active={openTab === 1 ? true : false}
                                href="tabItem"
                            >
                                <Icon name="info" size="lg" />
                                Thông tin sản phẩm
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
                                <Icon name="sell" size="lg" />
                                Thẻ SEO TAG
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
                                <Icon name="code" size="lg" />
                                Khác
                            </TabItem>
                        </TabList>

                        <TabContent>
                            <TabPane active={openTab === 1 ? true : false}>
                                <div className="px-4 mb-7 w-full">
                                    <FormControl fullWidth >
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Vui lòng chọn danh mục sản phẩm"
                                            name="category_id"
                                            helperText="Bắt buộc"
                                            onChange={handleInput}
                                            value={productInput.category_id}
                                            error={listError.category_id}
                                            required

                                        >
                                            {categoryList.map((item) => {
                                                return (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </TextField>

                                    </FormControl>
                                </div>
                                <div className="px-4 mb-7 w-full">
                                    <Input
                                        outline
                                        type="text"
                                        color="lightBlue"
                                        placeholder="Tên sản phẩm"
                                        name="name"
                                        onChange={handleInput}
                                        value={productInput.name}
                                        error={listError.name}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-5">
                                    <div className="col-span-2 lg:col-span-1">
                                        <FormControl fullWidth>
                                            <TextField
                                                id="outlined-number"
                                                label="Giá tiền"
                                                type="number"
                                                name="original_price"
                                                placeholder="USD"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                minRows="0"
                                                onChange={handleInput}
                                                value={productInput.original_price}
                                                error={listError.original_price}
                                            />

                                        </FormControl>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1 px-4">

                                        <InputLabel id="demo-simple-select-label"
                                            required={true}
                                            variant="outlined"
                                            error={listError.quantity}
                                        >Số lượng</InputLabel>

                                        <Slider defaultValue={0} aria-label="Default"
                                            name="quantity"
                                            onChange={handleInput}
                                            valueLabelDisplay="auto"
                                            required
                                            color={listError.quantity ? 'secondary' : 'primary'}
                                        />

                                        <Small color="red"  >{listError.quantity}</Small>

                                    </div>
                                </div>
                                <div className="px-4 mb-7 w-full">
                                    <Textarea
                                        color="lightBlue"
                                        size="sm"
                                        outline={true}
                                        placeholder="Mô tả sản phẩm"
                                        name="description"
                                        onChange={handleInput}
                                        value={productInput.description}
                                        error={listError.description}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:gap-4 gap-0">
                                    <div className="col-span-2 lg:col-span-1 mb-5 md:mb-0 ">
                                        <Button
                                            color="lightBlue"
                                            buttonType="outline"
                                            size="lg"
                                            rounded={false}
                                            iconOnly={false}
                                            ripple="dark"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpen(true);
                                            }}
                                            className="w-full"
                                        >
                                            <Icon name="" />
                                            Tải Album ảnh lên
                                        </Button>
                                        <DropzoneDialog
                                            acceptedFiles={['image/*']}
                                            cancelButtonText={"Trở về"}
                                            submitButtonText={"Xác nhận"}
                                            filesLimit={5}
                                            maxFileSize={50000000}
                                            open={open}
                                            onClose={() => setOpen(false)}
                                            name="image"
                                            onSave={handleImage}
                                            showPreviews={true}
                                            showFileNamesInPreview={true}
                                        />

                                        <Small color="red">{listError.image}</Small>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1 mb-5 md:mb-0">
                                        <label htmlFor="icon-button-file">
                                            <Input required accept="image/*" id="icon-button-file" type="file" placeholder="Ảnh sản phẩm" onChange={handlePreviewAvatar} error={listError.avatar} />
                                            <IconButton color="info" aria-label="upload picture" component="span" aria-required >
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                        {avatar && <Card>
                                            <img src={avatar.preview} style={{ width: '100%', height: '70%' }} />
                                        </Card>
                                        }
                                    </div>
                                </div>

                            </TabPane>
                            <TabPane active={openTab === 2 ? true : false}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Tiêu đề (SEO)"
                                            name="meta_title"
                                            onChange={handleInput}
                                            value={productInput.meta_title}
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Mô tả (SEO)"
                                            name="meta_description"
                                            onChange={handleInput}
                                            value={productInput.meta_description}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Textarea
                                            color="lightBlue"
                                            size="sm"
                                            outline={true}
                                            placeholder="Từ khoá (SEO)"
                                            name="meta_keyword"
                                            onChange={handleInput}
                                            value={productInput.meta_keyword}
                                        />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane active={openTab === 3 ? true : false}>
                                <div className="px-4 mb-7 w-full">
                                    <Input
                                        outline
                                        type="text"
                                        color="lightBlue"
                                        placeholder="Thương hiệu"
                                        name="brand_id"
                                        onChange={handleInput}
                                        value={productInput.brand_id}

                                    />
                                </div>
                                <div className="px-4 mb-7 w-full">
                                    <Input
                                        outline
                                        type="text"
                                        color="lightBlue"
                                        placeholder="Thêm thẻ"
                                        name="tag_id"
                                        onChange={handleInput}
                                        value={productInput.tag_id}
                                    />
                                </div>
                                <div className="px-4 mb-7 w-full">
                                    <Input
                                        outline
                                        type="text"
                                        color="lightBlue"
                                        placeholder="URL"
                                        name="slug"
                                        onChange={handleInput}
                                        value={productInput.slug}
                                        error={listError.slug}
                                    />
                                </div>
                                <div className="px-4 mb-7 w-full">
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-number"
                                            label="Giá khuyến mãi"
                                            type="number"
                                            placeholder="$"
                                            name="selling_price"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInput}
                                            value={productInput.selling_price}
                                        />
                                    </FormControl>
                                </div>
                                <div className="px-4 mb-7 w-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                                        <div className="col-span-1 lg:col-span-1">
                                            <Checkbox
                                                color="cyan"
                                                text="Đặc sắc/Không đặc sắc"
                                                id="checkbox1"
                                                name="featured"
                                                onChange={handleInput}
                                                value={productInput.featured}
                                            />
                                        </div>
                                        <div className="col-span-1 lg:col-span-1">
                                            <Checkbox
                                                color="lightBlue"
                                                text="Phổ biến/Không phổ biến"
                                                id="checkbox2"
                                                name="popular"
                                                onChange={handleInput}
                                                value={productInput.popular}
                                            />
                                        </div>
                                        <div className="col-span-1 lg:col-span-1">
                                            <Checkbox
                                                color="green"
                                                text="Hoạt động/Không hoạt động"
                                                id="checkbox3"
                                                name="status"
                                                onChange={handleInput}
                                                value={productInput.status}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                        <Button
                            color="red"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                        >
                            Tạo sản phẩm
                        </Button>
                    </Tab>
                </form>
            </div>
        </>
    );
}