import { useDispatch } from 'react-redux';

export const NewContactForm = ({ addedContact }) => {

    const dispatch = useDispatch();
    const { emoji, name, surname, phone } = addedContact;

    const handlechange = (e, field) => {
        dispatch({ type: "ADDED_CONTACT_CHANGE", contact: { ...addedContact, [field]: e.target.value } })
    }

    return (<div className="contact-info-container">
        <div className="contact-data">
            <input readOnly value={"Emoji"} onChange={() => { }} />
            <input autoFocus placeholder="Name..." value={name} onChange={(e) => handlechange(e, 'name')} />
            <input placeholder="Surname..." value={surname} onChange={(e) => handlechange(e, 'surname')} />
            <input placeholder="Phone..." value={phone} onChange={(e) => handlechange(e, 'phone')} />
        </div>
    </div>)

}