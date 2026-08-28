export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function delay(ms = 300): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
