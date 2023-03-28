import { createContext } from 'react';
import { Filters } from './types/type';

export const initialFilterState: Filters = {
  pageNumber: 1,
  pageSize: 10,
};

export const FilterContext = createContext<{
  filterState: Filters;
  setFilterState: React.Dispatch<React.SetStateAction<Filters>>;
}>({
  filterState: initialFilterState,
  setFilterState: () => {},
});
