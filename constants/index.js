import { Home, User, Heart, UserPlus, Users, Settings } from "lucide-react"

export const siderbarLinks=[
    {
        icon: <Home/>,
        route: "/",
        label:"Home"
    },
    {
        icon: <User/>,
        route: "/profile",
        label:"My profile"
    },
    {
        icon: <Heart />,
        route: "/activities",
        label:"My activities"
    },
    {
        icon:<UserPlus/>,
        route: "/add-friends",
        label:"Add friends"
    },
    {
        icon: <Users/>,
        route: "/groups",
        label:"My groups"
    },
    {
        icon: <Settings/>,
        route: "/manage-account",
        label:"Manage account"
    },
]

