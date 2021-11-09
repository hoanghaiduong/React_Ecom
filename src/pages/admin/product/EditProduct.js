import Checkbox from "@material-tailwind/react/Checkbox";
import Card from "@material-tailwind/react/Card";
import Small from "@material-tailwind/react/Small";
import Textarea from "@material-tailwind/react/Textarea";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DropzoneArea } from 'material-ui-dropzone';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Input from "@material-tailwind/react/Input";
import InfoIcon from '@mui/icons-material/Info';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CodeIcon from '@mui/icons-material/Code';

import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useHistory } from "react-router";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
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

export default function EditProduct(props) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    // const [loading, setLoading] = useState(true);
    /* Tabs */
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value, setValue] = useState('1');
    /* End Tabs */

    /* ListCategory */
    const [categoryList, setCategoryList] = useState([]);
    /* End ListCategory */

    /* List Product Init */
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
    /* End Product Init */

    /* Init Error Array */
    const [listError, setListError] = useState([]);
    /* End Init Error Array */

    /* Avatar Product */
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        //clean up function
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar]);
    const handlePreviewAvatar = (e) => {
        const img = e.target.files[0];
        img.preview = URL.createObjectURL(img);
        setAvatar(img);
        productInput.avatar = '';
    }
    /* End Avatar Product */

    /* Album Image Array */
    const [picture, setPicture] = useState([]);
    const handleAlbum = (files) => {
        setPicture({
            ...picture,
            image: files
        });
    }
    /* End Album Image Array */

    /* Product ID */ //lấy id SP để truyền lên put
    const product_id = props.match.params.id;
    useEffect(() => {
        /* Fetch all category */
        axios.get(`/api/all-category`).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                setCategoryList(result.data);//set array 
            }
        });
        /* end Fetch all category */

        /* get id Product  */
        axios.get(`/api/edit-product/${product_id}`).then((res) => {
            setLoading(false);
            const result = res.data;
            if (result.status === 200) {
                setProductInput(result.data);
            }
            else if (result.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: result.message
                })
                history.push('/admin/view-product');
            }
        }).catch((err) => { console.log(err) })
    }, [props.match.params.id, history])


    //nhận dữ liệu
    const handleChangeInput = (e) => {
        e.persist = () => { };
        const inputValue = e.target.value;
        const inputName = e.target.name;
        const inputType = e.target.type;
        const checked = e.target.checked === true ? 1 : 0;
        setProductInput({
            ...productInput,
            [inputName]: inputType === 'checkbox' ? checked : inputValue,
        });
    };

    const arr_image = picture.image;
    const UpdateProduct = (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        arr_image && arr_image.forEach((i) => {
            formData.append('image', i);
        });
        console.log(picture.image);
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
        formData.append('featured', productInput.featured);
        formData.append('popular', productInput.popular);
        formData.append('status', productInput.status);
        axios.post(`/api/update-product/${product_id}`, formData).then((res) => {
            setLoading(false);
            const result = res.data;
            if (result.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: result.message
                })

                setListError(['']);
            }
            else if (result.status === 422) {
                setListError(result.errors);
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: result.errors
                })
            }
            else if (result.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: result.error
                })
                history.push('/admin/view-product');
            }
        })
    };
    /*  if (loading) {
         Swal.fire({
             timer: 100,
             timerProgressBar: false,
             didOpen: () => {
                 Swal.showLoading();
             },
         });
     }
  */
    console.log(productInput);
    console.log(picture.image);
    console.log(avatar);
    return (
        <>
            <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <Card>

                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <form encType="multipart/form-data" /* onSubmit={UpdateProduct} */ >
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} textColor="primary" indicatorColor="primary" aria-label="Lab Tabs">
                                            <Tab className="focus:outline-none" icon={<InfoIcon />} label="Thông tin" value="1" />
                                            <Tab className="focus:outline-none" icon={<BackupTableIcon />} label="SEO" value="2" />
                                            <Tab className="focus:outline-none" icon={<CodeIcon />} label="Khác" value="3" />
                                        </TabList>
                                    </Box>
                                    <div className="overflow-x-auto">
                                        <TabPanel value="1"  >

                                            <Box sx={{ flexGrow: 2 }}>
                                                <Grid container spacing={3} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    <Grid item sm={5} xs={12} md={6}>
                                                        <FormControl fullWidth >
                                                            <TextField
                                                                id="outlined-select-currency"
                                                                select
                                                                label="Vui lòng chọn danh mục sản phẩm"
                                                                name="category_id"
                                                                helperText="Bắt buộc"
                                                                onChange={handleChangeInput}
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
                                                    </Grid>
                                                    <Grid item sm={7} xs={12} md={6}>

                                                        <FormControl fullWidth >
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Tên sản phẩm"
                                                                name="name"

                                                                value={productInput.name}
                                                                onChange={handleChangeInput}
                                                                error={listError.name}
                                                            />
                                                        </FormControl>

                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={6}>
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
                                                                onChange={handleChangeInput}
                                                                value={productInput.original_price}
                                                                error={listError.original_price}
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                                                }}

                                                            />

                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8} md={6}>
                                                        <FormControl fullWidth>
                                                            <Typography gutterBottom >Số lượng</Typography>
                                                            {/*  <InputLabel id="demo-simple-select-label"
                                                            required={true}
                                                            variant="outlined"
                                                            error={listError.quantity}
                                                        >Số lượng</InputLabel> */}
                                                            <Slider aria-label="Default"
                                                                name="quantity"
                                                                onChange={handleChangeInput}
                                                                valueLabelDisplay="auto"
                                                                required
                                                                value={productInput.quantity}
                                                                color={listError.quantity ? 'secondary' : 'primary'}
                                                            />
                                                            {listError.quantity && <Small color="red">{listError.quantity}</Small>}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                id="outlined-multiline-static"
                                                                label="Mô tả"
                                                                multiline
                                                                rows={4}
                                                                name="description"
                                                                value={productInput.description}
                                                                onChange={handleChangeInput}
                                                                error={listError.description}
                                                            />

                                                        </FormControl>


                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth required>
                                                            <Typography gutterBottom >Ảnh đại diện</Typography>
                                                            <label htmlFor="icon-button-file">
                                                                <Input required accept="image/*" placeholder="" id="icon-button-file" type="file" onChange={handlePreviewAvatar} error={listError.avatar} />
                                                                <div className="flex flex-row justify-center">
                                                                    <IconButton color="info" aria-label="upload picture" component="span" aria-required >
                                                                        <PhotoCamera />
                                                                    </IconButton>
                                                                </div>
                                                            </label>

                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <FormControl fullWidth>
                                                            {avatar &&
                                                                <Card>
                                                                    <img src={avatar.preview} style={{ width: '50%', height: '50%', margin: '0 auto' }} />
                                                                </Card>
                                                            }
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            {productInput.avatar &&
                                                                <Card>
                                                                    <img src={`http://localhost:8000/${productInput.avatar}`} style={{ width: '50%', height: '50%', margin: '0 auto' }} />
                                                                </Card>
                                                            }
                                                        </FormControl>
                                                    </Grid>

                                                </Grid>
                                            </Box>

                                        </TabPanel>
                                        <TabPanel value="2">
                                            <Grid container spacing={3} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            label="Tiêu đề (SEO)"
                                                            multiline
                                                            rows={4}
                                                            name="meta_title"
                                                            onChange={handleChangeInput}
                                                            value={productInput.meta_title}
                                                        />

                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            label="Từ khoá (SEO)"
                                                            multiline
                                                            rows={4}
                                                            name="meta_keyword"
                                                            onChange={handleChangeInput}
                                                            value={productInput.meta_keyword}
                                                        />

                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            label="Mô tả (SEO)"
                                                            multiline
                                                            rows={4}
                                                            name="meta_description"
                                                            onChange={handleChangeInput}
                                                            value={productInput.meta_description}
                                                        />

                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <FormControl fullWidth required>
                                                        <DropzoneArea
                                                            name="image"
                                                            acceptedFiles={['image/*']}
                                                            dropzoneText={"Kéo thả ảnh album của bạn vào đây"}
                                                            onChange={handleAlbum}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="3">
                                            <Grid container spacing={3} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            label="Thương hiệu"
                                                            name="brand_id"
                                                            value={productInput.brand_id}
                                                            onChange={handleChangeInput}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            label="Thêm thẻ sản phẩm"
                                                            name="tag_id"
                                                            value={productInput.tag_id}
                                                            onChange={handleChangeInput}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            label="Sên URL"
                                                            name="slug"
                                                            value={productInput.slug}
                                                            onChange={handleChangeInput}
                                                            error={listError.slug}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <FormControl fullWidth>
                                                        <TextField

                                                            id="outlined-number"
                                                            label="Giá khuyến mãi"
                                                            type="number"
                                                            name="selling_price"
                                                            placeholder="USD"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            required
                                                            minRows="0"
                                                            onChange={handleChangeInput}
                                                            value={productInput.selling_price}
                                                            error={listError.selling_price}
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                                            }}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl fullWidth>
                                                        <Checkbox
                                                            color="cyan"
                                                            text="Đặc sắc/Không đặc sắc"
                                                            id="checkbox1"
                                                            name="featured"
                                                            onChange={handleChangeInput}
                                                            checked={productInput.featured}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl fullWidth>
                                                        <Checkbox
                                                            color="lightBlue"
                                                            text="Phổ biến/Không phổ biến"
                                                            id="checkbox2"
                                                            name="popular"
                                                            onChange={handleChangeInput}
                                                            checked={productInput.popular}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl fullWidth>
                                                        <Checkbox
                                                            color="green"
                                                            text="Hoạt động/Không hoạt động"
                                                            id="checkbox3"
                                                            name="status"
                                                            onChange={handleChangeInput}
                                                            checked={productInput.status}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        <Box sx={{ '& > button': { m: 1 } }} >
                                            <LoadingButton
                                                onClick={UpdateProduct}
                                                endIcon={<SendIcon />}
                                                loading={loading}
                                                loadingPosition="end"
                                                variant="outlined"
                                                className="focus:outline-none"
                                            >
                                                Lưu lại
                                            </LoadingButton>
                                        </Box>
                                    </div>
                                </TabContext>
                            </form>
                        </Box>
                    </Card>
                </div>
            </div>

        </>
    );
}