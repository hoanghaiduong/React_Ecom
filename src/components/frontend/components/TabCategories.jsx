import { Card, CardHeader, CardRow, CardStatus, CardStatusFooter, Icon, Pagination, PaginationItem } from "@material-tailwind/react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Rating, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Swal from "sweetalert2";
export default function TabCategories() {
    const [loading, setshowLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let Mounted = true;
        axios.get('api/getCategory').then((res) => {
            const result = res.data;
            if (Mounted) {
                if (result.status === 200) {
                    setCategory(result.category);
                    setshowLoading(false);
                }
            }
        })
        return () => {
            Mounted = false;
            setshowLoading(false);
        }
    }, []);
    const handlePageF = (e) => {
        e.preventDefault();
        axios.get(`${category.first_page_url}`).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                console.log(result.category);
                setCategory(result.category);
            }
        })
    }
    const handlePageL = (e) => {
        e.preventDefault();
        axios.get(`${category.last_page_url}`).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                setCategory(result.category);
            }
        })
    }
    var categories = "";
    var loader = "";
    if (loading) {
        loader = (
            <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={3}
                    rowSpacing={{ xs: 1, sm: 2, md: 4 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Grid item sm={12} xs={12} md={4} >
                        <Stack spacing={1}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Stack>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} >
                        <Stack spacing={1}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Stack>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} >
                        <Stack spacing={1}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        );
    }
    else {
        categories = (category.data && category.data.map((item) => {
            return (
                <Grid item sm={12} xs={12} md={6} lg={4} key={item.id}>
                    <div className="mt-12 mb-8 px-5">
                        <Card>
                            <CardRow>
                                <CardHeader color="lightBlue" size="sm" iconOnly>
                                    <Icon name={item.name_icon} size="5xl" />
                                </CardHeader>
                                <CardStatus title={item.name} />

                            </CardRow>
                            <Box sx={{
                                display: 'flex', justifyContent: 'center'
                            }}>
                                <Rating
                                    name="text-feedback"
                                    value={item.Rating}
                                    readOnly
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                            </Box>
                            <CardStatusFooter color={item.RateUp > 50 ? 'green' : item.RateUp < 50 ? 'red' : ''} amount={item.RateUp ? item.RateUp : '0'} date={item.updated_at}>
                                <Icon color={item.RateUp > 50 ? 'green' : item.RateUp < 50 ? 'red' : ''} name={item.RateUp > 50 ? 'trending_up' : item.RateUp < 50 ? 'trending_down' : ''} />
                            </CardStatusFooter>
                        </Card>
                    </div>
                </Grid>
            );
        }))
    }
    console.log(category.data);
    return (
        <section className="relative py-4 my-6 bg-gray-100">
            <div className="container max-w-7xl px-8 mx-auto">
                <Card>
                    <Box sx={{ width: '100%' }}>
                        <TabContext value="1">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex justify-center">
                                <TabList>

                                    <Tab value="1" className="focus:outline-none" label={
                                        <Link to="/all-category">
                                            Danh Mục Sản Phẩm
                                        </Link>
                                    } />

                                </TabList>
                            </Box>
                            <TabPanel value="1" style={{ padding: 0 }}>
                                {loader && loader}
                                <Box sx={{ flexGrow: 2 }}>
                                    <Grid container spacing={3}
                                        rowSpacing={{ xs: 1, sm: 2, md: 4 }}
                                        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                                    >
                                        {categories}
                                    </Grid>
                                </Box>

                            </TabPanel>
                        </TabContext>
                        <div className="flex justify-center overflow-x-auto">
                            <Pagination>
                                <PaginationItem button className={`cursor-pointer `} onClick={handlePageF} ripple="dark">
                                    Đầu
                                </PaginationItem>
                                {category.links && category.links.map((item, id) => {
                                    return (
                                        <div key={id}>
                                            <PaginationItem className="cursor-pointer" onClick={() => {
                                                if (item.url != null) {
                                                    axios.get(`${item.url}`).then((res) => {
                                                        const result = res.data;
                                                        if (result.status === 200) { setCategory(result.category); }
                                                    })
                                                }
                                            }} color={`${item.active === true ? 'teal' : ''}`} ripple="light">
                                                {item.label === "&laquo; Previous" ? <Icon name="keyboard_arrow_left" /> : item.label === "Next &raquo;" ? <Icon name="keyboard_arrow_right" /> : item.label}
                                            </PaginationItem>
                                        </div>
                                    );
                                })}

                                <PaginationItem button className="cursor-pointer" onClick={handlePageL} ripple="dark">
                                    Cuối
                                </PaginationItem>

                            </Pagination>
                        </div>
                    </Box>
                </Card>
            </div>
        </section >

    );
}