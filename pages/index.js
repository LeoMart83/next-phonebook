import { appConstants } from "../constants/constants";
import { ContactInfoRow } from "../components/ContactInfoRow/ContactInfoRow";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { NewContactForm } from "../components/NewContactForm/NewContactForm";


const Index = ({ contacts, searchTerm, nowAddingNewContact, addedContact }) => {

    const dispatch = useDispatch();
    const isDisabled = (addedContact.name === "" || addedContact.surname === "" || addedContact.phone === "");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('contacts')
            if (data) {
                dispatch({ type: "SET_CONTACTS", contacts: JSON.parse(data) });
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }, [contacts]);

    const handleSearchTermChange = (e) => {
        dispatch({ type: "SEARCH_TERM_CHANGE", newSearchTerm: e.target.value })
    }

    const handleAddingNewContact = () => {
        dispatch({ type: "CHANGE_ADDING_NEW_CONTACT" })

    }

    const handleSavingNewContact = () => {
        dispatch({ type: "CHANGE_ADDING_NEW_CONTACT" });
        dispatch({ type: "ADDED_CONTACT_SAVED" });
    }

    const handleCancellingNewContact = () => {
        dispatch({ type: "CHANGE_ADDING_NEW_CONTACT" });
        dispatch({ type: "ADDED_CONTACT_CANCELED" })
    }

    const filteredContacs = contacts?.filter(({ name, surname, phone }) =>
        name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone?.toLowerCase().includes(searchTerm.toLowerCase()));

    const contactsToDisplay = filteredContacs?.map(contact => <ContactInfoRow key={contact.id} contact={contact} />);

    return (
        <div className="app-container">
            <div className="app-title"> <h1>{appConstants.title}</h1> </div>
            <div className="new-contact">
                {nowAddingNewContact && <NewContactForm addedContact={addedContact} />}
                <div className="add-button">{nowAddingNewContact ? <div>
                    <button disabled={isDisabled} onClick={handleSavingNewContact}>Save</button>
                    <button onClick={handleCancellingNewContact}>Cancel</button></div> :
                    <button onClick={handleAddingNewContact}>Add</button>}</div></div>
            <div className="filter"><input placeholder="Search..." value={searchTerm} onChange={handleSearchTermChange} /></div>
            {contactsToDisplay}
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        contacts: state.contactsReducer.contacts,
        searchTerm: state.contactsReducer.searchTerm,
        nowAddingNewContact: state.contactsReducer.nowAddingNewContact,
        addedContact: state.contactsReducer.addedContact

    })
}

export default connect(mapStateToProps, null)(Index);