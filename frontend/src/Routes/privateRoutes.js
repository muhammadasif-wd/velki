import ChangePassword from "../Authentication/ChangePassword";
import AddDetails from "../Components/AddDetails";
import AddUserID from "../Components/AddUserID";
import CommentPost from "../Components/CommentPost";
import CommentPostInformation from "../Components/CommentPostInformation";
import NoAddDetails from "../Components/NoAddDetails";
import SingleResult from "../Components/SingleResult";
import UserDetails from "../Components/UserDetails";
import UserComments from "../Pages/UserComments";
import UserID from "../Pages/UserID";
import UserIdentity from "../Pages/UserIdentity";
import UserResult from "../Pages/UserResult";

const privateRoutes = [
  { path: "user-identity", Component: UserIdentity },
  { path: "user-id", Component: UserID },
  { path: "user-comments", Component: UserComments },
  { path: "user-result", Component: UserResult },
  { path: "user-details", Component: UserDetails },
  { path: "user-identity/user-details-add", Component: AddDetails },
  { path: "user-identity/no-add-user-details", Component: NoAddDetails },
  { path: "user-id/user-id-add", Component: AddUserID },
  { path: "user-comments/user-comments-post-add", Component: CommentPost },
  { path: "user-comments/:id", Component: CommentPostInformation },
  { path: "user-result/user-result-single", Component: SingleResult },
  { path: "change-password", Component: ChangePassword },
];
export default privateRoutes;
