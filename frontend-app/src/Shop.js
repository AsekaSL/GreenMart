import Nav from "./Nav.js";
import Title from "./Title.js";
import ShopComponent from "./ShopComponent.js";
import MangeItem from './MangeItem.js';
import Cart from './Cart.js';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


function Shop() {

    const location = useLocation();

    const [itemList, setItemList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [isEdit, setIsEdit] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [selectItem, setSelectItem] = useState({});
    const [cart, setCart] = useState([]);
    const [chngeCart, setChngeCart] = useState(false);

    const addItem = (data) => {
        axios.post(`http://localhost:3001/additem`, data)
            .then(response => {
                setIsSubmit(true);
                getItem();
            })
            .catch(error => {
                console.log(error);
            });
    }; 

    const getItem = () => {
        axios.get('http://localhost:3001/items')
            .then(response => {
                setItemList(response.data);
                setIsSubmit(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const editItem = (data) => {
        axios.put('http://localhost:3001/updateitem', data)
            .then(response => {
                setIsSubmit(true);
                getItem();
                setIsEdit(false);
            })
            .catch(error => {
                console.log(error);
            }); 
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3001/deleteItem?id=${id}`,id)
            .then(response => {
                setIsSubmit(true);
                getItem();
            })
            .catch(error => {
                console.log(error);
            }); 
    };

    const getCart = (data) => {
        axios.get(`http://localhost:3001/getcart?id=${data.id}`)
            .then(response => {
                setCart(response.data.cart);
                setChngeCart(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addCart = (data) => {
        console.log(data);
        axios.post('http://localhost:3001/addcart',data)
            .then(response => {
                setChngeCart(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const makePayment = (id) => {
        axios.delete(`http://localhost:3001/deletecart?id=${id}`)
            .then(response => {
                setPageNum(1);
                setChngeCart(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getItem();
        getCart(location.state);
    }, []);

    useEffect(() => {
        getCart(location.state);
    },[chngeCart])

    function pageSelect() {
        if (pageNum == 1) {
            return <ShopComponent addCart={addCart} itemList={itemList} id={location.state.id}/>
        }else if (pageNum == 2) {
            return <MangeItem deleteItem={deleteItem} editItem={(data) =>  editItem(data)} selectItem={selectItem} setSelectItem={(data) => setSelectItem(data)} isSubmit={isSubmit} setIsSubmit={(data) => setIsSubmit(data)} getItem={getItem} itemList={itemList} setIsEdit={(data) => setIsEdit(data)} isEdit={isEdit} addItem={addItem}/>
        }else if (pageNum == 3) {
            return <Cart id={location.state.id} location={location} cart={cart} setPageNum={(data) => setPageNum(data)} makePayment={makePayment}/>
        }
    }

    function pageTitle() {
        if (pageNum == 1) {
            return "Shop"
        }else if (pageNum == 2) {
            return "Manage Item"
        }else if (pageNum == 3) {
            return "Cart"
        }
    }

    return(
        <div className="shop-container">
            <Nav setPageNum={(data) => setPageNum(data)} cart={cart}/>
            <Title pageTitle={pageTitle}/>
            {
                pageSelect()
            }
            
        </div>
    )
}

export default Shop;