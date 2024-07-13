import React from 'react'

const SpaceItem = ({ rocket }) => {
  const { mission_name } = rocket
  const { mission_patch } = rocket.links
  const { launch_date_local } = rocket
  const date = launch_date_local.split('T')[0]
  const { rocket_name } = rocket.rocket
  return (
    <div className='p-4 flex flex-col gap-2 justify-center border-2 border-slate-800'>
      <img
        height={100}
        width={85}
        className='flex justify-center align-center'
        src={mission_patch}
        alt='mission-image'
      />
      <h4 className='text-gray-500 font-bold'>{mission_name}</h4>
      <button class='rounded-full bg-orange-200'>{date}</button>
      <p className='decoration-slate-500'>{rocket_name}</p>
    </div>
  )
}

export default SpaceItem
