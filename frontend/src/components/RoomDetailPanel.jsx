import { useEffect, useState } from 'react'

export default function RoomDetailPanel({ room, loading, error, mode = 'view', classes = [], isAdmin = false, onSave, onCancel, setMode }) {
  const [form, setForm] = useState(() => ({
    nama_ruangan: '',
    id_kelas: '',
    harga_ruangan: '',
    kapasitas: '',
    fasilitas_ruangan: {
      ac: false,
      tv: false,
      meja: false,
      sofa: false,
      kursi: false,
      kulkas: false,
      lemari: false,
      kabinet: false,
      bed_bayi: false,
      amenities: false,
      dispenser: false,
      kamar_mandi: false,
      kipas_angin: false,
      bed_penunggu: false,
      overbed_table: false,
      kapasitas: 0,
    },
    jenis_kelamin: 'Semua',
    usia: 'Semua',
    penyakit: 'Semua',
    is_active: true,
  }))
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmTarget, setConfirmTarget] = useState(null)

  const facilitiesList = [
    'ac',
    'tv',
    'meja',
    'sofa',
    'kursi',
    'kulkas',
    'lemari',
    'kabinet',
    'bed_bayi',
    'amenities',
    'dispenser',
    'kamar_mandi',
    'kipas_angin',
    'bed_penunggu',
    'overbed_table',
  ]

  useEffect(() => {
    if (room) {
      // normalize fasilitas_ruangan to include all expected keys
      const expectedFacilities = {
        ac: false,
        tv: false,
        meja: false,
        sofa: false,
        kursi: false,
        kulkas: false,
        lemari: false,
        kabinet: false,
        bed_bayi: false,
        amenities: false,
        dispenser: false,
        kamar_mandi: false,
        kipas_angin: false,
        bed_penunggu: false,
        overbed_table: false,
      }

      const roomFas = room.fasilitas_ruangan || {}
      const normalizedFas = { ...expectedFacilities, ...roomFas }
      normalizedFas.kapasitas = roomFas.kapasitas ?? room.kapasitas ?? 0

      setForm({
        nama_ruangan: room.nama || room.nama_ruangan || '',
        id_kelas: room.kelas_ruangan?.id || room.id_kelas || '',
        harga_ruangan: room.harga_ruangan ?? room.harga ?? '',
        kapasitas: normalizedFas.kapasitas || '',
        fasilitas_ruangan: normalizedFas,
        jenis_kelamin: room.jenis_kelamin || 'Semua',
        usia: room.usia || 'Semua',
        penyakit: room.penyakit || 'Semua',
        is_active: room.is_active === undefined ? true : room.is_active,
      })
    } else if (mode === 'create') {
      setForm((f) => ({ ...f, nama_ruangan: '', id_kelas: '', harga_ruangan: '', kapasitas: '', fasilitas_ruangan: { ...f.fasilitas_ruangan, kapasitas: 0 }, jenis_kelamin: 'Semua', usia: 'Semua', penyakit: 'Semua', is_active: true }))
    }
  }, [room, mode])

  function setField(key, value) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function toggleFacility(key) {
    setForm((s) => ({ ...s, fasilitas_ruangan: { ...(s.fasilitas_ruangan || {}), [key]: !(s.fasilitas_ruangan?.[key] || false) } }))
  }

  async function handleSubmit(e) {
    e && e.preventDefault()
    if (!onSave) return
    setSubmitting(true)
    try {
      const payload = {
        nama_ruangan: form.nama_ruangan,
        id_kelas: form.id_kelas,
        harga: form.harga_ruangan ? Number(form.harga_ruangan) : 0,
        kapasitas: form.kapasitas ? Number(form.kapasitas) : 0,
        fasilitas: { ...form.fasilitas_ruangan, kapasitas: form.kapasitas ? Number(form.kapasitas) : 0 },
        jenis_kelamin: form.jenis_kelamin,
        usia: form.usia,
        penyakit: form.penyakit,
        is_active: form.is_active,
      }

      await onSave(payload)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="detail-skeleton" aria-busy="true" aria-live="polite">
        <div className="panel-head flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="eyebrow text-xs text-gray-500 font-semibold">Detail</p>
            <div className="skeleton-line skeleton-line--medium" />
          </div>
          <div className="skeleton-pill" />
        </div>

        <div className="detail-grid">
          <div className="skeleton-field" />
          <div className="skeleton-field" />
          <div className="skeleton-field" />
          <div className="skeleton-field" />
          <div className="skeleton-field" />
          <div className="skeleton-field" />
        </div>

        <div className="facility-box">
          <div className="skeleton-line skeleton-line--medium" />
          <div className="skeleton-block" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="empty-state">
        <p>{error}</p>
      </div>
    )
  }
  const isReadOnly = mode === 'view'

  if (isReadOnly && !room) {
    return (
      <div className="empty-state">
        <p>Silakan pilih ruangan untuk melihat detail.</p>
      </div>
    )
  }

  // render the same form for view/edit/create — inputs disabled in view mode
  return (
    <form className="room-form space-y-4" onSubmit={handleSubmit}>
      <div className="panel-head mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow text-xs text-gray-500 font-semibold">{isReadOnly ? 'Detail' : mode === 'create' ? 'Form Tambah Kategori Ruangan' : 'Edit Kategori Ruangan'}</p>
          <h2 className="text-sm font-bold uppercase tracking-tight text-gray-800">{form.nama_ruangan || room?.nama || room?.nama_ruangan || 'Form Ruangan'}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {/* Admin controls: always show Edit + Activate/Deactivate for admins */}
          {isAdmin ? (
            <>
              <button
                type="button"
                onClick={() => { setConfirmTarget(!room?.is_active); setShowConfirm(true) }}
                className={`rounded-md border px-3 py-1 text-sm font-semibold ${room?.is_active ? 'border-red-300 text-red-600' : 'border-green-300 text-green-600'}`}
              >
                {room?.is_active ? 'Non-aktifkan' : 'Aktifkan'}
              </button>
            </>
          ) : (
            <span className={`inline-flex items-center px-2 py-1 text-sm font-semibold ${form.is_active ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded-md`}>{form.is_active ? 'Aktif' : 'Non-aktif'}</span>
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Konfirmasi Status</h3>
            </div>
            <p className="mb-6">Apakah Anda yakin ingin {confirmTarget ? 'mengaktifkan' : 'menonaktifkan'} kategori ini?</p>
            <div className="flex justify-end gap-3">
              <button type="button" className="rounded-md border border-gray-200 px-4 py-2 text-sm" onClick={() => setShowConfirm(false)}>Batal</button>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-blue-500"
                onClick={async () => {
                  setShowConfirm(false)
                  if (!room?.id || !onSave) return
                  const payload = {
                    nama_ruangan: form.nama_ruangan,
                    id_kelas: form.id_kelas,
                    harga: form.harga_ruangan ? Number(form.harga_ruangan) : 0,
                    kapasitas: form.kapasitas ? Number(form.kapasitas) : 0,
                    fasilitas: { ...form.fasilitas_ruangan, kapasitas: form.kapasitas ? Number(form.kapasitas) : 0 },
                    jenis_kelamin: form.jenis_kelamin,
                    usia: form.usia,
                    penyakit: form.penyakit,
                    is_active: confirmTarget,
                  }

                  try {
                    setSubmitting(true)
                    await onSave(payload)
                    // update local state to reflect change
                    setForm((s) => ({ ...s, is_active: confirmTarget }))
                  } catch (err) {
                    console.error(err)
                    alert('Gagal mengubah status')
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card rounded border border-gray-300 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Nama / Nomor Ruangan *</label>
            <input
              className="text-sm w-full rounded-[var(--radius-sm)] border border-gray-300 bg-white px-3.5 py-2 text-[var(--color-text-primary)] transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-4 focus:ring-[rgba(74,153,242,0.08)]"
              value={form.nama_ruangan}
              onChange={(e) => setField('nama_ruangan', e.target.value)}
              required
              disabled={isReadOnly}
            />
          </div>

          <div>
            <label className="block mb-2">Kelas *</label>
            <select
              className="text-sm w-full rounded-[var(--radius-sm)] border border-gray-300 bg-white px-3.5 py-2 text-[var(--color-text-primary)] focus:outline-none"
              value={form.id_kelas}
              onChange={(e) => setField('id_kelas', e.target.value)}
              required
              disabled={isReadOnly}
            >
              <option value="">Pilih...</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.nama_kelas || c.name || c.nama}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block mb-2">Jumlah Kamar</label>
            <input
              type="number"
              className="text-sm w-full rounded-[var(--radius-sm)] border border-gray-300 bg-white px-3.5 py-2 text-[var(--color-text-primary)]"
              value={form.kapasitas}
              onChange={(e) => setField('kapasitas', e.target.value)}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label className="block mb-2">Harga Ruangan</label>
            <input
              type="number"
              className="text-sm w-full rounded-[var(--radius-sm)] border border-gray-300 bg-white px-3.5 py-2 text-[var(--color-text-primary)]"
              value={form.harga_ruangan}
              onChange={(e) => setField('harga_ruangan', e.target.value)}
              disabled={isReadOnly}
            />
          </div>
        </div>
      </div>

      <div className="card rounded border border-gray-300 p-4">
        <h4 className="font-semibold mb-2">Fasilitas</h4>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {facilitiesList.map((key) => (
            <label key={key} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(form.fasilitas_ruangan?.[key])}
                onChange={() => toggleFacility(key)}
                disabled={isReadOnly}
                className="h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="capitalize">{key.replace(/_/g, ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card rounded border border-gray-300 p-4">
        <h4 className="font-semibold mb-2">Informasi Lain</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2">Jenis Kelamin</label>
            <div className="flex flex-wrap items-center gap-3">
              {['Semua', 'Laki-laki', 'Perempuan'].map((opt) => (
                <label key={opt} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value={opt}
                    checked={form.jenis_kelamin === opt}
                    onChange={(e) => setField('jenis_kelamin', e.target.value)}
                    disabled={isReadOnly}
                    className="h-4 w-4 border border-gray-300 text-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2">Usia</label>
            <div className="flex flex-wrap items-center gap-3">
              {['Semua', 'Anak', 'Dewasa'].map((opt) => (
                <label key={opt} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="usia"
                    value={opt}
                    checked={form.usia === opt}
                    onChange={(e) => setField('usia', e.target.value)}
                    disabled={isReadOnly}
                    className="h-4 w-4 border border-gray-300 text-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2">Penyakit</label>
            <div className="flex flex-wrap items-center gap-3">
              {['Semua', 'Infeksius', 'Non-Infeksius'].map((opt) => (
                <label key={opt} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="penyakit"
                    value={opt}
                    checked={form.penyakit === opt}
                    onChange={(e) => setField('penyakit', e.target.value)}
                    disabled={isReadOnly}
                    className="h-4 w-4 border border-gray-300 text-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700" onClick={() => { onCancel && onCancel(); setMode && setMode('view') }}>Batal</button>
        <button type="submit" className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed" disabled={submitting || isReadOnly || !isAdmin}>{submitting ? 'Menyimpan...' : 'Simpan'}</button>
      </div>
    </form>
  )
}
