import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMessages } from '../../app/api';
import { MessageCard } from './MessageCard';
import { Filters, Message } from './types/type';
import { FilterContext } from './FilterContext';

export const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { filterState, setFilterState } = useContext(FilterContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages(filterState);
        console.log('Fetched messages:', fetchedMessages);
        setMessages(fetchedMessages);
      } catch (error) {
        if (error instanceof Error && error.message === '401') {
          navigate('/');
        }
        console.error('Failed to fetch messages:', error);
      }
    };

    getMessages();
  }, [filterState]);

  const handlePreviosPage = (): void => {
    if (filterState.pageNumber === 1) {
      return;
    } else {
      return setFilterState({
        ...filterState,
        pageNumber: filterState.pageNumber - 1,
      });
    }
  };

  const handleNextPage = (): void => {
    return setFilterState({
      ...filterState,
      pageNumber: filterState.pageNumber + 1,
    });
  };

  return (
    <>
      <div>
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
      <div>
        <button type="button" onClick={handlePreviosPage}>
          предыдущие новости
        </button>
        <div>{filterState.pageNumber}</div>
        <button type="button" onClick={handleNextPage}>
          следующие новости
        </button>
      </div>
    </>
  );
};

export default MessageList;
