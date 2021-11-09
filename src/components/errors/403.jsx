import H1 from "@material-tailwind/react/Heading1";
import H3 from "@material-tailwind/react/Heading3";
import Button from "@material-tailwind/react/Button";
import Card from "@material-tailwind/react/Card";
import Icon from "@material-tailwind/react/Icon";
import { Link } from "react-router-dom";
export default function Page403() {
  return (
    <>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
        <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-screen" />
        <div className="container max-w-8xl relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <Card>
                <Icon name="error" size="5xl" color="red" />
                <H1 color="red">ERROR !</H1>
                <H3>PAGE 403 | Forbidden</H3>
                <div  className="flex w-100  justify-center items-center">
                  <Button
                    color="red"
                    buttonType="outline"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                  >
                    <Link to="/">Quay lại</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
