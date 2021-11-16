import { Button, Checkbox, Icon, Input, Textarea, Card, CardHeader } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect, forwardRef } from "react";
import { Grid, Box, Typography, Pagination, CircularProgress, Backdrop, Tab, tabsClasses, TextField, FormControl, Autocomplete, FormControlLabel, Switch, Divider, Slide, Dialog, DialogTitle, Stack, Rating, useTheme, useMediaQuery, Select, MenuItem, InputLabel, Slider } from '@mui/material'
import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab'
import Swal from "sweetalert2";
import iconList from "./ListIcon";
import CodeIcon from '@mui/icons-material/Code';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SaveIcon from '@mui/icons-material/Save';
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
export default function Category() {

    /* Modal Responsive */
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    /* End Modal Responsive */

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
    /* Modal */
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const handleMaxWidthChange = (e) => {
        setMaxWidth(
            e.target.value,
        );
    };
    const handleFullWidthChange = (e) => {
        setFullWidth(e.target.checked);
    };
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState('');
    const handleClose = () => {
        setOpen(false);
    };
    /* End Modal */

    const [loading, setLoading] = useState(false);
    /* Tabs */
    const [tab, setTab] = useState('1');
    const handleTab = (event, newValue) => {
        setTab(newValue);
    };
    /* End Tabs */

    /* Phân trang  */
    //số bản ghi
    const [page, setPage] = useState(1);//mặc định page 1
    const [limit, setLimit] = useState(48);//100 limit /1 page 
    const [pages, setPages] = useState(Math.ceil(iconList.length / limit));//18 pages
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (e, value) => {
        setPage(value);
        setCurrentPage(value);
    };

    const handleChangeLimit = (e) => {
        setLimit(e.target.value);//ex 45
        //vậy limit number g là 45 
        setPages(Math.ceil(iconList.length / e.target.value));//total pages = total bản ghi(1890) / limit = 42 trang
    };


    const getPaginatedData = () => {
        const startIndex = currentPage * limit - limit;//1.trang đầu = 1 * 100 - 100 = 0 // 2. 2 * 100-100 = 100 //ex setLimit 45==0
        const endIndex = startIndex + limit;// trang kế tiếp  = 0 + 100= 100 //2. 100+100=200 //ex ==45
        return iconList.slice(startIndex, endIndex);//1. iconList(0,100); //2. iconList(100,200); //ex (0,45)
        //tiep theo chay iconList(100,200);
    };
    /* End phân trang Phân trang  */

    const [searchValue, setSearchValue] = useState("");
    const handleSearch = (e) => {
        e.persist = () => { };
        setSearchValue(e.target.value);
    }

    const [categoryInput, setCategoryInput] = useState({
        name: "",
        slug: "",
        status: false,
        featured: false,
        popular: false,
        descrip: "",
        meta_title: "",
        meta_keyword: "",
        name_icon: '',
        meta_descrip: "",
        RateUp: '',
        RateDown: '',
        Rating: 0,
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist = () => { };
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
        Rating: categoryInput.Rating,
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
                    Rating: '',
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

    /*
       if (loading) {
           return (
               <Backdrop
                   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                   open={loading}
                   onClick={handleClose}
               >
                   <CircularProgress color="inherit" />
               </Backdrop>
           ); 
           Swal.fire({
               timer:1500,
               timerProgressBar:true,
               didOpen:()=>{
                   Swal.showLoading();
               }
           })
       }
    */
    var ArrayIcon = "";
    var results = [];

    if (tab === '4') {
        ArrayIcon = getPaginatedData().map((item, id) => {
            if (searchValue.length > 0) {
                results = iconList.filter(item => item.toLowerCase().match(searchValue)).map((item, id) => {
                    return (
                        <Grid item xs={4} sm={3} md={2} lg={1} key={id} >
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', }}>
                                <Button
                                    color="blueGray"
                                    buttonType="outline"
                                    size="regular"
                                    rounded={false}
                                    block={true}
                                    iconOnly={false}
                                    ripple="dark"
                                    onClick={() => {
                                        setIdx(item);
                                        setOpen(true);
                                    }}
                                >
                                    <Icon name={item} size="5xl" />
                                </Button>

                            </Box>
                        </Grid>
                    );
                });
            }
            else {
                return (
                    <Grid item xs={4} sm={3} lg={1} md={2} key={id} >
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', }}>
                            <Button
                                color="blueGray"
                                buttonType="outline"
                                size="regular"
                                rounded={false}
                                block={true}
                                iconOnly={false}
                                ripple="dark"
                                onClick={() => {

                                    setIdx(item);
                                    setOpen(true);
                                }}
                            >
                                <Icon name={item} size="5xl" />
                            </Button>

                        </Box>
                    </Grid>
                );
            }

        })
    }

    console.log(results.length);
    console.log(categoryInput);
    console.log(ArrayIcon.length);
    return (
        <div className="pt-10 pb-10 px-3 md:px-8 sm:px-8 h-full">

            <Card>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTab}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                        '&.Mui-disabled': { opacity: 0.3 },
                                    },
                                }}>
                                <Tab
                                    className="focus:outline-none"
                                    icon={<CategoryIcon />}
                                    label="Tạo Danh Mục"
                                    value="1"
                                />
                                <Tab
                                    className="focus:outline-none"
                                    icon={<AssessmentIcon />}
                                    label="Thẻ Meta"
                                    value="2" />
                                <Tab
                                    className="focus:outline-none"
                                    icon={<MoreOutlinedIcon />}
                                    label="Mở rộng"
                                    value="3" />
                                <Tab
                                    className="focus:outline-none"
                                    icon={<CodeIcon />}
                                    label="Icon"
                                    value="4" />
                            </TabList>
                        </Box>
                        <form /*  onSubmit={submitCategory} */ id="CATEGORY_FORM">
                            <TabPanel value="1">
                                <Box sx={{ flexShrink: 1 }}>
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <FormControl fullWidth  >
                                                <TextField
                                                    required
                                                    label="URL Danh mục"
                                                    name="slug"
                                                    onChange={handleInput}
                                                    value={categoryInput.slug}
                                                    error={categoryInput.error_list.slug}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <FormControl fullWidth >
                                                <TextField
                                                    required
                                                    label="Tên"
                                                    name="name"
                                                    onChange={handleInput}
                                                    value={categoryInput.name}
                                                    error={categoryInput.error_list.name}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={12} xs={12}>
                                            <FormControl fullWidth >
                                                <TextField
                                                    required
                                                    multiline
                                                    rows={4}
                                                    label="Tên"
                                                    name="descrip"
                                                    onChange={handleInput}
                                                    value={categoryInput.descrip}
                                                    error={categoryInput.error_list.descrip}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={12} xs={12} sm={12}>
                                            <FormControl fullWidth >
                                                <Autocomplete
                                                    id="country-select-demo"
                                                    value={categoryInput.name_icon}
                                                    onChange={(e, name_icon) => {
                                                        setCategoryInput({ ...categoryInput, name_icon })
                                                    }}
                                                    options={iconList}
                                                    autoHighlight
                                                    getOptionLabel={(option) => option}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <Icon name={option} size="5xl" />
                                                            {option}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Chọn icon cho danh mục"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12} sm={12} >
                                            <Box sx={{ justifyContent: 'center' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={categoryInput.status} onChange={handleInput} name="status" />
                                                    }
                                                    label={categoryInput.status === true ? 'Hoạt động' : 'Không hoạt động'}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12} sm={12}>
                                            <Box sx={{ justifyContent: 'center' }} >
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={categoryInput.popular} onChange={handleInput} name="popular" />
                                                    }
                                                    label={categoryInput.popular === true ? 'Phổ Biến' : 'Không Phổ Biến'}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12} sm={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch checked={categoryInput.featured} onChange={handleInput} name="featured" />
                                                }
                                                label={categoryInput.featured === true ? 'Đặc Sắc' : 'Không Đặc Sắc'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box sx={{ flexShrink: 1 }}>
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <FormControl fullWidth >
                                                <TextField
                                                    required
                                                    multiline
                                                    rows={4}
                                                    label="Tiêu đề (meta)"
                                                    name="meta_title"
                                                    onChange={handleInput}
                                                    value={categoryInput.meta_title}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <FormControl fullWidth >
                                                <TextField
                                                    required
                                                    multiline
                                                    rows={4}
                                                    label="Mô tả (meta)"
                                                    name="meta_descrip"
                                                    onChange={handleInput}
                                                    value={categoryInput.meta_descrip}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={12} xs={12}>
                                            <FormControl fullWidth >
                                                <TextField
                                                    required
                                                    multiline
                                                    rows={4}
                                                    label="Thẻ keyword(từ khoá)"
                                                    name="meta_keyword"
                                                    onChange={handleInput}
                                                    value={categoryInput.meta_keyword}

                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                                <Box sx={{ flexGrow: 1 }} className="mb-5">
                                    <Grid container columnSpacing={5}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <InputLabel disabled>Chỉ số tăng (%)</InputLabel>
                                            <Slider
                                                aria-label="up"
                                                name="RateUp"
                                                valueLabelDisplay="auto"
                                                step={10}
                                                marks
                                                min={0}
                                                max={100}
                                                value={categoryInput.RateUp}
                                                onChange={handleInput}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <InputLabel disabled>Chỉ số giảm (%)</InputLabel>
                                            <Slider
                                                aria-label="down"
                                                name="RateDown"
                                                valueLabelDisplay="auto"
                                                onChange={handleInput}
                                                step={10}
                                                value={categoryInput.RateDown}
                                                marks
                                                min={0}
                                                max={100}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} >
                                            <InputLabel disabled>Đánh giá có sẵn</InputLabel>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Rating name="Rating" value={Number(categoryInput.Rating)} onChange={handleInput} size="large" />
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>
                        </form>

                        <TabPanel value="4">
                            <Box sx={{ flexGrow: 1 }} className="mb-5">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Số lượng Icon</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={limit}
                                                label="Số lượng Icon"
                                                onChange={handleChangeLimit}
                                            >
                                                <MenuItem value={limit} disabled>{limit}</MenuItem>
                                                <MenuItem value={48}>48</MenuItem>
                                                <MenuItem value={72}>72</MenuItem>
                                                <MenuItem value={96}>96</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={6}>

                                        <FormControl fullWidth  >
                                            <TextField
                                                required
                                                label="Search"
                                                value={searchValue}
                                                onChange={handleSearch}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={3}>
                                    {results}
                                    {ArrayIcon}
                                </Grid>
                                <Box >
                                    <Dialog Dialog
                                        open={open}
                                        fullWidth={fullWidth}
                                        maxWidth={maxWidth}

                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="dialog_with_id"
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <DialogTitle>{idx}</DialogTitle>
                                            <FormControlLabel
                                                sx={{ mt: 1 }}
                                                control={
                                                    <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                                                }
                                                label="Full width"
                                            />
                                        </Box>
                                        <div className="px-8 pb-6">

                                            <Box noValidate
                                                component="form"
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    width: '100%',
                                                }}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                                                    <Select
                                                        autoFocus
                                                        value={maxWidth}
                                                        onChange={handleMaxWidthChange}
                                                        label="Độ rộng"
                                                        inputProps={{
                                                            name: 'max-width',
                                                            id: 'max-width',
                                                        }}
                                                        fullWidth
                                                    >
                                                        <MenuItem value={false}>false</MenuItem>
                                                        <MenuItem value="xs">xs</MenuItem>
                                                        <MenuItem value="sm">sm</MenuItem>
                                                        <MenuItem value="md">md</MenuItem>
                                                        <MenuItem value="lg">lg</MenuItem>
                                                        <MenuItem value="xl">xl</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Button className="m-5">
                                                    <Icon name={idx} size="9xl" />
                                                </Button>
                                            </Box>
                                            <div className="flex justify-center my-3">
                                                <Button onClick={handleClose}
                                                    color="teal"
                                                    buttonType="outline"
                                                    size="regular"
                                                    rounded={false}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="dark"
                                                >Tôi hiểu rồi
                                                </Button>
                                            </div>
                                        </div>



                                    </Dialog>
                                </Box>
                            </Box>

                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', }} className="mt-12">
                                <Pagination count={pages} showFirstButton showLastButton page={page} /* value */ onChange={handleChangePage} />
                            </Box>
                        </TabPanel>

                        <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex', }}>
                            <LoadingButton
                                onClick={submitCategory}
                                endIcon={<SaveIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="outlined"
                                className="focus:outline-none"
                            >
                                Lưu lại
                            </LoadingButton>
                        </Box>
                    </TabContext>

                </Box>
            </Card>

        </div >
    );
}
