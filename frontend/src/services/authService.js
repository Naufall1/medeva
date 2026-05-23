import { requestJson } from './apiClient'

export function login(payload) {
  return requestJson('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
