import { useState } from 'react';
import { FilterContext, initialFilterState } from './FilterContext';
import FilterForm from './FilterForm';
import MessageList from './MessageList';

const MessagesPage = () => {
  const [filterState, setFilterState] = useState(initialFilterState);

  return (
    <div>
      <h1>Messages Page</h1>
      <FilterContext.Provider value={{ filterState, setFilterState }}>
        <FilterForm />
        <MessageList />
      </FilterContext.Provider>
    </div>
  );
};

export default MessagesPage;
