import { useState, useEffect } from 'react'

export default function useRX(id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/rx?id=${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode && res.statusCode !== 200) throw res
          return res
        })
        .then((res) => ({
          ...res,
          data: atob(res.data),
        }))
        .then(setData)
        .catch(setError)
        .then(() => setLoading(false))
    }
  }, [id])

  return { loading, error, data }
}
