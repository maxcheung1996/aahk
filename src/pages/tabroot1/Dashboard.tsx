import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { map } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { sqlQuery } from '../../database';
import './Dashboard.css';

// SQLITE IMPORTS

interface IPerformanceData {
  id: string;
  email: string;
  name: string;
  company: string;
  size: string;
  age: string;
  last_modified: string;
}

const Dashboard: React.FC = () => {
  const [resultList, SetResultList] = useState<Array<IPerformanceData>>();
  const [loadDataStatus, SetLoadDataStatus] = useState<Boolean>(false);

  useEffect(() => {
    const queryData = async () => {
      let resp = await sqlQuery('aahk', 'SELECT * FROM users;')
      alert(JSON.parse(JSON.stringify(resp.values)))
      SetResultList(resp.values)
      SetLoadDataStatus(true)
    }
    queryData()
  }, [])


  if (!loadDataStatus) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonLoading isOpen={true} />
        </IonContent>
      </IonPage>
    );
  } else {
    alert("resultList: " + resultList)
    return (

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Dashboard</IonTitle>
            </IonToolbar>
          </IonHeader>
          {resultList?.map((v, i) => {
            alert(v)
            return (
              <IonList>
                <IonItem>
                  <IonLabel>{v.name}</IonLabel>
                </IonItem>
              </IonList>
            )
          })}
        </IonContent>
      </IonPage>
    );
  }
};

export default Dashboard;
