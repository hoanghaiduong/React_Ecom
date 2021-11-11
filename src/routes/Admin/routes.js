import Dashboard from 'pages/admin/Dashboard';
import Settings from 'pages/admin/Settings';
import Category from 'pages/admin/category/Category';
import Maps from 'pages/admin/Maps';
import ViewCategory from 'pages/admin/category/ViewCategory';
import EditCategory from 'pages/admin/category/EditCategory';
import Product from 'pages/admin/product/Product';
import ViewProduct from 'pages/admin/product/ViewProduct';
import EditProduct from 'pages/admin/product/EditProduct';
import ViewProductGrid from 'pages/admin/product/ViewProductGrid';
const routeAdmin = [
    {
        path: '/admin', exact: true, name: 'Admin'
    },
    {
        path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard
    },
    {
        path: '/admin/category', exact: true, name: 'Category', component: Category
    },
    {
        path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory
    },
    {
        path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory
    },
    {
        path: '/admin/add-product', exact: true, name: 'Product', component: Product
    },
    {
        path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct
    },
    {
        path: '/admin/view-product-grid', exact: true, name: 'ViewProductGrid', component: ViewProductGrid
    },
    {
        path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct
    },
    {
        path: '/admin/profile', exact: true, name: 'Profile', component: Settings
    },
    {
        path: '/admin/maps', exact: true, name: 'Maps', component: Maps
    },
]
export default routeAdmin;

