"use client"
import AllProfilesPage from "../components/community"
import Header from "../components/header"
import SideNav from "../components/sidenav"

export default function community({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
        
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}<div className="max-w-5xl mx-auto px-8">
        <AllProfilesPage/>
  </div></div>
        </div>
        </>
    )
}