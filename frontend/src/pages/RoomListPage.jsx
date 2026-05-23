import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRooms } from '../hooks/useRooms'
import RoomDetailPanel from '../components/RoomDetailPanel'
import RoomsSidebar from '../components/RoomsSidebar'

export default function RoomListPage() {
  const { auth } = useAuth()
  const {
    classes,
    detailError,
    detailLoading,
    detailRoom,
    filter,
    initialLoading,
    listError,
    query,
    rooms,
    selectedRoomId,
    setFilter,
    setQuery,
    setSelectedRoomId,
    createRoom,
    updateRoom,
    toggleActive,
    page,
    setPage,
    perPage,
    totalItems,
  } = useRooms(auth?.token)

  const isAdmin = Boolean(auth?.user?.is_admin)
  const [mode, setMode] = useState(isAdmin ? 'edit' : 'view')

  useEffect(() => {
    // when a room is selected, admins always open in edit mode; non-admins open view
    if (!selectedRoomId) return
    setMode(isAdmin ? 'edit' : 'view')
  }, [selectedRoomId, isAdmin])

  return (
    <main className="rooms-page">
      <section className="rooms-layout">
        <RoomsSidebar
          classes={classes}
          filter={filter}
          initialLoading={initialLoading}
          listError={listError}
          query={query}
          rooms={rooms}
          page={page}
          setPage={setPage}
          perPage={perPage}
          totalItems={totalItems}
          selectedRoomId={selectedRoomId}
          onFilterChange={setFilter}
          onQueryChange={setQuery}
          onSelectRoom={(id) => {
            setSelectedRoomId(id)
          }}
          onAdd={() => {
            if (!isAdmin) return
            setMode('create')
            setSelectedRoomId('')
          }}
          isAdmin={isAdmin}
        />

        {/* Auto-switch to edit for admins when a room is selected */}
        {typeof window !== 'undefined' ? null : null}

        <section className="rooms-panel rooms-detail-panel">
          <RoomDetailPanel
            room={mode === 'create' ? null : detailRoom}
            loading={detailLoading}
            error={detailError}
            mode={mode}
            classes={classes}
            isAdmin={isAdmin}
            onCancel={() => setMode(isAdmin ? 'edit' : 'view')}
            onSave={async (data) => {
              if (!isAdmin) return alert('Tidak punya akses edit')
              if (mode === 'create') {
                await createRoom(data)
              } else if (detailRoom?.id) {
                await updateRoom(detailRoom.id, data)
              }
              // after save, admin stays in edit mode; non-admins go to view
              setMode(isAdmin ? 'edit' : 'view')
            }}
              onToggleActive={async (id, isActive) => {
                if (!isAdmin) return alert('Tidak punya akses')
                await toggleActive(id, isActive)
              }}
            setMode={setMode}
          />
        </section>
      </section>
    </main>
  )
}
