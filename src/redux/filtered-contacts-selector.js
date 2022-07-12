export const getFilteredContacts = ({ items, filter }) => {
  const preparedFilter = filter.toLowerCase();
  return items.filter(contact =>
    contact.name.toLowerCase().includes(preparedFilter)
  );
};
