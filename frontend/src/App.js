import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  MyOrdersScreen,
  NotFound,
  OrderListScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductEditScreen,
  ProductAdminList,
  ProductDetailsScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
  UserEditScreen,
  UserListScreen,
  ProductListScreen,
} from './screens'
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='*' element={<NotFound />} /> */}
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/admin/productlist' element={<ProductAdminList />} />
        <Route
          path='/admin/productlist/page/:pageNumber'
          element={<ProductAdminList />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/productlist' element={<ProductListScreen />} />
        <Route path='/product/:id' element={<ProductDetailsScreen />} />
        <Route path='/cart/:id?' element={<CartScreen />} />
        <Route path='/shipping?' element={<ShippingScreen />} />
        <Route path='/payment?' element={<PaymentScreen />} />
        <Route path='/placeorder?' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/myorders' element={<MyOrdersScreen />} />
        <Route
          path='/search:keyword/page/:pageNumber'
          element={<HomeScreen />}
        />
        <Route path='/search/:keyword' element={<HomeScreen />} />
        <Route path='/page/:pageNumber' element={<HomeScreen />} />
        <Route path='/productlist/:category' element={<ProductListScreen />} />
        <Route
          path='/productlist/search:keyword/page/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route
          path='/productlist/page/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
