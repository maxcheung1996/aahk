import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Account.css';
import { useAuth } from "../auth/authContext";
import { useHistory } from 'react-router';
import { Network } from '@capacitor/network';

Network.addListener('networkStatusChange', status => {
  alert('Network status changed: ' + status);
});

const logCurrentNetworkStatus = async () => {
  try {
    const status = await Network.getStatus();
    alert('Network status: ' + JSON.stringify(status));
  } catch (error) {
    alert('Get Network status error: ' + error);
  }
};

const Account: React.FC = () => {

  let { authInfo, logOut } = useAuth()!;
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton color='tertiary' onClick={logCurrentNetworkStatus}>Get Network Status</IonButton>
        <IonList>
          <IonItem>
            <IonLabel>Welcome {authInfo.user.email} !</IonLabel>
          </IonItem>
          <IonItem>
            <IonButton
              onClick={async () => {
                await logOut();
                history.replace("/login");
              }}
            >
              Logout
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Account;
