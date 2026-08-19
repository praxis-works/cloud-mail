export async function copyText(text) {
  const value = text == null ? '' : String(text)

  if (typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function') {
    return navigator.clipboard.writeText(value)
  }

  if (typeof document === 'undefined' || !document.body) {
    throw new Error('Clipboard API is unavailable')
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  Object.assign(textarea.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '1px',
    height: '1px',
    padding: '0',
    border: '0',
    outline: 'none',
    boxShadow: 'none',
    background: 'transparent',
    opacity: '0',
  })

  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  try {
    if (!document.execCommand('copy')) {
      throw new Error('Copy command unsuccessful')
    }
  } finally {
    textarea.remove()
  }
}
