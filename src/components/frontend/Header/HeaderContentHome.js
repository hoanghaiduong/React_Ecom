import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import Teamwork from 'assets/img/teamwork.jpeg';
import { Link } from 'react-router-dom';
import Button from "@material-tailwind/react/Button";
export default function HeaderContentHome() {
    return (
        <>
            <section className="relative py-4 my-6 bg-gray-100">
                <div className="container max-w-7xl px-8 mx-auto">
                    <Card>
                        <CardBody>
                            <div className="flex flex-wrap items-center">
                                <div className="w-full md:w-5/12 px-4 mx-auto">
                                    <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                        <Icon name="people" size="3xl" />
                                    </div>
                                    <H4 color="gray">Khám phá các sản phẩm nổi bật</H4>
                                    <LeadText color="blueGray">
                                        Tại đây chúng tôi cung cấp các mẫu sản phẩm chất lượng cao ,giá thành rẻ đảm bảo chính hãng 100% .
                                    </LeadText>
                                    <LeadText color="blueGray">
                                        Mời các bạn ghé thăm shop của chúng tôi ở link bên dưới
                                    </LeadText>
                                    <Link
                                        to="/shoping"
                                        className="font-medium text-light-blue-500 mt-2 inline-block"
                                    >
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="lg"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="dark"
                                        >
                                            GO TO SHOP
                                        </Button>
                                    </Link>
                                </div>

                                <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                                    <Card>
                                        <CardImage alt="Card Image" src={Teamwork} />
                                        <CardBody>
                                            <H6 color="gray">Đội ngũ làm việc của chúng tôi</H6>
                                            <Paragraph color="blueGray">
                                                The Arctic Ocean freezes every winter and
                                                much of the sea-ice then thaws every summer,
                                                and that process will continue whatever
                                                happens.
                                            </Paragraph>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

        </>
    );
}