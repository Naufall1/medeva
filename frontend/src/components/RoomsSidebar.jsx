export default function RoomsSidebar({
  filter,
  initialLoading,
  listError,
  query,
  rooms,
  selectedRoomId,
  onFilterChange,
  onQueryChange,
  onSelectRoom,
  onAdd,
  isAdmin = false,
  page = 1,
  setPage = () => {},
  perPage = 3,
  totalItems = 0,
}) {
  const statuses = ['AKTIF', 'NON-AKTIF']
  const safeRooms = rooms || []
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))

  const getRoomName = (room) => room.nama || room.nama_ruangan || '-'
  const getRoomClass = (room) =>
    room.kelas_ruangan?.nama_kelas ||
    room.kelas_ruangan?.name ||
    room.kelas_ruangan?.nama ||
    room.kelas_ruangan ||
    '-'
  const getRoomIndex = (idx) => (page - 1) * perPage + idx + 1
  const getRoomStatusLabel = (room) => (room.is_active ? 'Aktif' : 'Non-Aktif')
  const getRoomStatusClass = (room) =>
    room.is_active ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'

  return (
    <aside className="rooms-panel">
      <div className="panel-head mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold uppercase tracking-tight text-gray-800 leading-tight">
            Tambah Kategori
            <br />
            Ruangan
          </h1>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => onAdd && onAdd()}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          >
            Tambah
          </button>
        ) : (
          <button
            type="button"
            disabled
            title="Hanya admin yang dapat menambah"
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500"
          >
            Tambah
          </button>
        )}
      </div>

      <div className="space-y-3">
        <span className="text-md font-semibold text-gray-700">Status</span>
        <div className="tab-row !mt-1 flex gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2">
          <button
            type="button"
            className={(filter === 'SEMUA' ? 'tab active border-gray-300' : 'tab') + ' flex-1 border-none text-center'}
            onClick={() => onFilterChange('SEMUA')}
          >
            SEMUA
          </button>
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              className={(filter === status ? 'tab active border-gray-300' : 'tab') + ' flex-1 border-none text-center'}
              onClick={() => onFilterChange(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="search-row">
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Cari nama ruangan" />
      </div>

      {initialLoading ? (
        <div className="sidebar-skeleton" aria-busy="true" aria-live="polite">
          <div className="skeleton-line skeleton-line--wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <p className="state-note">Memuat daftar ruangan dan kelas...</p>
        </div>
      ) : null}

      {listError ? <p className="form-error">{listError}</p> : null}

      <div className="room-list">
        {!initialLoading ? (
          safeRooms.length > 0 ? (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto border-collapse rounded-lg border border-gray-100 bg-white divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-10 border border-gray-100 px-2 py-2 text-left text-sm font-medium text-gray-500 lg:px-4 lg:py-3">#</th>
                      <th className="border border-gray-100 px-3 py-2 text-left text-sm font-medium text-gray-700 lg:px-4 lg:py-3">Kategori Ruangan</th>
                      <th className="w-12 border border-gray-100 px-2 py-2 lg:px-4 lg:py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {safeRooms.map((room, idx) => {
                      const roomName = getRoomName(room)
                      const roomClass = getRoomClass(room)
                      const roomIndex = getRoomIndex(idx)

                      return (
                        <tr
                          key={room.id}
                          className={`cursor-pointer hover:bg-gray-50 ${room.id === selectedRoomId ? 'bg-blue-50' : ''}`}
                          onClick={() => onSelectRoom(room.id)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              onSelectRoom(room.id)
                            }
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <td className="border border-gray-100 px-2 py-2 align-top text-sm text-gray-600 lg:px-4 lg:py-3">{roomIndex}</td>
                          <td className="border border-gray-100 px-3 py-2 align-top lg:px-4 lg:py-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="truncate text-sm font-extrabold text-gray-800 lg:text-md">{roomName}</h3>
                                  <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold ${getRoomStatusClass(room)}`}>
                                    {getRoomStatusLabel(room)}
                                  </span>
                                </div>

                                <div className="mt-2  text-sm text-gray-600">
                                  <div>
                                    <span className="text-gray-400">Kapasitas: </span>
                                    <span className="text-gray-400">{room.kapasitas ?? '-'}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Kelas: </span>
                                    <span className="text-gray-400">{roomClass}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Jenis Kelamin: </span>
                                    <span className="text-gray-400">{room.jenis_kelamin ?? 'Semua'}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Usia: </span>
                                    <span className="text-gray-400">{room.usia ?? '-'}</span>
                                  </div>
                                  <div className="lg:col-span-2">
                                    <span className="text-gray-400">Penyakit: </span>
                                    <span className="text-gray-400">{room.penyakit ?? '-'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border border-gray-100 px-2 py-2 align-middle lg:px-4 lg:py-3">
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  onSelectRoom(room.id)
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow hover:bg-blue-600"
                                aria-label={`Buka ${roomName}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {safeRooms.map((room, idx) => {
                  const roomName = getRoomName(room)
                  const roomClass = getRoomClass(room)
                  const roomIndex = getRoomIndex(idx)

                  return (
                    <article
                      key={room.id}
                      className={`rounded-xl border bg-white p-4 shadow-sm ${room.id === selectedRoomId ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100'}`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectRoom(room.id)}
                        className="block w-full text-left"
                        aria-label={`Pilih ${roomName}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">#{roomIndex}</p>
                            <h3 className="mt-1 truncate text-base font-extrabold text-gray-800">{roomName}</h3>
                          </div>
                          <span className={`inline-flex shrink-0 items-center rounded px-2 py-1 text-xs font-semibold ${getRoomStatusClass(room)}`}>
                            {getRoomStatusLabel(room)}
                          </span>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-1 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-400">Kapasitas: </span>
                            <span className="text-gray-400">{room.kapasitas ?? '-'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Kelas: </span>
                            <span className="text-gray-400">{roomClass}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Jenis Kelamin: </span>
                            <span className="text-gray-400">{room.jenis_kelamin ?? 'Semua'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Usia: </span>
                            <span className="text-gray-400">{room.usia ?? '-'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Penyakit: </span>
                            <span className="text-gray-400">{room.penyakit ?? '-'}</span>
                          </div>
                        </div>
                      </button>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-xs text-gray-400">Ketuk kartu atau buka menu aksi.</p>
                        <details className="relative">
                          <summary className="flex h-10 w-10 list-none items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm [&::-webkit-details-marker]:hidden">
                            <span className="sr-only">Aksi {roomName}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm1.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                          </summary>
                          <div className="absolute right-0 top-12 z-10 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                            <button
                              type="button"
                              onClick={() => onSelectRoom(room.id)}
                              className="block w-full px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                              Buka detail
                            </button>
                          </div>
                        </details>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-600">
                  Showing {Math.min((page - 1) * perPage + 1, totalItems)} - {Math.min(page * perPage, totalItems)} of {totalItems}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`rounded-md border px-3 py-1 ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i + 1)}
                      className={`rounded-md border px-3 py-1 ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`rounded-md border px-3 py-1 ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="state-note">Tidak ada ruangan yang cocok dengan filter ini.</p>
          )
        ) : null}
      </div>
    </aside>
  )
}
