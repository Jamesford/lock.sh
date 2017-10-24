import 'isomorphic-fetch'

const headers = () => {
  return {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
}

export const create = async (data) => {
  const response = await fetch('/api/create', {
    headers: headers(),
    method: 'post',
    body: JSON.stringify({ data })
  })
  return response.json()
}

export const read = async (id) => {
  const response = await fetch(`/api/read/${id}`, {
    headers: headers(),
    method: 'get'
  })
  return response.json()
}

export default {
  create,
  read
}
