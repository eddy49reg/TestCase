import React, { useContext, useState } from 'react';
import { FilterContext, initialFilterState } from './FilterContext';
import { Filter, Filters } from './types/type';

export const FilterForm: React.FC = () => {
  const { filterState, setFilterState } = useContext(FilterContext);
  // const [filter, setFilter] = useState<Filters>(initialFilterState);
  // console.log(filter);
  console.log(filterState);

  const handleInputChange = (field: string, value: any) => {
    setFilterState({ ...filterState, [field]: value });
  };

  // const handleInputChange = (field: string, value: any) => {
  //   if (value === undefined || value === '') {
  //     setFilter((prevState) => {
  //       const newState = { ...prevState };
  //       delete newState[field as keyof Filters];
  //       return newState;
  //     });
  //   } else {
  //     setFilter({ ...filter, [field]: value });
  //   }
  // };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const applyFilters = () => {
    setFilterState(filterState);
  };

  return (
    <div>
      {/* Состояние просмотра */}
      <div>
        <label>Состояние просмотра:</label>
        <input
          type="radio"
          name="isRead"
          checked={filterState.isRead === undefined}
          onChange={() => handleInputChange('isRead', undefined)}
        />{' '}
        Все сообщения
        <input
          type="radio"
          name="isRead"
          checked={filterState.isRead === false}
          onChange={() => handleInputChange('isRead', false)}
        />{' '}
        Не прочитано
        <input
          type="radio"
          name="isRead"
          checked={filterState.isRead === true}
          onChange={() => handleInputChange('isRead', true)}
        />{' '}
        Прочитано
      </div>
      {/* Тональность */}
      <div>
        <label>Тональность:</label>
        <input
          type="radio"
          name="reaction"
          checked={filterState.reaction === 'positive'}
          onChange={() => handleInputChange('reaction', 'positive')}
        />{' '}
        Позитивная
        <input
          type="radio"
          name="reaction"
          checked={filterState.reaction === 'negative'}
          onChange={() => handleInputChange('reaction', 'negative')}
        />{' '}
        Негативная
      </div>
      {/* Сортировать */}
      <div>
        <label>Сортировать:</label>
        <select
          value={filterState.sortingField}
          onChange={(event) =>
            handleInputChange('sortingField', event.target.value)
          }
        >
          <option value="date">По дате публикации</option>
        </select>
        <input
          type="radio"
          name="sortingDirection"
          checked={filterState.sortingDirection === 'asc'}
          onChange={() => handleInputChange('sortingDirection', 'asc')}
        />{' '}
        По возрастанию
        <input
          type="radio"
          name="sortingDirection"
          checked={filterState.sortingDirection === 'desc'}
          onChange={() => handleInputChange('sortingDirection', 'desc')}
        />{' '}
        По убыванию
      </div>
      {/* Платформа */}
      <div>
        <label>Платформа:</label>
        <input
          type="checkbox"
          name="platformCode"
          value="all"
          checked={!filterState.platformCode}
          onChange={() => handleInputChange('platformCode', undefined)}
        />{' '}
        Все платформы
        <input
          type="checkbox"
          name="platformCode"
          value="tg"
          checked={filterState.platformCode === 'tg'}
          onChange={() => handleInputChange('platformCode', 'tg')}
        />{' '}
        Телеграм
        <input
          type="checkbox"
          name="platformCode"
          value="vk"
          checked={filterState.platformCode === 'vk'}
          onChange={() => handleInputChange('platformCode', 'vk')}
        />{' '}
        ВКонтакте
        <input
          type="checkbox"
          name="platformCode"
          value="yt"
          checked={filterState.platformCode === 'yt'}
          onChange={() => handleInputChange('platformCode', 'yt')}
        />{' '}
        YouTube
        <input
          type="checkbox"
          name="platformCode"
          value="ig"
          checked={filterState.platformCode === 'ig'}
          onChange={() => handleInputChange('platformCode', 'ig')}
        />{' '}
        Instagram
        <input
          type="checkbox"
          name="platformCode"
          value="ok"
          checked={filterState.platformCode === 'ok'}
          onChange={() => handleInputChange('platformCode', 'ok')}
        />{' '}
        Одноклассники
      </div>
      {/* Дата публикации */}
      <div>
        <label>Дата публикации:</label>
        <input
          type="datetime-local"
          value={filterState.dateFrom}
          onChange={(event) =>
            handleInputChange('dateFrom', event.target.value)
          }
        />
        <input
          type="datetime-local"
          value={filterState.dateTo}
          onChange={(event) => handleInputChange('dateTo', event.target.value)}
        />
      </div>
      {/* Кнопки */}
      <div>
        <button onClick={resetFilters}>Очистить фильтры</button>
        <button onClick={applyFilters}>Применить фильтры</button>
      </div>
    </div>
  );
};

export default FilterForm;
