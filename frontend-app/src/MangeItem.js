import ManageForm from "./ManageForm.js";

function MangeItem( {deleteItem,  itemList, addItem, setIsSubmit, isSubmit, setSelectItem, selectItem, isEdit, setIsEdit, editItem } ) {

    return(
        <div className="manage-container">
            <ManageForm editItem={(data) => editItem(data)} isEdit={isEdit} selectItem={selectItem} isSubmit={isSubmit} addItem={addItem} setIsSubmit={(data) => setIsSubmit(data)}/>
            {
                itemList.map( (item,index) => {
                    return(
                        <div key={index} className="manage-item">
                            <img src={require(`./${item.imageName}`)} className='mange-image' />
                            <div className='manage-item-details'>
                                <div>
                                    <div className='manage-item-name'>{item.name}</div>
                                    <div className='manage-price'>Rs. {item.price} /1Kg</div>
                                    <input className='manage-price' value={item.price} type='text'/>
                                </div>
                                <div>
                                    <div className='manage-bio'>{item.bio}</div>
                                </div>
                            </div>
                            <div className='manage-button-list'>
                                <button className='save-button' onClick={() => {
                                    setSelectItem({id: item.id, name: item.name, price: item.price,bio: item.bio ,imageName: item.imageName});
                                    setIsEdit(true);
                                    }}>
                                    Edit
                                </button>
                                <button className='delete-button' onClick={() => window.confirm('Are you sure?') && deleteItem(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div> 
                    )
                })
            }
        </div>
    )
}

export default MangeItem;