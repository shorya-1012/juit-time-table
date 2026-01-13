import type { ThemeProviderProps } from "next-themes";


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function ThemeProvider({ children, themeProps }: ProvidersProps) {
  return <ThemeProvider {...themeProps}> {children} </ThemeProvider>
}
