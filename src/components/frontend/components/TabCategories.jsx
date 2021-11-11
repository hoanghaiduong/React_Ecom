import * as React from 'react';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import Icon from "@material-tailwind/react/Icon";
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import Skeleton from '@mui/material/Skeleton';
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
    var categories = "";
    if (loading) {
        /*  return (
            
         ); */
    }
    else {
        categories = (category.data && category.data.map((item, id) => {
            return (

                <Grid item sm={6} xs={12} md={4} key={id}>
                    <div className="mt-12 mb-8 px-5">
                        <Card key={id}>
                            <CardRow>
                                <CardHeader color="green" size="md" iconOnly>
                                    <CategoryIcon fontSize="large" />
                                </CardHeader>
                                <CardStatus title={item.name} amount="350,000" />
                            </CardRow>

                            <CardStatusFooter color="green" amount="97%" date={item.updated_at}>
                                <Icon color="green" name="arrow_upward" />
                            </CardStatusFooter>
                        </Card>
                    </div>
                </Grid>


            );
        }))

    }
    console.log(category);
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
                                <Box sx={{ flexGrow: 2 }}>
                                    <Grid container spacing={3}
                                        rowSpacing={{ xs: 1, sm: 2, md: 4 }}
                                        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                                    >
                                        {categories}
                                    </Grid>
                                </Box>


                                <div className="flex justify-center overflow-x-auto">
                                    {/*   <Pagination>
                        <PaginationItem button className={`cursor-pointer `} onClick={handlePageF} ripple="dark">
                            Đầu
                        </PaginationItem>
                  
                     {/*    {product.links && product.links.map((item, id) => {
                            return (
                                <div key={id}>
                                    <PaginationItem className="cursor-pointer" onClick={() => {
                                        if (item.url != null) {
                                            axios.get(`${item.url}`).then((res) => {
                                                const result = res.data;
                                                if (result.status === 200) { setProduct(result.product_selling); }
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

                    </Pagination> */}
                                </div>


                            </TabPanel>
                        </TabContext>
                    </Box>
                </Card>
            </div>
        </section >
    );
}