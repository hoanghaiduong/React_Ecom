import axios from "axios";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Pagination from "@material-tailwind/react/Pagination";
import PaginationItem from "@material-tailwind/react/PaginationItem";
import Icon from "@material-tailwind/react/Icon";
import Card from "@material-tailwind/react/Card";
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DetailsIcon from '@mui/icons-material/Details';
import MenuList from '@mui/material/MenuList';
import { red, green, grey, blueGrey, blue, lightBlue, lightGreen, pink, purple, yellow } from '@mui/material/colors';
import { Link } from "react-router-dom";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
export default function ProductFeatured() {
    const ITEM_HEIGHT = 50;

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handlePageF = (e) => {
        e.preventDefault();
        axios.get(`${product.first_page_url}`).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                setProduct(result.product_featured);
            }
        })
    }
    const handlePageL = (e) => {
        e.preventDefault();
        axios.get(`${product.last_page_url}`).then((res) => {
            const result = res.data;
            if (result.status === 200) {

                setProduct(result.product_featured);
            }
        })
    } /* 
    const handlePrevPage = (e) => {
        e.preventDefault();
        if (product.prev_page_url != null) {
            axios.get(`${product.prev_page_url}`).then((res) => {
                const result = res.data;
                if (result.status === 200) {
                    console.log(result.product_featured)
                    setProduct(result.product_featured);
                }
            })
        }
    }
   const handleNextPage = (e) => {
        e.preventDefault();
        if (product.next_page_url != null) {
            axios.get(`${product.next_page_url}`).then((res) => {

                const result = res.data;
                if (result.status === 200) {
                    console.log(result.product_featured)
                    setProduct(result.product_featured);
                }

            })
        }
    } */


    const [loading, setshowLoading] = useState(true);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        let Mounted = true;
        axios.get('api/getProduct').then((res) => {
            const result = res.data;
            if (Mounted) {
                if (result.status === 200) {
                    console.log(result.product_featured);
                    setProduct(result.product_featured);
                    setshowLoading(false);
                }
            }
        })
        return () => {
            Mounted = false;
            setshowLoading(false);
        }
    }, []);
    var ProductSell = "";

    if (loading) {
        return (
            <Box sx={{ flexGrow: 2 }}>

                <Grid container spacing={3}
                    rowSpacing={{ xs: 1, sm: 2, md: 4 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Grid item sm={12} xs={12} md={4} >
                        <Stack spacing={1}>
                            <Skeleton variant="text" />
                            <Skeleton variant="circular" width={100} height={100} />
                            <Skeleton variant="rectangular" width={'100%'} height={120} />
                        </Stack>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} >
                        <Stack spacing={1}>
                            <Skeleton variant="text" />
                            <Skeleton variant="circular" width={100} height={100} />
                            <Skeleton variant="rectangular" width={'100%'} height={120} />
                        </Stack>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} >
                        <Stack spacing={1}>
                            <Skeleton variant="text" />
                            <Skeleton variant="circular" width={100} height={100} />
                            <Skeleton variant="rectangular" width={'100%'} height={120} />
                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        );
    }
    else {
        ProductSell = product.data && product.data.map((prod, id) => {
            return (
                <Grid item sm={6} xs={12} md={4} key={id} >
                    <div className="my-6 px-5">
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar src={`http://localhost:8000/${prod.avatar}`} />
                                }
                                action={
                                    <IconButton
                                        aria-label="settings"
                                        className="focus:outline-none"
                                        id="long-button"
                                        aria-controls="long-menu"
                                        aria-expanded={openMenu ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={prod.name}
                                data-id={prod.id}
                                subheader={<>
                                    <div className="flex items-center mb-1">
                                        <div className="mr-3 w-25">
                                            Giá gốc
                                        </div>

                                        <Chip icon={<AttachMoneyOutlinedIcon />} variant="outlined" size="small"
                                            label=
                                            {
                                                <p className="line-through">{prod.original_price}</p>
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className="mr-3">
                                            Giá KM
                                        </div>{prod.selling_price
                                            ?
                                            <Chip icon={<AttachMoneyOutlinedIcon />} variant="outlined" size="small" label={prod.selling_price} /> : <Chip icon={<AttachMoneyOutlinedIcon />} variant="outlined" size="small" label={'0'} />}
                                    </div>

                                </>}
                            />
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '25ch',
                                    },
                                }}
                            >
                                <MenuList>
                                    <MenuItem onClick={handleCloseMenu}>
                                        <Link to="#">
                                            <DetailsIcon className="mr-3" />
                                            Chi tiết sản phẩm
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <CardMedia
                                component="img"
                                image={`http://localhost:8000/${prod.avatar}`}
                                alt={prod.name}
                                style={{ height: '300px' }}
                            />
                            {/*      <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={`flex items-center`}><MenuBookOutlinedIcon className={`mr-3`} />Mô tả</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" color="GrayText" >
                                        {prod.description}
                                    </Typography>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={`flex items-center`}><MonetizationOnOutlinedIcon className={`mr-3`} />Giá gốc</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" color="GrayText" className="text-center">
                                        <Chip label={prod.original_price} color="error" icon={<CheckCircleOutlineOutlinedIcon />} variant="outlined" className="w-full" />
                                    </Typography>

                                </AccordionDetails>
                            </Accordion> */}
                            {/* Share  */}
                            <CardActions disableSpacing className="flex justify-evenly">
                                <Link to={`add-favorite-list/${prod.id}`}>
                                    <IconButton aria-label="add to favorites" className="focus:outline-none">
                                        <FavoriteIcon />
                                    </IconButton>
                                </Link>
                                <Link to={`view-product/${prod.id}`}>
                                    <IconButton aria-label="share" className="focus:outline-none">
                                        <RemoveRedEyeOutlinedIcon />
                                    </IconButton>
                                </Link>
                                <Link to={`add-to-cart/${prod.id}`}>
                                    <IconButton aria-label="share" className="focus:outline-none">
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                        </Card>
                    </div>
                </Grid >
            );
        });

    }
    return (
        <>
            <Box sx={{ flexGrow: 3 }} >
                <Grid container spacing={2}
                    rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {ProductSell}
                </Grid>
                <div className="flex justify-center overflow-x-auto">
                    <Pagination>
                        <PaginationItem button className={`cursor-pointer `} onClick={handlePageF} ripple="dark">
                            Đầu
                        </PaginationItem>
                        {/*    <PaginationItem className="cursor-pointer" onClick={handlePrevPage} ripple="dark">
                        <Icon name="keyboard_arrow_left" />
                    </PaginationItem> */}
                        {product.links && product.links.map((item, id) => {
                            return (
                                <div key={id}>
                                    <PaginationItem className="cursor-pointer" onClick={() => {
                                        if (item.url != null) {
                                            axios.get(`${item.url}`).then((res) => {
                                                const result = res.data;
                                                if (result.status === 200) { setProduct(result.product_featured); }
                                            })
                                        }
                                    }} color={`${item.active === true ? 'teal' : ''}`} ripple="light">
                                        {item.label === "&laquo; Previous" ? <Icon name="keyboard_arrow_left" /> : item.label === "Next &raquo;" ? <Icon name="keyboard_arrow_right" /> : item.label}
                                    </PaginationItem>
                                </div>
                            );
                        })}
                        {/*  <PaginationItem className="cursor-pointer" onClick={handleNextPage} ripple="dark">
                        <Icon name="keyboard_arrow_right" />
                    </PaginationItem> */}
                        {/*  <PaginationItem className="cursor-pointer" color="teal" ripple="light">{product.current_page && product.current_page}</PaginationItem> */}
                        <PaginationItem button className="cursor-pointer" onClick={handlePageL} ripple="dark">
                            Cuối
                        </PaginationItem>

                    </Pagination>
                </div>
            </Box>
        </>
    );
}