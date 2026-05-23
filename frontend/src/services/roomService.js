import { requestJson } from './apiClient'

export function fetchRooms(token, { isActive, search, page = 1, perPage = 3 } = {}) {
  const params = new URLSearchParams()

  if (isActive !== undefined) {
    params.set('is_active', String(isActive))
  }

  if (search) {
    params.set('search', search)
  }

  params.set('page', String(page))
  params.set('perPage', String(perPage))

  const query = params.toString()

  return requestJson(`/kategori-ruangan${query ? `?${query}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function fetchRoomDetail(token, roomId) {
  return requestJson(`/kategori-ruangan/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function fetchRoomClasses(token) {
  return requestJson('/kelas-ruangan', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function createRoom(token, payload) {
  return requestJson('/kategori-ruangan', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function updateRoom(token, id, payload) {
  return requestJson(`/kategori-ruangan/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
