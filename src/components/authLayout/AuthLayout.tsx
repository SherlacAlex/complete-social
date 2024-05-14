import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Skeleton } from '../../shadcn/components/ui/skeleton';

interface AuthLayoutProps {
    children: React.JSX.Element,
    authentication: boolean,
}

function AuthLayout( {children, authentication = true}: AuthLayoutProps) {

    const navigate = useNavigate();
    const [ loading, setLoading] = useState<boolean>(true);
    const authStatus = useSelector((state: RootState) => state.auth.loggedStatus)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoading(false);
    }, [authStatus, authentication, navigate]);

    const loadUI = () => {
        if(loading) {
            return (
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            )
        }
        else {
            <>
                {children}
            </>
        }
    }

  return (
    {loadUI}
  )
}

export default AuthLayout