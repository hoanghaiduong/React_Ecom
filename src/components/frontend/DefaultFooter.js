import H5 from '@material-tailwind/react/Heading5';
import LeadText from '@material-tailwind/react/LeadText';
import Icon from '@material-tailwind/react/Icon';
import { Link } from 'react-router-dom';

export default function DefaultFooter() {
    return (
        <>
            <footer className="relative bg-gray-100 pt-8 pb-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap text-center lg:text-left pt-6">
                        <div className="w-full lg:w-6/12 px-4">
                            <H5 color="gray">Dương Tailwinds</H5>
                            <div className="-mt-4">
                                <LeadText color="blueGray">
                                    Mua bán dễ dàng với cửa hàng online của chúng tôi
                                </LeadText>
                            </div>
                            <div className="flex gap-2 mt-6 md:justify-start md:mb-0 mb-8 justify-center">
                                <Link
                                    to="#"
                                    className="grid place-items-center bg-white text-blue-600 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-facebook-square"
                                    />
                                </Link>
                                <Link
                                    to="#"
                                    className="grid place-items-center bg-white text-blue-400 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-twitter"
                                    />
                                </Link>
                                <Link
                                    to="#"
                                    className="grid place-items-center bg-white text-indigo-500 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-instagram"
                                    />
                                </Link>
                                <Link
                                    to="#"
                                    className="grid place-items-center bg-white text-pink-400 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-dribbble"
                                    />
                                </Link>
                                <Link
                                    to="#"
                                    className="grid place-items-center bg-white text-red-600 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-youtube"
                                    />
                                </Link>
                                <Link
                                    to="#"
                                    className="grid place-items-center bg-white text-gray-900 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-github"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap items-top">
                                <div className="w-full lg:w-4/12 px-4 ml-auto md:mb-0 mb-8">
                                    <span className="block uppercase text-gray-900 text-sm font-serif font-medium mb-2">
                                        Liên kết với chúng tôi
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/about-us"
                                                rel="noreferrer"
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                            >
                                                Về chúng tôi
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                                target="_blank"
                                                to="#"
                                            >
                                                Bài viết
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                            >
                                                Github
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                            >
                                                Sản phẩm khuyến mãi
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-gray-900 text-sm font-serif font-medium mb-2">
                                        Tài nguyên khác
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="#"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                            >
                                                Mã giảm giá
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                            >
                                                Voucher
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/contact-us"
                                                rel="noreferrer"
                                                className="text-gray-700 hover:text-gray-900 block pb-2 text-sm"
                                            >
                                                Liên hệ với chúng tôi
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-700 font-medium py-1">
                                Copyright © {new Date().getFullYear()} Dương Tailwinds by{' '}
                                <Link
                                    to="#"
                                    className="text-gray-700 hover:text-gray-900 transition-all"
                                >
                                    Hoàng Hải Dương
                                </Link>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
