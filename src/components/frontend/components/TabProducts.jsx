import * as React from 'react';

import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import Card from "@material-tailwind/react/Card";
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import ProductPopular from '../API/ProductPopular';
import ProductSelling from '../API/ProductSelling';
import ProductFeatured from '../API/ProductFeatured';
export default function TabProducts() {
    const [valueProd, setValueProd] = useState('2');
    const handleChangeProduct = (event, newValue) => {
        setValueProd(newValue);
    };
    return (
        <section className="relative py-4 bg-gray-100">
            <div className="container max-w-7xl px-8 mx-auto">
                <Card>
                    <Box sx={{ width: '100%' }}>
                        <TabContext value={valueProd}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex justify-center">
                                <TabList variant="scrollable" onChange={handleChangeProduct}>
                                    <Tab value="1" className="focus:outline-none" label="Sản phẩm phổ biến" />
                                    <Tab value="2" className="focus:outline-none" label="Sản phẩm đang giảm giá" />
                                    <Tab value="3" className="focus:outline-none" label="Sản phẩm đặc sắc" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" style={{ padding: 0 }}>
                                <ProductPopular />
                            </TabPanel>
                            <TabPanel value="2" style={{ padding: 0 }}>
                                <ProductSelling />
                            </TabPanel>
                            <TabPanel value="3" style={{ padding: 0 }}>
                                <ProductFeatured />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Card>
            </div>
        </section >
    );
}