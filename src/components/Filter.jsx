import React from 'react'

const Filter = ({ onFilterChange, onTitleChange }) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => 2000 + index
  )
  years.unshift('Select a Year')
  return (
    <div className='flex justify-between my-3'>
      <select
        onChange={(e) => onFilterChange(e.target.value, 'year')}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        {years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <div className='filterByStatus'>
        <select
          onChange={(e) => onFilterChange(e.target.value, 'status')}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option>Select a Status</option>
          <option value='failure'>Failure</option>
          <option value='success'>Success</option>
        </select>
      </div>
      <div className='search'>
        <input
          className=' bg-neutral-300 rounded-md py-1 px-2 text-zinc-950'
          placeholder='Search By Title'
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Filter
