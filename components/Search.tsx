import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBooks } from '../store/slices/bookSlice';
import debounce from 'lodash.debounce';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Debounced function to dispatch search
  const debouncedDispatch = React.useMemo(
    () => debounce((keyword: string) => dispatch(setBooks(keyword)), 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedDispatch(searchTerm);
    // Cleanup function to cancel debounce on unmount or before next call
    return () => {
      debouncedDispatch.cancel();
    };
  }, [searchTerm, debouncedDispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search books by title, author, or ISBN"
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default Search;
