export const asNonEmptyString = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

export const asOptionalString = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export const parsePrice = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return null
  }

  const parsed = Number.parseFloat(value)

  if (!Number.isFinite(parsed) || parsed < 0) {
    return null
  }

  return parsed
}

export const parseChecked = (value: FormDataEntryValue | null) => {
  return value === "on"
}
