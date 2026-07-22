import type { Field, TextField, TextareaField } from 'payload'

/** Localized required text / textarea field helper */
export function LText(
  name: string,
  label: string,
  defaultValue?: string,
  opts?: { required?: boolean; textarea?: boolean },
): Field {
  const required = opts?.required ?? true

  if (opts?.textarea) {
    const field: TextareaField = {
      name,
      label,
      type: 'textarea',
      required,
      localized: true,
      ...(defaultValue !== undefined ? { defaultValue } : {}),
    }
    return field
  }

  const field: TextField = {
    name,
    label,
    type: 'text',
    required,
    localized: true,
    ...(defaultValue !== undefined ? { defaultValue } : {}),
  }
  return field
}
