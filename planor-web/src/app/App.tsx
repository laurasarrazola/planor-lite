import { Outlet } from "react-router-dom"
// import { MainLayout, DesktopSidebar, MobileSidebar, Header, Footer } from "@/shared/components/layout"
// import { SidebarProvider } from "@/shared/contexts/SidebarContext"
// import { authStorageService } from "@/core/services"

function App() {
    // const handleLogout = () => {
    //     // Limpiar autenticación
    //     authStorageService.clearAuth()

    //     // Redirigir a login
    //     window.location.href = '/login'
    // }

    return (
        // <SidebarProvider>
        //   <MainLayout
        //     desktopSidebar={<DesktopSidebar onLogout={handleLogout} />}
        //     mobileSidebar={<MobileSidebar onLogout={handleLogout} />}
        //     header={<Header />}
        //     footer={<Footer />}
        //   >
        //  </MainLayout>
        //     </SidebarProvider>
            <Outlet />
        )
}

export default App