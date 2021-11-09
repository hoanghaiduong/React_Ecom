import AboutUs from "pages/frontend/AboutUs";
import ContactUs from "pages/frontend/ContactUs";
import Home from "pages/frontend/Home";
import Profile from "pages/frontend/Profile";

const PublicRoutes = [
    {
        path: '/', exact: true, name: 'Home', component: Home
    },
    {
        path: '/profile', exact: true, name: 'Profile', component: Profile
    },
    {
        path: '/about-us', exact: true, name: 'AboutUs', component: AboutUs
    },
    {
        path: '/contact-us', exact: true, name: 'ContactUs', component: ContactUs
    },

]
export default PublicRoutes;