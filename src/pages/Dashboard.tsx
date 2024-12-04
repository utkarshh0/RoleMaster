import React, { useState } from 'react'
import Users from '../components/Users'
import Roles from '../components/Roles'
import Button from '../components/Button'

const Dashboard: React.FC = () => {
  const [showUser, setShowUser] = useState(true)

  const handleShowUser = (it : boolean) => setShowUser(it)

  return (
    <div className="pt-20 w-full flex flex-col items-center">
      <div className="w-full md:w-4/6 border border-2 border-text flex flex-col justify-center rounded-md overflow-hidden">
        <div className='flex'>
          <Button
              onClick={() => handleShowUser(true)} 
              label="User"
          />
          <Button 
              onClick={() => handleShowUser(false)}
              label="Roles"
          />
        </div>
        <div>
          {showUser ?  <Users /> : <Roles />}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
