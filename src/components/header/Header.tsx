import React, { ReactNode, useState } from 'react';
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


function Header() {

  const [searchActive, setSearchActive] = useState<boolean>(false)

  const getUserUI = ():ReactNode =>{
      if(false) {
        return(
          <div className="logged-out-container flex justify-evenly">
            <Button variant={'secondary'}>Login</Button>
            <Button>Register</Button>
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
                  <DropdownMenuItem>
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
            <img className='w-16 h-16' src={logo} alt="logo" />
          </div>
      </div>
      <div className="right-container w-96 my-6">
        {getUserUI()}
      </div>
    </div>
  )
}

export default Header;