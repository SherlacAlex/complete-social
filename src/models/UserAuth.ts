export interface UserAuth {
    isAuthenticated: boolean,
    isLoading: boolean,
    userData: UserDetails,
}

export interface UserDetails {
    id: string,
    name: string,
    username: string,
    email: string,
    bro: string,
    imageurl: URL,
}