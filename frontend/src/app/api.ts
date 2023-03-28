import {
  Filters,
  Message,
  UpdatedMessageFields,
} from '../components/messages/types/type';
export async function fetchMessages(filters: Filters): Promise<Message[]> {
  // const formatDate = (dateString: string | undefined) => {
  //   if (dateString) return dateString + ':00.000Z';
  // };
  // const formattedFilters = {
  //   ...filters,
  //   dateFrom: formatDate(filters.dateFrom),
  //   dateTo: formatDate(filters.dateTo),
  // };
  console.log('Fetching messages with filters:', filters);
  const queryParams = new URLSearchParams(
    Object.entries(filters).map(([key, value]) => [key, String(value)])
  ).toString();

  // const queryParams = new URLSearchParams(
  //   Object.entries({
  //     platformCode: 'tg',
  //     dateFrom: '2015-01-28T09:35:00.000Z',
  //     dateTo: '2035-01-28T09:35:00.000Z',
  //     pageNumber: 1,
  //     pageSize: 100,
  //     reaction: 'positive',
  //     sortingDirection: 'asc',
  //     sortingField: 'date',
  //   }).map(([key, value]) => [key, String(value)])
  // ).toString();

  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(
    `http://localhost:4000/messages?${queryParams}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('401');
    }
    throw new Error('Failed to fetch messages');
  }

  return (await response.json()).data;
}

export async function updateMessage(
  messageId: Message['id'],
  updatedFields: UpdatedMessageFields
) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(
      `http://localhost:4000/messages/${messageId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedFields),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Ошибка при обновлении сообщения: ${response.statusText}`
      );
    }

    const updatedMessage = await response.json();
    console.log(updateMessage);
    return updatedMessage;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
}
