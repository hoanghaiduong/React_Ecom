
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { Link } from '@mui/material';
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

import Label from "@material-tailwind/react/Label";
export default function ViewProductGrid() {
    const btnDel = useRef();
    const btnView = useRef();
    const btnEdit = useRef();
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
    console.log(products);
    var ViewProduct_list = "";
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
    else {
        ViewProduct_list = products.map((prod, index) => {
            return (
                <Card key={index} className="relative">
                    {/*   <Image
                        src={`http://localhost:8000/${prod.image}`}
                        rounded={false}
                        raised={true}
                    /> */}
                    <CardImage
                        src={`http://localhost:8000/${prod.image}`}
                        alt="Card Image"
                        className="sm:w-48 sm:h-48  w-100"
                    />
                    <CardBody>
                        <table>
                            <tbody>
                                <tr>
                                    <th className="text-left pr-3 py-2 text-green-600"> Tên sản phẩm </th>
                                    <td className="text-center"><Label color="gray"> {prod.name}</Label></td>
                                </tr>
                                <tr>
                                    <th className="text-left pr-3 py-2 text-green-600"> Danh mục sản phẩm</th>
                                    <td className="text-center"><Label color="gray">{prod.category.name}</Label></td>
                                </tr>
                                <tr>
                                    <th className="text-left pr-3 text-green-600">Mô tả sản phẩm</th>
                                </tr>
                                <tr>
                                    <td className="text-centerpy-2 text-indigo-400"><Label color="gray">{prod.description}</Label></td>
                                </tr>
                                <tr>
                                    <th className="text-left pr-3 py-2 text-green-600">Giá sản phẩm gốc</th>
                                    <td className="text-center"><Label color="lightBlue">{prod.original_price}</Label></td>
                                </tr>
                                <tr>
                                    <th className="text-left pr-3 py-2 text-green-600">Giá sản phẩm khuyến mãi</th>
                                    <td className="text-center"><Label color="pink">{prod.selling_price}</Label></td>
                                </tr>
                            </tbody>
                        </table>




                    </CardBody>

                    <CardFooter className="mt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            <Link href={`view-product/${prod.id}`}>
                                <Button
                                    color="lightBlue"
                                    buttonType="outline"
                                    size="md"
                                    ref={btnView}
                                    block={true}
                                    rounded={false}
                                    ripple="dark"
                                >
                                    <Icon name="visibility" size="md" />
                                </Button>
                                <Tooltips placement="left" ref={btnView}>
                                    <TooltipsContent>Xem sản phẩm</TooltipsContent>
                                </Tooltips>
                            </Link>


                            <Link href={`edit-product/${prod.id}`}>
                                <Button
                                    color="gray"
                                    buttonType="outline"
                                    size="md"
                                    ref={btnEdit}
                                    block={true}
                                    rounded={false}
                                    ripple="dark"
                                >
                                    <Icon name="settings_suggest" size="md" />
                                </Button>
                                <Tooltips placement="bottom" ref={btnEdit}>
                                    <TooltipsContent>Sửa sản phẩm</TooltipsContent>
                                </Tooltips>
                            </Link>

                            <Link href="/admin">
                                <Button
                                    color="red"
                                    buttonType="outline"
                                    size="md"
                                    ref={btnDel}
                                    block={true}
                                    rounded={false}
                                    ripple="dark"
                                >
                                    <Icon name="auto_delete" size="md" />
                                </Button>
                                <Tooltips placement="right" ref={btnDel}>
                                    <TooltipsContent>Xoá sản phẩm</TooltipsContent>
                                </Tooltips>
                            </Link>

                        </div>

                    </CardFooter>
                </Card>
                /*   <Grid item xs={4} sm={4} md={4} key={index}>
                          <Card>
                              <CardActionArea>
                                  <CardMedia
                                      component="img"
                                      height="100"
                                      image={`http://localhost:8000/${prod.image}`}
                                      alt="green iguana"
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="div">
                                          Lizard
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                          Lizards are a widespread group of squamate reptiles, with over 6,000
                                          species, ranging across all continents except Antarctica
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions>
                                  <Button size="small" color="primary">
                                      Share
                                  </Button>
                              </CardActions>
                          </Card>
                     
  
                  </Grid>
   */
            );
        });
    }
    return (
        <>
            <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ViewProduct_list}
                    </div>
                </div>
            </div>
        </>
    );
}