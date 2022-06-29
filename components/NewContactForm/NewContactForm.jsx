import { useDispatch } from 'react-redux';

export const NewContactForm = ({ addedContact, mapEmojies }) => {

    const dispatch = useDispatch();
    const { name, surname, phone } = addedContact;

    const handlechange = (e, field) => {
        dispatch({ type: "ADDED_CONTACT_CHANGE", contact: { ...addedContact, [field]: e.target.value } })
    }

    return (<div className="contact-info-container">
        <div className="contact-data">
            <select className="emoji-select" onChange={(e) => handlechange(e, 'emoji')}> {mapEmojies} </select>
            <input autoFocus placeholder="Name..." value={name} onChange={(e) => handlechange(e, 'name')} />
            <input placeholder="Surname..." value={surname} onChange={(e) => handlechange(e, 'surname')} />
            <input placeholder="Phone..." maxLength="14" value={phone} onChange={(e) => handlechange(e, 'phone')} />
        </div>
    </div>)

}