export default function RoomCard({ room, active, onSelect }) {
  const status = room.status || (active ? "AKTIF" : "NON-AKTIF");
  const statusClass = status === "AKTIF" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") onSelect(room.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => onSelect(room.id)}
      className={`relative w-full text-left p-4 bg-white rounded-lg shadow-sm border ${
        active ? "ring-2 ring-blue-100 border-blue-200" : "border-gray-100"
      } focus:outline-none focus:ring-2 focus:ring-blue-200`}
    >
      <div className="flex">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-extrabold text-gray-800 leading-tight">{room.nama}</h3>
            <span className={`ml-3 inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${statusClass}`}>
              {status === "AKTIF" ? "Aktif" : "Non-Aktif"}
            </span>
          </div>

          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <p>
              <span className="text-gray-500">Kapasitas: </span>
              <span className="text-gray-800 font-medium">{room.kapasitas ?? '-'}</span>
            </p>
            <p>
              <span className="text-gray-500">Kelas: </span>
              <span className="text-gray-800 font-medium">{room.kelas_ruangan ?? '-'}</span>
            </p>
            <p>
              <span className="text-gray-500">Jenis Kelamin: </span>
              <span className="text-gray-800 font-medium">{room.jenis_kelamin ?? 'Semua'}</span>
            </p>
            <p>
              <span className="text-gray-500">Usia: </span>
              <span className="text-gray-800 font-medium">{room.usia ?? '-'}</span>
            </p>
            <p>
              <span className="text-gray-500">Penyakit: </span>
              <span className="text-gray-800 font-medium">{room.penyakit ?? '-'}</span>
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-4 self-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(room.id);
            }}
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow hover:bg-blue-600"
            aria-label={`Buka ${room.nama}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
