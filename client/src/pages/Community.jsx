import React, { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function Community() {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  useEffect(() => {
    if (user) fetchCreations()
  }, [user])

  const fetchCreations = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) setCreations(data.creations)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const handleToggleLike = async (id) => {
  try {
    const token = await getToken()
    const { data } = await axios.post(
      '/api/user/toggle-like-creations',
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (data.success) {
      setCreations((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                likes: c.likes?.includes(user.id)
                  ? c.likes.filter((uid) => uid !== user.id)
                  : [...(c.likes || []), user.id],
              }
            : c
        )
      )
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


  if (loading) {
    return <div className='flex-1 flex justify-center items-center'>Loading...</div>
  }

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h2 className='text-lg font-semibold'>Creations</h2>
      <div className='bg-white h-full w-full rounded-xl overflow-y-auto flex flex-wrap gap-4 p-2'>
        {creations.map((creation, index) => (
          <div
            key={index}
            className='relative group w-full sm:w-1/2 lg:w-1/3 rounded-lg overflow-hidden'
          >
            <img
              src={creation.content}
              alt={creation.prompt || 'Creation image'}
              className='w-full sm:h-72 lg:h-96 object-cover rounded-lg'
            />
            <div className='absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
              <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
              <div className='flex gap-1 items-center'>
                {creation.likes?.length || 0}
                <Heart
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes?.includes(user?.id) ? 'fill-red-500 text-red-500' : ''
                  }` } onClick={() => handleToggleLike(creation.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
