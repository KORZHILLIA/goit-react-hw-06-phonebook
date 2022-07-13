export const getFilteredContacts = ({ items, filter }) => {
  if (!filter) {
    return items;
  }
  const preparedFilter = filter.toLowerCase();
  return items.filter(contact =>
    contact.name.toLowerCase().includes(preparedFilter)
  );
};
