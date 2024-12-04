import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  console.log(theme)

  const ThemeHandler = () => setTheme(theme == 'dark' ? 'light' : 'dark')

  return (
    <div className="h-screen w-screen overflow-x-hidden p-4 bg-primary text-text">
      <Header onClick={ThemeHandler}/>
      <Dashboard />
    </div>
  )
}

export default App