
function ShopComponent({itemList, addCart, id}) {
    return(
        <div className="component-conatiner">
            {
                itemList.map(item => {
                    return(
                        <div key={item.id} className="item-conatiner">
                            <img src={require(`./${item.imageName}`)} className='item-image'/>
                            <div className='item-details'>
                                <div className='item-author-details'>
                                    <div className='item-name'>{item.name}</div>
                                    <div className='item-price'>Rs.{item.price}/ 1kg</div>
                                </div>
                                <button className='add-button' onClick={() => {addCart({id: item.id, name: item.name, price: item.price, quantity: 1, bio: item.bio, imageName: item.imageName, profileId: id})}}>
                                    Add
                                </button>
                            </div>
                            <div className='item-bio'>{item.bio}</div>
                        </div>
                    );
                })
            }
            
        </div>
    );
}
export default ShopComponent;