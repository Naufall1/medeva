import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { login } = useAuth()
  const [form, setForm] = useState({
    klinik_id: '',
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    klinik_id: '',
    username: '',
    password: '',
  })

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setFieldErrors((current) => ({ ...current, [field]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({
      klinik_id: '',
      username: '',
      password: '',
    })

    try {
      await login(form)
    } catch (requestError) {
      if (requestError.status === 400 && Array.isArray(requestError.payload?.errors)) {
        const nextFieldErrors = {
          klinik_id: '',
          username: '',
          password: '',
        }
        const generalErrors = []

        requestError.payload.errors.forEach((item) => {
          if (item?.field && Object.prototype.hasOwnProperty.call(nextFieldErrors, item.field)) {
            nextFieldErrors[item.field] = item.message || 'Input tidak valid'
          } else if (item?.message) {
            generalErrors.push(item.message)
          }
        })

        setFieldErrors(nextFieldErrors)
        setError(generalErrors.join('. '))
      } else if (requestError.status === 401) {
        // Clear the form and any field errors on authentication failure
        setForm({ klinik_id: '', username: '', password: '' })
        setFieldErrors({ klinik_id: '', username: '', password: '' })
        setError(requestError.message || 'Login gagal')
      } else {
        setError(requestError.message || 'Login gagal')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-8 py-8 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.9)_0,rgba(255,255,255,0.7)_30%,rgba(255,255,255,0)_65%),linear-gradient(180deg,#f3f3f3_0%,#efefef_100%)]">
      <div
        className="pointer-events-none absolute right-[clamp(24px,7vw,72px)] bottom-[clamp(20px,6vw,56px)] aspect-square w-[min(26vw,250px)]"
        aria-hidden="true"
      >
        <div className="auth-illustration__shell auth-illustration__shell--top" />
        <div className="auth-illustration__shell auth-illustration__shell--bottom" />
      </div>
      <section className="relative z-10 w-full max-w-[380px] border border-[rgba(218,221,229,0.95)] bg-white px-9 pb-6 pt-8 shadow-[0_1px_0_rgba(255,255,255,0.8),0_18px_50px_rgba(31,39,57,0.06)]">
        <div className="mb-6 grid gap-4">
          <div className="inline-flex items-end gap-1 text-[var(--color-text-primary)]" aria-label="Medeva">
            <span className="text-[29px] font-medium leading-none tracking-[-0.05em]">Medeva</span>
            <svg className="brand-pulse mb-1 h-6 w-[46px]" viewBox="0 0 84 28" aria-hidden="true" focusable="false">
              <path d="M2 14h18l4-7 5 14 4-10h12l4-6 4 16 5-7h24" />
            </svg>
          </div>
          <p className="text-sm leading-5 text-[var(--color-text-secondary)]">
            Selamat datang di Medeva! Silakan login untuk melanjutkan
          </p>
        </div>

        <LoginForm
          form={form}
          loading={loading}
          error={error}
          fieldErrors={fieldErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  )
}
