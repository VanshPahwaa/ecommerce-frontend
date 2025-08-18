import { useEffect } from "react"


import CategoryFilters from '../components/products/CategoryFilters'
import CorouselSwiper from "../components/Slides/CorouselSwiper"


import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../redux-features/cart/cartApi'
import { getOrderByUserIdAsync } from "../redux-features/order/orderApi"


function Home() {
    const dispatch = useDispatch()
    let loggedInUser = useSelector(state => state.user.loggedInUser)

    useEffect(() => {
        if (loggedInUser?.userId) {
            dispatch(fetchCart(loggedInUser.userId));
            dispatch(getOrderByUserIdAsync({ userId: loggedInUser.userId }));
        }
    }, [loggedInUser?.userId, dispatch]);

    return (
        <>

            <CorouselSwiper />
            <CategoryFilters />
        </>
    )
}

export default Home;
