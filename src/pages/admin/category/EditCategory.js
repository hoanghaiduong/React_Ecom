import { Card } from "@material-tailwind/react";
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Backdrop, Box, CircularProgress, Tab, tabsClasses, useMediaQuery, useTheme } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import EditInfoCate from "./EditInfoCate";
import EditRateCate from "./EditRateCate";
import EditSeoCate from "./EditSeoCate";
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
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    /* Tabs */
    const [tab, setTab] = useState('1');
    const handleTab = (event, newValue) => {
        setTab(newValue);
    };
    /* End Tabs */

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

    const category_id = props.match.params.id;

    const [errorList, setErrorList] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/edit-category/${category_id}`)
            .then((res) => {
                setLoading(false);
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
        return () => {
            setLoading(false);
        }
    }, [category_id, history]);
    const handleInput = (e) => {
        e.persist = () => { };
        const categoryName = e.target.name;
        const checkboxType = e.target.type;
        const checkboxValue = e.target.checked === true ? 1 : 0;
        const categoryValue = e.target.value;
        setCategoryInput({
            ...categoryInput,
            [categoryName]: checkboxType === 'checkbox' ? checkboxValue : categoryValue,
        });
    };
    const ArrayIcon = (e, newValue) => {
        e.persist = () => { };
        setCategoryInput({
            ...categoryInput,
            name_icon: newValue
        })
    }
    const data = categoryInput;
    const updateCategory = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`/api/update-category/${category_id}`, data).then((res) => {
            const result = res.data;
            setLoading(false);
            if (result.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: result.message,
                })
                setErrorList([]);
            } else if (result.status === 422) {
                setLoading(false);
                setErrorList(result.error_list);
                Swal.fire({
                    icon: "error",
                    title: "Vui lồng kiểm tra đầu dữ liệu nhập",
                });

                //lỗi validate
            } else if (result.status === 404) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: result.message,
                }).then(() => {
                    history.push('/admin/view-category');
                });
            }
        }).catch(() => {
            setLoading(false);
        });
    };

    let load = "";
    if (loading) {
        load = (<Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        )
    }
    return (
        <>
            {load && load}
            <div className="pt-10 pb-28 px-3 md:px-8 sm:px-8 h-full">
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

                                </TabList>
                            </Box>
                            <form id="CATEGORY_FORM">
                                <TabPanel value="1">
                                    <EditInfoCate
                                        dataComponent={{ categoryInput, handleInput, errorList, ArrayIcon }} />
                                </TabPanel>
                                <TabPanel value="2">
                                    <EditSeoCate dataComponent={{ categoryInput, handleInput, errorList, ArrayIcon }} />
                                </TabPanel>
                                <TabPanel value="3">
                                    <EditRateCate dataComponent={{ categoryInput, handleInput, errorList, ArrayIcon }} />
                                </TabPanel>
                                <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex', }}>
                                    <LoadingButton
                                        onClick={updateCategory}
                                        endIcon={<SaveIcon />}
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="outlined"
                                        className="focus:outline-none"
                                    >
                                        Cập nhật
                                    </LoadingButton>
                                </Box>
                            </form>
                        </TabContext>
                    </Box>
                </Card>
            </div>
        </>
    );
}
