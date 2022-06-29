import { useState } from "react";
import { useDispatch } from 'react-redux';
import { appButtons } from "../../constants/constants";


export const ContactInfoRow = ({ contact, emojies }) => {

    const dispatch = useDispatch();
    const [isEdited, setIsEdited] = useState(false);
    const [currentContact, setCurrentContact] = useState(contact);
    const { emoji, name, surname, phone, id } = currentContact;
    const { saveButton, editButton, deleteButton } = appButtons;

    const isDisabled = (name === '' || surname === '' || phone === '');

    const handleInputChange = (e, field) => {
        setCurrentContact({ ...currentContact, [field]: e.target.value })
    }

    const handleDelete = () => {
        dispatch({ type: "DELETE_CONTACT", id })
    }

    const handleEdit = () => {
        setIsEdited(true);
    }

    const handleSave = () => {
        dispatch({ type: "SAVE_CONTACT", contact: currentContact });
        setIsEdited(false);
    }


    return (<div className="contact-info-container">
        <div className="contact-data">
            {isEdited ? <select className="emoji-select" onChange={(e) => handleInputChange(e, 'emoji')}>{emojies}</select> : <input readOnly value={emoji} id="emoji-input" />}
            <input autoFocus placeholder="Name..." readOnly={!isEdited} value={name} onChange={(e) => handleInputChange(e, 'name')} />
            <input placeholder="Surname..." readOnly={!isEdited} value={surname} onChange={(e) => handleInputChange(e, 'surname')} />
            <input placeholder="Phone..." maxLength="14" readOnly={!isEdited} value={phone} onChange={(e) => handleInputChange(e, 'phone')} />
        </div>
        <div className="contact-buttons">
            {isEdited ?
                <button disabled={isDisabled} className="save-btn" onClick={handleSave}>{saveButton}</button> :
                <button className="edit-btn" onClick={handleEdit}>{editButton}</button>}
            <button className="delete-btn" onClick={handleDelete}>{deleteButton}</button>
        </div>
    </div>
    )

}