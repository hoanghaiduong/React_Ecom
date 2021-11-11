import StatusCard from '../components/StatusCard';

export default function SubHeaderHome() {
    return (
        <section className=" bg-gray-100 -mt-32">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="stars" title="Dịch vụ">
                        Cửa hàng chúng tôi luôn cung cấp các dịch vụ tốt nhất cho khách hàng và cam kết mang lại sự hài lòng cho khách hàng đến 99%
                    </StatusCard>
                    <StatusCard
                        color="lightBlue"
                        icon="autorenew"
                        title="Niềm tin"
                    >
                        Niềm tin của các bạn là động lực để chúng tôi phát triển lớn mạnh về lĩnh vực kinh doanh online
                    </StatusCard>
                    <StatusCard
                        color="teal"
                        icon="fingerprint"
                        title="Chất lượng"
                    >
                        Sản phẩm được xuất xứ nhập khẩu từ các thương hiệu lớn như Chanel.
                        Hermès.
                        Gucci.
                        Louis Vuitton.
                        Prada.
                        Dior.
                        Burberry.
                        Dolce & Gabbana.
                    </StatusCard>
                </div>


            </div>
        </section>
    );
}
