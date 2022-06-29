import shortId from "shortid";

let defaultState = {
    contacts: [],
    searchTerm: '',
    nowAddingNewContact: false,
    addedContact: {
        emoji: '',
        name: '',
        surname: '',
        phone: '',
        isEdited: false,
    },

}

const contactsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_CONTACTS":
            return { ...state, contacts: action.contacts }
        case "SEARCH_TERM_CHANGE":
            return { ...state, searchTerm: action.newSearchTerm }
        case "CHANGE_ADDING_NEW_CONTACT":
            return { ...state, nowAddingNewContact: !state.nowAddingNewContact }
        case "ADDED_CONTACT_CHANGE":
            return { ...state, addedContact: action.contact }
        case "ADDED_CONTACT_CANCELED":
            return { ...state, addedContact: defaultState.addedContact }
        case "ADDED_CONTACT_SAVED":
            return { ...state, contacts: [...state.contacts, { ...state.addedContact, id: shortId.generate() }], addedContact: defaultState.addedContact }
        case "DELETE_CONTACT":
            return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.id) }
        case "SAVE_CONTACT":
            return { ...state, contacts: state.contacts.map(el => el.id === action.contact.id ? action.contact : el) }
        default:
            return state
    }
}

export default contactsReducer;