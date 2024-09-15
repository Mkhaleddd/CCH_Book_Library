import React from 'react';

interface SortOptionsProps {
  sortCriteria: string;
  setSortCriteria: (criteria: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortCriteria, setSortCriteria }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="mb-4 w-full mx-auto">
      <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
      <select
        id="sort"
        value={sortCriteria}
        onChange={handleSortChange}
        className="p-2 border rounded-md"
      >
        <option value="TITLE_ASC">Title (A-Z)</option>
        <option value="TITLE_DESC'">Title (Z-A)</option>
        <option value="DATE_ASC">Publication Date (Oldest First)</option>
        <option value="DATE_DESC">Publication Date (Newest First)</option>
      </select>
    </div>
  );
};

export default SortOptions;
