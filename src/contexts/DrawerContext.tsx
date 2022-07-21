import { createContext, useCallback, useContext, useState } from 'react'

type DrawerContextOptions = {
  icon: React.ReactNode
  path: string
  label: string
}

type DrawerContextData = {
  drawerOptions: DrawerContextOptions[]
  setDrawerOptions: (newDrawerOptions: DrawerContextOptions[]) => void
}

const DrawerContext = createContext({} as DrawerContextData)

type DrawerContextProps = {
  children: React.ReactNode
}

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider = ({ children }: DrawerContextProps) => {
  const [drawerOptions, setDrawerOptions] = useState<DrawerContextOptions[]>([])

  const handleDrawerOptions = useCallback(
    (newDrawerOptions: DrawerContextOptions[]) => {
      setDrawerOptions(newDrawerOptions)
    },
    []
  )

  return (
    <DrawerContext.Provider
      value={{ drawerOptions, setDrawerOptions: handleDrawerOptions }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
