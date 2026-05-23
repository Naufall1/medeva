import { useEffect, useState } from 'react'
import { fetchRoomClasses, fetchRoomDetail, fetchRooms, createRoom, updateRoom } from '../services/roomService'

export function useRooms(token) {
  const [rooms, setRooms] = useState([])
  const [classes, setClasses] = useState([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(3)
  const [totalItems, setTotalItems] = useState(0)
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('SEMUA')
  const [initialLoading, setInitialLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [detailError, setDetailError] = useState({ roomId: '', message: '' })
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    if (!token) return

    let isMounted = true

    async function loadClasses() {
      try {
        const classResponse = await fetchRoomClasses(token)

        if (!isMounted) return

        setClasses(classResponse?.kelas_ruangan || [])
      } catch (requestError) {
        if (!isMounted) return
        setListError(requestError.status === 401 || requestError.status === 403 ? 'Sesi login tidak valid. Silakan masuk ulang.' : requestError.message || 'Gagal memuat data ruangan')
      }
    }

    loadClasses()

    return () => {
      isMounted = false
    }
  }, [token])

  useEffect(() => {
    if (!token) return

    let isMounted = true

    async function loadRooms() {
      setInitialLoading(true)
      setListError('')

      try {
        const isActive = filter === 'AKTIF' ? true : filter === 'NON-AKTIF' ? false : undefined
        const roomResponse = await fetchRooms(token, { isActive, search: query.trim(), page, perPage })

        if (!isMounted) return

        const nextRooms = roomResponse?.kategori_ruangan || []
        const total = roomResponse?.total ?? nextRooms.length

        setRooms(nextRooms)
        setTotalItems(total)
        setSelectedRoomId(nextRooms[0]?.id || '')
      } catch (requestError) {
        if (!isMounted) return
        setListError(requestError.status === 401 || requestError.status === 403 ? 'Sesi login tidak valid. Silakan masuk ulang.' : requestError.message || 'Gagal memuat data ruangan')
      } finally {
        if (isMounted) setInitialLoading(false)
      }
    }

    loadRooms()

    return () => {
      isMounted = false
    }
  }, [token, filter, query, page, perPage])

  // when filter or query changes, reset to first page
  useEffect(() => {
    setPage(1)
  }, [filter, query, setPage])

  const filteredRooms = rooms

  const activeRoomId = filteredRooms.some((room) => room.id === selectedRoomId) ? selectedRoomId : filteredRooms[0]?.id || ''
  const selectedRoom = filteredRooms.find((room) => room.id === activeRoomId) || null

  useEffect(() => {
    if (!token || !activeRoomId) return

    let isMounted = true

    async function loadDetail() {
      try {
        const response = await fetchRoomDetail(token, activeRoomId)
        if (isMounted) setDetail(response)
      } catch (requestError) {
        if (isMounted) {
          setDetail(null)
          setDetailError({
            roomId: activeRoomId,
            message: requestError.status === 401 || requestError.status === 403 ? 'Sesi login tidak valid. Silakan masuk ulang.' : 'Gagal memuat detail ruangan.',
          })
        }
      }
    }

    loadDetail()

    return () => {
      isMounted = false
    }
  }, [token, activeRoomId])

  const detailRoom = detail?.id === activeRoomId ? detail : selectedRoom
  const visibleDetailError = detailError.roomId === activeRoomId ? detailError.message : ''
  const detailLoading = Boolean(token && activeRoomId && !visibleDetailError && detail?.id !== activeRoomId)

  async function refreshRooms() {
    if (!token) return
    try {
      const isActive = filter === 'AKTIF' ? true : filter === 'NON-AKTIF' ? false : undefined
      const roomResponse = await fetchRooms(token, { isActive, search: query.trim(), page, perPage })
      const nextRooms = roomResponse?.kategori_ruangan || []
      const total = roomResponse?.total ?? nextRooms.length
      setRooms(nextRooms)
      setTotalItems(total)
      setSelectedRoomId((prev) => (nextRooms.some((r) => r.id === prev) ? prev : nextRooms[0]?.id || ''))
      return nextRooms
    } catch (err) {
      console.error('Error refreshing rooms:', err)
      // ignore here; caller will handle
      return []
    }
  }

  async function createRoomHandler(payload) {
    if (!token) throw new Error('No token')
    const res = await createRoom(token, payload)
    const nextRooms = await refreshRooms()
    // if the created room is not in the refreshed list (pagination), prepend it so it becomes selectable
    if (res?.id && !nextRooms.some((r) => r.id === res.id)) {
      setRooms((prev) => [res, ...prev])
    }
    if (res?.id) {
      setSelectedRoomId(res.id)
      // set detail to the newly created resource so panel updates immediately
      setDetail(res)
    }
    return res
  }

  async function updateRoomHandler(id, payload) {
    if (!token) throw new Error('No token')
    const res = await updateRoom(token, id, payload)
    const nextRooms = await refreshRooms()
    if (res?.id && !nextRooms.some((r) => r.id === res.id)) {
      setRooms((prev) => [res, ...prev])
    }
    if (res?.id) {
      setSelectedRoomId(res.id)
      // set detail to the updated resource so panel updates immediately
      setDetail(res)
    }
    return res
  }

  async function toggleActiveHandler(id, isActive) {
    return updateRoomHandler(id, { is_active: isActive })
  }

  return {
    rooms,
    classes,
    initialLoading,
    detailLoading,
    listError,
    detailError: visibleDetailError,
    query,
    setQuery,
    filter,
    setFilter,
    activeRoomId,
    detailRoom,
    selectedRoomId,
    setSelectedRoomId,
    refreshRooms,
    createRoom: createRoomHandler,
    updateRoom: updateRoomHandler,
    toggleActive: toggleActiveHandler,
    page,
    setPage,
    perPage,
    totalItems,
  }
}
