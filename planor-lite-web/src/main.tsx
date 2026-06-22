import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { Toaster } from 'sonner'
import { QueryProvider } from '@/app/providers'
import { router } from '@/app/router/routes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </QueryProvider>
  </StrictMode>,
)