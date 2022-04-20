import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { map } from "ionicons/icons";
import { useEffect, useState } from "react";
import { sqlite } from "../../App";
import { sqlExecuteStatement, sqlQuery } from "../../database";
import { deleteAllUsers } from "../../Utils/noEncryptionUtils";
import "./Dashboard.css";

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
  const [text, SetText] = useState<string>("");

  useEffect(() => {
    queryData();
  }, []);

  const fetchSampleData = async () => {
    try {
      let url =
        "https://dev.socam.com/carol_32bit/api/EformResults?userid=99999999-9999-9999-9999-999999999999&projGuid=c361cacd-1af5-4b68-8da4-0a48f4ef8968";
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(function (myJson) {
          console.log(myJson);
        })
        .catch((error) => alert("CATCH ERROR: " + error));
    } catch (error) {
      alert("TRY ERROR: " + error);
    }
  };

  const queryData = async () => {
    let resp = await sqlQuery("aahk", "SELECT * FROM users;");
    SetResultList(resp.values);
    SetLoadDataStatus(true);
  };

  const addRecord = async (text: string) => {
    let isConnected = await sqlite.isConnection("aahk");
    if (isConnected.result) {
      await sqlExecuteStatement(
        "aahk",
        `INSERT INTO users (name,email,age) VALUES ("${text}","${text}.com",24);`
      );
      queryData();
    }
  };

  const deleteAllRecords = async () => {
    let isConnected = await sqlite.isConnection("aahk");
    if (isConnected.result) {
      await sqlExecuteStatement("aahk", deleteAllUsers);
      queryData();
    }
  };

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
          <IonLabel position="floating">Type here...</IonLabel>
          <IonInput
            value={text}
            onIonChange={(e: any) => {
              SetText(e.target.value);
            }}
          ></IonInput>
          <IonGrid>
            <IonRow>
              <IonButton color="success" onClick={() => addRecord(text)}>
                Add Record
              </IonButton>
              <IonButton
                color="danger"
                onClick={() => {
                  deleteAllRecords();
                }}
              >
                Delete All
              </IonButton>
              <IonButton color="primary" onClick={() => fetchSampleData()}>
                fetch test
              </IonButton>
            </IonRow>
          </IonGrid>
          {resultList?.map((v, i) => {
            return (
              <IonList>
                <IonItem>
                  <IonLabel>{v.name}</IonLabel>
                </IonItem>
              </IonList>
            );
          })}
        </IonContent>
      </IonPage>
    );
  }
};

export default Dashboard;
