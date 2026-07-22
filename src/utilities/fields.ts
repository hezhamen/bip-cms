import type { Field } from 'payload'

/** Localized required text field helper */
export function LText(
  name: string,
  label: string,
  defaultValue?: string,
  opts?: { required?: boolean; textarea?: boolean },
): Field {
  const required = opts?.required ?? true
  return {
    name,
    label,
    type: opts?.textarea ? 'textarea' : 'text',
    required,
    localized: true,
    ...(defaultValue !== undefined ? { defaultValue } : {}),
  }
}
