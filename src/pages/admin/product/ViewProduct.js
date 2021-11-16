import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from '@mui/x-data-grid';
import { CardMedia } from '@mui/material';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from '@material-tailwind/react/Button'
import { Link } from 'react-router-dom';
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import axios from 'axios';
import Label from "@material-tailwind/react/Label";
import StatusCard from "components/admin/StatusCard";
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {}
    })
);
export default function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState([]);
    useEffect(() => {
        document.title = "Xem sản phẩm của bạn"
        axios.get(`/api/view-product`).then((res) => {
            const result = res.data;
            if (result.status === 200) {
                setLoading(false);
                setProduct(result.data);
            }
        });
    }, []);
    const classes = useStyles((makeStyles) => {

    });
    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };

    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };
    console.log(products);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            headerAlign: 'center',
        },
        {
            field: `category_id`,
            headerName: 'Tên Danh Mục',
            width: 220,
            filterable: true,
            headerAlign: 'center',
            renderCell: (category) => {
                return (
                    category.row.category.name
                );
            },
        },
        {
            field: 'name',
            headerName: 'Tên Sản Phẩm',
            width: 200,
            headerAlign: 'center',
        },
        {
            field: 'original_price',
            headerName: 'Giá Gốc',
            type: 'number',
            width: 130,
            headerAlign: 'center',
            renderCell: (result) => {
                const original_price = result.row.original_price;
                const selling_price = result.row.selling_price;
                if (original_price) {
                    return (
                        <>
                            <span className="mr-2 text-left">Gốc</span>
                            <Label color="blueGray" className="text-center">{original_price}</Label>
                        </>
                    );
                }

            }
        },
        {
            field: 'quantity',
            headerName: 'Số lượng',
            width: 80,
            headerAlign: 'center',
            renderCell: (quantity) => {
                return (
                    quantity.row.quantity >= 0
                        ? quantity.row.quantity
                        : quantity.row.quantity < 0
                            ? <><Label color="red" className="text-center">Hết hàng</Label></>
                            : ''
                );
            }
        },
        {
            field: 'avatar',
            headerName: 'Hình ảnh',
            description: 'Cột này không thể sắp xếp.',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            width: 230,
            renderCell: (avatar) => {
                {
                    return (
                        <CardMedia
                            //onClick={}
                            component="img"
                            height="100%"
                            image={`http://localhost:8000/${avatar.row.avatar}`}
                            alt="green iguana"
                        />

                    );
                }
            }
            /*        valueGetter: (params) =>
                       `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
                       }`, */
        },
        {
            field: "Chức năng",
            sortable: false,
            width: 170,
            headerAlign: 'center',
            filterable: false,
            renderCell: (item) => {
                const idPr = item.row.id;
                return (
                    <>
                        <Dropdown
                            color="teal"
                            placement="bottom-start"
                            buttonText="Chức năng"
                            buttonType="link"
                            size="regular"
                            rounded={false}
                            block={true}
                            ripple="dark"
                        >

                            <DropdownItem color="lightBlue" ripple="light">
                                <Link to={`edit-product/${idPr}`} className="flex flex-row items-center">
                                    <Icon name="visibility" size="md" />
                                    <span className="ml-2">Xem chi tiết</span>
                                </Link>
                            </DropdownItem>

                            <DropdownItem color="teal" ripple="light">
                                <Link to={`edit-product/${idPr}`} className="flex flex-row items-center">
                                    <Icon name="settings_suggest" size="md" />
                                    <span className="ml-2">Sửa</span>
                                </Link>
                            </DropdownItem>
                            <DropdownItem color="red" ripple="light">
                                <Link to="#" className="flex flex-row items-center">
                                    <Icon name="delete_outline" size="md" />
                                    <span className="ml-2">Xoá</span>
                                </Link>
                            </DropdownItem>
                        </Dropdown>
                    </>
                );
            }
        }

    ];

    if (loading) {
        Swal.fire({
            timer: 200,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(() => {
            setLoading(false);
        });
    }
    return (
        <>
            <div className="pt-10  px-3 md:px-8 h-auto">
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

            <div className=" pb-14 px-3 md:px-8 h-auto">
                <Card>
                    <CardHeader color="blueGray" contentPosition="none">
                        <div className="sm:flex sm:justify-between sm:items-center block text-center">

                            <div>
                                <h2 className="text-white text-lg">Danh sách sản phẩm</h2>
                            </div>
                            <Link to="/admin/view-product-grid">
                                <Button
                                    color="blueGray"
                                    buttonType="filled"
                                    size="lg"
                                    rounded={false}
                                    iconOnly={false}
                                    ripple="light"
                                >
                                    {/*   <Icon name="" /> */}
                                    Xem dạng danh lưới
                                </Button>
                            </Link>

                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="container mx-auto max-w-full bg-white">
                            <div style={{ width: '100%' }}>
                                <DataGrid rows={products} rowHeight={150} autoHeight columns={columns}
                                    checkboxSelection
                                    onCellClick={handleCellClick}
                                    onRowClick={handleRowClick}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}