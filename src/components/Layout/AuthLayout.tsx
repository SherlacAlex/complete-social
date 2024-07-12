import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface AuthLayoutProps {
    children: React.JSX.Element,
    authentication: boolean,
}

function AuthLayout( ) {
    const isAuthenticated: boolean = false;
    if(isAuthenticated) {
        return(<Navigate to='/'/>)
    }
    else {
        return(
            <section>
                <Outlet />
            </section>
        )
    }
}

export default AuthLayout