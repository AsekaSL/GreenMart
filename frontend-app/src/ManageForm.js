import React, { useEffect, useState} from "react";

function ManageForm({addItem, isSubmit, selectItem, isEdit, editItem}) {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageName, setImageName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setId(0);
        setName('');
        setPrice('');
        setImageName('');
        setBio('');
    }, [isSubmit]);

    useEffect(() => {
        setId(selectItem.id);
        setName(selectItem.name);
        setPrice(selectItem.price);
        setBio(selectItem.bio);
    },[selectItem])
    

    return(
        <div className="form-box">
            <div className="from-name">Add New Item</div>
            <div className="form-details">
                <div className="form-details-conatiner">
                    <div>ID: <input value={id} onChange={(e) => {setId(e.target.value)}} className='manage-item-name id-input' type="number" placeholder="Enter ID"/></div>
                    <div>Name: <input value={name} onChange={(e) => {setName(e.target.value)}} className='manage-item-name name-input' type="text" placeholder="Enter Name"/></div>
                    <div>Price /1Kg:  <input value={price} onChange={(e) => {setPrice(e.target.value)}} className='manage-price price-input' type="number" placeholder="Enter Price"/></div>
                </div>
                <div>
                    <img className='mange-image' src={require(`./${imageName}`)}/>
                    <input onChange={(e) => {setImageName(e.target.files[0].name)}} accept="image/*" type="file" />
                </div>
            </div>
            <div className="bio-details">
                <div>Bio: <input value={bio} onChange={(e) => {setBio(e.target.value)}} className='manage-bio bio-input' type="text" placeholder="Enter the bio"/></div>
                <button className='save-button' onClick={() => isEdit ? editItem({id,name,price,imageName,bio}) : addItem({id,name,price,imageName,bio})}>{
                        isEdit ? 'Update' : 'Add'
                    }</button>
            </div>
        </div>
    );
}

export default ManageForm;