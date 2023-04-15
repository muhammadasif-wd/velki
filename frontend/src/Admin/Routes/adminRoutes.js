import Lottery from "../Pages/Lottery";
import LotteryManage from "../Pages/LotteryManage";
import ManagePostComment from "../Pages/ManagePostComment";
import PostComment from "../Pages/PostComment";
import UserIdentity from "../Pages/UserIdentity";

export const adminRoutes =
    [
        { path: "/user-identity", Component: UserIdentity },
        { path: "/post-comment", Component: PostComment },
        { path: "/post-comment/show-all", Component: ManagePostComment },
        { path: "/lottery", Component: Lottery },
        { path: "/lottery/show-all", Component: LotteryManage }
    ]