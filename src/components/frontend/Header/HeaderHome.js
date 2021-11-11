import H4 from '@material-tailwind/react/Heading4';
import LeadText from '@material-tailwind/react/LeadText';
export default function HeaderHome() {
    return (
        <div className="relative flex content-center items-center justify-center h-screen">
            <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-screen" />
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
                        <H4 color="white">Nhận ưu đãi khủng ngay hôm nay</H4>
                        <div className="text-gray-200">
                            <LeadText color="gray-200">
                                Mua sắm thả ga với sự kiện BLack Friday 13.10
                            </LeadText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}