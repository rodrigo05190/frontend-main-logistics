import { ReactNode, createContext, useState } from 'react'

const SearchContext = createContext<{
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}>({} as { search: string; setSearch: React.Dispatch<React.SetStateAction<string>> })

interface SearchProviderProps {
  children: ReactNode
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState<string>('')

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>
}

export { SearchContext, SearchProvider }
