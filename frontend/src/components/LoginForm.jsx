import { useState } from 'react'

export default function LoginForm({ form, loading, error, fieldErrors, onChange, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false)
  const hasKlinikIdError = Boolean(fieldErrors?.klinik_id)
  const hasUsernameError = Boolean(fieldErrors?.username)
  const hasPasswordError = Boolean(fieldErrors?.password)

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-1">
        <span className="text-md font-semibold leading-[1.15] text-[var(--color-text-primary)] mb-1">
          Klinik ID <strong className="font-bold text-[#e15555]" aria-hidden="true">*</strong>
        </span>
        <input
          className={`text-sm w-full rounded-[var(--radius-sm)] border bg-white px-3.5 py-2 text-[var(--color-text-primary)] transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-4 focus:ring-[rgba(74,153,242,0.16)] ${hasKlinikIdError ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[rgba(229,115,115,0.14)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
          value={form.klinik_id}
          onChange={(event) => onChange('klinik_id', event.target.value)}
          placeholder="Masukkan Klinik ID"
          autoComplete="off"
          aria-invalid={hasKlinikIdError}
          aria-describedby={hasKlinikIdError ? 'klinik-id-error' : undefined}
        />
        {hasKlinikIdError ? (
          <p id="klinik-id-error" className="text-xs text-[var(--color-danger)]">
            {fieldErrors.klinik_id}
          </p>
        ) : null}
      </label>

      <label className="grid gap-1">
        <span className="text-md font-semibold leading-[1.15] text-[var(--color-text-primary)] mb-1">
          User ID <strong className="font-bold text-[#e15555]" aria-hidden="true">*</strong>
        </span>
        <input
          className={`text-sm w-full rounded-[var(--radius-sm)] border bg-white px-3.5 py-2 text-[var(--color-text-primary)] transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-4 focus:ring-[rgba(74,153,242,0.16)] ${hasUsernameError ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[rgba(229,115,115,0.14)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
          value={form.username}
          onChange={(event) => onChange('username', event.target.value)}
          placeholder="Masukkan User ID"
          autoComplete="username"
          aria-invalid={hasUsernameError}
          aria-describedby={hasUsernameError ? 'username-error' : undefined}
        />
        {hasUsernameError ? (
          <p id="username-error" className="text-xs text-[var(--color-danger)]">
            {fieldErrors.username}
          </p>
        ) : null}
      </label>

      <label className="grid gap-1">
        <span className="text-md font-semibold leading-[1.15] text-[var(--color-text-primary)] mb-1">
          Password <strong className="font-bold text-[#e15555]" aria-hidden="true">*</strong>
        </span>
        <div className="relative">
          <input
            className={`text-sm w-full rounded-[var(--radius-sm)] border bg-white px-3.5 py-2 text-[var(--color-text-primary)] transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-4 focus:ring-[rgba(74,153,242,0.16)] ${hasPasswordError ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[rgba(229,115,115,0.14)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(event) => onChange('password', event.target.value)}
            placeholder="Masukkan Password"
            autoComplete="current-password"
            aria-invalid={hasPasswordError}
            aria-describedby={hasPasswordError ? 'password-error' : undefined}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border-0 bg-transparent p-0 text-[#b2b7c1] transition hover:bg-[rgba(143,149,162,0.09)] hover:text-[#8f95a2]"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {showPassword ? (
                <path d="M3.8 5.3 18.7 20.2l1.4-1.4-2.2-2.2A11.7 11.7 0 0 0 22 12c-1.7-3.9-5.6-7-10-7-1.4 0-2.7.2-3.9.7L5.2 3.8 3.8 5.3Zm6.1 6.1 2.7 2.7a2.8 2.8 0 0 1-2.7-2.7Zm.3-2.8 1.8 1.8a2.9 2.9 0 0 1 2 2l1.8 1.8c.3-.7.5-1.4.5-2.1a4.2 4.2 0 0 0-6.1-3.5Zm5 5.1 1.8 1.8c1.6-1.2 2.7-2.7 3.4-4.3a10.2 10.2 0 0 0-1.3-2.2 9 9 0 0 0-1.7-1.6c.3.7.5 1.4.5 2.1 0 1-.2 2-.7 3.2Zm-9.5-9.5-.9.9 1.9 1.9C5.4 9 4.2 10.3 3 12c1.7 3.9 5.6 7 10 7 1.1 0 2.1-.1 3.1-.4l1.2 1.2.9-.9L5.7 4.2ZM9.7 12l1.7 1.7a2.6 2.6 0 0 1-1.7-1.7Z" />
              ) : (
                <>
                  <path d="M12 5c4.7 0 8.6 3 10.2 7-1.6 4-5.5 7-10.2 7S3.4 16 1.8 12C3.4 8 7.3 5 12 5Zm0 2C8.4 7 5.3 9.1 3.9 12c1.4 2.9 4.5 5 8.1 5s6.7-2.1 8.1-5C18.7 9.1 15.6 7 12 7Z" />
                  <circle cx="12" cy="12" r="2.7" />
                </>
              )}
            </svg>
          </button>
        </div>
        {hasPasswordError ? (
          <p id="password-error" className="text-xs text-[var(--color-danger)]">
            {fieldErrors.password}
          </p>
        ) : null}
      </label>

      <div className="mt-0.5 flex min-h-[76px] items-center justify-between gap-4 rounded-[4px] border border-[#dcdfe5] bg-gradient-to-b from-white to-[#fbfbfc] px-3 py-4 pr-3.5" aria-hidden="true">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-[30px] w-[30px] rounded-[2px] border-2 border-[#6f737c] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />
          <span className="text-base text-[var(--color-text-primary)]">Saya bukan robot</span>
        </div>
        <div className="grid min-w-[66px] justify-items-center gap-0.5 text-[#969ba6]">
          <span className="captcha-mark captcha-mark--blue" />
          <span className="captcha-mark captcha-mark--gray" />
          <span className="text-[11px] font-medium tracking-[0.01em]">reCAPTCHA</span>
        </div>
      </div>

      <a
        className="w-fit border-0 bg-transparent p-0 text-[16px] text-[var(--color-text-primary)] no-underline hover:underline"
        href="#"
        onClick={(event) => event.preventDefault()}
      >
        Lupa Password?
      </a>

      {error ? (
        <p className="rounded-[var(--radius-sm)] bg-[rgba(229,115,115,0.12)] px-3 py-2.5 text-xs text-[var(--color-danger)]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-1 min-h-11 rounded-[var(--radius-md)] border border-transparent bg-gradient-to-b from-[#55a7f5] to-[#4194ef] px-4 font-semibold text-white shadow-[0_10px_18px_rgba(65,148,239,0.35)] transition-[background-color,box-shadow] duration-150 ease-out hover:from-[#4d9ef0] hover:to-[#3b8be4] active:from-[#3d92e8] active:to-[#327fdb] disabled:cursor-wait disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Masuk'}
      </button>

      <a
        className="mt-0.5 ml-auto inline-flex w-fit items-center gap-1 text-[15px] text-[#4f5560] no-underline hover:underline"
        href="#"
        onClick={(event) => event.preventDefault()}
      >
        <span>Masuk ke medeva apotek</span>
        <svg className="h-3.5 w-3.5 relative top-[1px] fill-none stroke-current [stroke-width:2.25] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </a>
    </form>
  )
}
