import { useState } from "react";
import { useDispatch } from 'react-redux';


export const ContactInfoRow = ({ contact }) => {

    const dispatch = useDispatch();
    const [isEdited, setIsEdited] = useState(false);
    const [currentContact, setCurrentContact] = useState(contact);
    const { name, surname, phone, id } = currentContact;

    const isDisabled = (name === '' || surname === '' || phone === '');

    const handleInputChange = (e, field) => {
        setCurrentContact({...currentContact, [field]: e.target.value})
    }

    const handleDelete = () => {
        dispatch({type: "DELETE_CONTACT", id})
    }

    const handleEdit = () => {
        setIsEdited(true);
    }

    const handleSave = () => {
        dispatch( {type: "SAVE_CONTACT", contact: currentContact });
        setIsEdited(false);
    }


    return (<div className="contact-info-container">
        <div className="contact-data">
            <input readOnly={!isEdited} value={"Emoji"} onChange={() => handleInputChange} />
            <input autoFocus placeholder="Name..." readOnly={!isEdited} value={name} onChange={(e) => handleInputChange(e, 'name')} />
            <input placeholder="Surname..." readOnly={!isEdited} value={surname} onChange={(e) => handleInputChange(e, 'surname')} />
            <input placeholder="Phone..." readOnly={!isEdited} value={phone} onChange={(e) => handleInputChange(e, 'phone')} />
        </div>
        <div className="contact-buttons">
            {isEdited ?
                <button disabled={isDisabled} className="save-btn" onClick={handleSave}>Save</button> :
                <button className="edit-btn" onClick={handleEdit}>Edit</button>}
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    </div>
    )

}