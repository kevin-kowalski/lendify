import { useEffect, useState, useContext } from "react";
import { deleteUser, getUser } from "../../service/apiService";
import { ActionButtonGroupData, User } from "../../types/types";
import { HeaderContext } from "../../contexts/HeaderContext";
import { useNavigate} from 'react-router-dom'
import { HeaderContextProps } from "../../contexts/HeaderContext";
import { useSignOut } from 'react-auth-kit'

function Profile() {

  const [userData, setUserData] = useState<User | null>(null)

  const { setActionButtonGroupData } = useContext<HeaderContextProps>(HeaderContext);
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    getUser()
      .then((user) => setUserData(user))
      .catch((error) => console.log(error));
  }, []);

  // Populate the Header component’s action button group
  useEffect(() => {
    const localActionButtonGroupData: ActionButtonGroupData = [
      [
        {
          title: 'Edit Profile',
          action: () => {
            navigate('/profile/edit');
          }
        },
        {
          title: 'Delete Profile',
          action: () => {
            deleteUser();
            navigate('/register');
          }
        },
        {
          title: 'Logout',
          action: () => {
            signOut()
            navigate('/login');
          }
        }
      ]
    ]
    setActionButtonGroupData(localActionButtonGroupData);
  }, []);

  /* Render Component */

  return (<>
    <div className="profile-page">
      <div className="button-group">
        <h1>{userData?.username}</h1>
        <div className="metadata value">¤ {userData?.credits}</div>
      </div>
      <div className="info">
        <div>{userData?.email}</div>
        <div>
          <div>{userData?.address?.streetName} {userData?.address?.streetNumber}</div>
          <div>{userData?.address?.postalCode} {userData?.address?.city}</div>
        </div>
      </div>
    </div>
  </>);
}

export default Profile;