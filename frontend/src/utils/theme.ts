// theme.ts
export const themes = {
  blue: "blue",
  red: "red",
}

export function setTheme(theme: string) {
  document.documentElement.style.setProperty("--button-bg-color", theme)
}
