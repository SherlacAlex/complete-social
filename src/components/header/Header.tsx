import React, { ReactNode, useState, } from 'react';
import { Button } from '../../shadcn/components/ui/button';
import './Header.css';
import logo from '../../assets/logo.jpg'
import { HamburgerMenuIcon, AvatarIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../../shadcn/components/ui/dropdown-menu";
import { Input } from "../../shadcn/components/ui/input"
import { useDispatch } from 'react-redux';
import authService from '../../appwrite-services/auth-service';
import { logOut } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { NavigationItem } from '../../models/Navigation';

interface HeaderPropsType {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn }: HeaderPropsType) {

  const [searchActive, setSearchActive] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const navItems: NavigationItem[] = [
    {
      to: "/",
      options: {
        replace: false,
        state: {
          active: true,
          name:"Home"
        }
      }
    },
    {
      to: "/login",
      options: {
        replace: false,
        state: {
          active: !isLoggedIn,
          name:"Log In"
        }
      }
    },
    {
      to: "/sign-up",
      options: {
        replace: false,
        state: {
          active: !isLoggedIn,
          name:"Sign Up"
        }
      }
    },
    {
      to: "/all-posts",
      options:{
        replace: false,
        state: {
          active: isLoggedIn,
          name:"All Post"
        }
      }
    },
    {
      to: "/Add-posts",
      options: {
        replace: false,
        state: {
          active: isLoggedIn,
          name:"add Post"
        }
      }
    }
  ]
  const logUserOut = (): void => {
    authService.logUserOut().then(() => {
      dispatch(logOut())
    })
    .catch((err) => {
      console.error(err);
    })
  }

  const getUserUI = ():ReactNode =>{
      if(!isLoggedIn) {
        return(
          <div className="logged-out-container flex justify-evenly">
            <Button variant={'secondary'} onClick={() => navigate(navItems[1].to)}>Login</Button>
            <Button onClick={() => navigate(navItems[2].to)}>Register</Button>
          </div>
        );
      }
      else {
        return(
          <div className="logged-in-container h-9 flex justify-end align-middle">
            <div className="search-container">
              { 
                searchActive && 
                <div className="search-box">
                  <Input placeholder="Search..."/>
                  {/* <Cross2Icon className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground"/> */}
                </div>
              }
            </div>
            <div className="button-container flex">
              <MagnifyingGlassIcon className='w-8 h-8 mx-8' onClick={() => {setSearchActive((prev) => !prev)} }/>
              <DropdownMenu >
                <DropdownMenuTrigger>
                  <AvatarIcon className='w-8 h-8'/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>logUserOut()}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> 
            </div>
          </div>
        );
      }
  }

  return (
    <div className='main-container h-20 w-full flex px-8 justify-between'>
      <div className="left-container align-middle my-6">
        <div className="menu-contianer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <HamburgerMenuIcon className="mr-2 h-4 w-4" /> Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Groups
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Friends
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="center-container flex align-middle">
          <div className="logo-container">
              <img className='w-16 h-16' src={logo} alt="logo" onClick={() => navigate(navItems[0].to)} />
          </div>
      </div>
      <div className="right-container w-96 my-6">
        {getUserUI()}
      </div>
    </div>
  )
}

export default Header;