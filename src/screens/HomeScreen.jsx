import React, { useState, useEffect } from 'react'
import SpaceItem from '../components/SpaceItem'
import Filter from '../components/Filter'

const HomeScreen = () => {
  const url = 'https://api.spacexdata.com/v3/launches'

  const [spaceData, setSpaceData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterdSpace, setFilterdSpace] = useState([])

  const onFilterChange = (value, filterCat) => {
    console.log(value, filterCat)
    if (filterCat == 'year') {
      setFilterdSpace(
        spaceData.filter((space) => {
          if (space.launch_date_local.split('-')[0] == value) return true
        })
      )
    }
    if (filterCat == 'status') {
      if (value == 'success') {
        setFilterdSpace(spaceData.filter((space) => space.launch_success))
      } else setFilterdSpace(spaceData.filter((space) => !space.launch_success))
    }
  }

  const onTitleChange = (title) => {
    setFilterdSpace(
      spaceData.filter((space) =>
        space.mission_name.toLowerCase().includes(title.toLowerCase())
      )
    )
  }

  const fetchData = () => {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSpaceData(data)
        setFilterdSpace(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='px-5 py-3'>
      <h1 className='m-5 text-3xl font-bold text-center'>SpaceX Launches</h1>

      <Filter onFilterChange={onFilterChange} onTitleChange={onTitleChange} />

      {filterdSpace.length < 1 && !loading && 'No Rockets to show'}

      {loading ? (
        'Loading'
      ) : (
        <div className='grid grid-cols-4 gap-4'>
          {filterdSpace.map((rocket, index) => {
            return <SpaceItem rocket={rocket} key={rocket.mission_name} />
          })}
        </div>
      )}
    </div>
  )
}

export default HomeScreen
