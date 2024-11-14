
function Cart({cart, id, makePayment}) {


    function subtotal() {
        let tot = 0;
        cart.forEach(item => {
            tot += item.price * item.quantity; 
        }); 
        return tot
    }
    function commaAdd(num) {
        return num < 1000 ? num : `${Math.floor(num / 1000)}, ${addZero(num % 1000)}`
    }
    function addZero(num) {
        if (num < 10) {
            return num + '00';
        }else if (num < 100) {
            return num + '0';
        }else{
            return num;
        }
    }
    function deliveryPay(num) {
        return num < 5000 ? 360 : 700;
    }

    function total(subTot , deli) {
        return commaAdd(subTot + deli)
    }

    return(
        <div className='cart-item'>
            <div>
                {
                    cart.map((item, index) => {
                        return(
                            <div className="manage-item cart-conatiner">
                                    <img src={require(`./${item.imageName}`)} className='mange-image' />
                                    <div className='manage-item-details'>
                                        <div>
                                            <div className='manage-item-name'>{item.name}</div>
                                            <div className='manage-price'>Rs. {item.price} /1kg</div>
                                        </div>
                                        <div>
                                            <div className='manage-bio'>Quantity: {item.quantity} </div>
                                        </div>
                                    </div>        

                            </div> 
                        )
                    })
                }  
            </div>
            <div className='cal-container'>
                <div className='title'>
                    Order Summary
                </div>
                <div className='subtotal-box'>
                    <div>Subtotal:</div>
                    <div>Rs. {commaAdd(subtotal())}.00</div>
                </div>
                <div className='delivery-box'>
                    <div>Delivery Charges:</div>
                    <div>Rs. {deliveryPay(subtotal())}.00</div>
                </div>
                <div className='total-box'>
                    <div>Total</div>
                    <div>Rs.{total(subtotal(), deliveryPay(subtotal()))}.00</div>
                </div>
                <button className='payment-button' onClick={() => {
                     (window.confirm('Are you sure make payment?')) && (makePayment(id))
                    }}>
                    Continue to Payment
                </button>
            </div>
        </div>
    );
}
export default Cart;