import { useNavigate } from "react-router-dom";

function Nav( {setPageNum, cart} ) {

    const navigate = useNavigate();

    const cartNum = () => {
        let num = 0;
        cart.forEach(item => {
            num += item.quantity
        });
        return num;
    };

    return(
        <div className="navigate-container">
                <div className="green-mart">Green Mart</div>
                <div className="pages">
                    <div className="shop-page-name" onClick={() => {setPageNum(1)}}>Shop</div>
                    <div className="about-page-name" onClick={() => {navigate('/')}}>Log out</div>
                    <div className="mange-page-name" onClick={() => {setPageNum(2)}}>Mange Item</div>
                    <div className="profile-page-name">My Profile</div>
                    <button className="cart-button" onClick={() => {setPageNum(3)}}>Cart ({cartNum()})</button>
                </div>
        </div>
    );
}
export default Nav; 