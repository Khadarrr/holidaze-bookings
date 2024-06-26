"use client"
import Venues from "../components/venues"
import Header from "../components/header"
import SideNav from "../components/sidenav"


export default function venuePage() {
    return (
        <>
         <Header />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
        
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12"><div className="max-w-5xl mx-auto px-8">
        <Venues />
  </div></div>
        </div>
        </>
    )
}