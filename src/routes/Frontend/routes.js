import AboutUs from "pages/frontend/AboutUs";
import Category from "pages/frontend/Category";
import ContactUs from "pages/frontend/ContactUs";
import Home from "pages/frontend/Home";
import Product from "pages/frontend/Product";
import Profile from "pages/frontend/Profile";
import Shoping from "pages/frontend/Shoping";

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
    {
        path: '/shoping', exact: true, name: 'Shoping', component: Shoping
    },
    {
        path: '/view-product/:slug', exact: true, name: 'Shoping', component: Shoping
    },
    {
        path: '/all-category', exact: true, name: 'AllCategory', component: Category
    },
    {
        path: '/all-product', exact: true, name: 'AllProduct', component: Product
    },
]
export default PublicRoutes;