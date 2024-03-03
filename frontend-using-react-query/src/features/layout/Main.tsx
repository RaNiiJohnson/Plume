import { Outlet } from 'react-router'
import Header from './Header'

export default function Main() {
  return (
    <div className="w-full h-full max-w-3xl m-auto max-sm:px-2 sm:container bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
