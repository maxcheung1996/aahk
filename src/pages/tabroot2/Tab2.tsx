import {
  IonApp,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getStatusColor, getStatusText } from "../../Common/commonjs";
import { sqlExecuteStatement, sqlQuery } from "../../database";
import "./Tab2.css";

interface IActivitiesData {
  eform_result_main_guid: string;
  eform_define_guid: string;
  ref_no: string;
  proj_code: string;
  proj_guid: string;
  is_deleted: string;
  eform_status: string;
  created_by: string;
  created_date: string;
}

const Tab2: React.FC = () => {
  const [resultList, SetResultList] = useState<Array<IActivitiesData>>();
  const [loadDataStatus, SetLoadDataStatus] = useState<Boolean>(false);
  const [FilterList, SetFilterList] = useState<Array<IActivitiesData>>();

  const fetchSampleData = async () => {
    try {
      let url =
        "https://dev.socam.com/carol_32bit/api/EformResults?userid=99999999-9999-9999-9999-999999999999&projGuid=c361cacd-1af5-4b68-8da4-0a48f4ef8968";
      await fetch(url)
        .then((resp) => {
          alert(resp.json());
        })
        .catch((error) => alert(error));
    } catch (error) {
      alert(error);
    }
  };

  const reGetAllActivites = async () => {
    let resp = await sqlQuery("aahk", "SELECT * FROM eform_result_main;");
    // alert(JSON.stringify(resp.values));
    SetResultList(resp.values);
    SetFilterList(resp.values);
    SetLoadDataStatus(true);
  };

  useEffect(() => {
    const getAllActivites = async () => {
      let resp = await sqlQuery("aahk", "SELECT * FROM eform_result_main;");
      //alert("getAllActivites: ");
      // alert("resultList: " + JSON.stringify(resultList));
      if (JSON.stringify(resp.values) == JSON.stringify(resultList)) {
        //
        //alert("same");
        SetLoadDataStatus(true);
      } else {
        //alert("not same");
        SetResultList(resp.values);
        SetFilterList(resp.values);
        SetLoadDataStatus(true);
      }
      SetResultList(resp.values);
    };
    getAllActivites();
  }, [resultList]);

  const deleteAll = async () => {
    await sqlExecuteStatement("aahk", "DELETE FROM eform_result_main;");
  };

  const resetList = async (SearchText: any) => {
    try {
      let new_resultList: Array<IActivitiesData> | undefined = resultList;
      if (SearchText != "") {
        new_resultList = await resultList?.filter((list) => {
          return (
            list.ref_no.includes(SearchText) ||
            list.eform_status.includes(SearchText) ||
            list.created_by.includes(SearchText) ||
            list.proj_code.includes(SearchText) ||
            list.created_date.includes(SearchText)
          );
        });
        //alert(JSON.stringify(new_resultList));
        SetFilterList(new_resultList);
        //alert(JSON.stringify(new_resultList));
      } else {
        reGetAllActivites();
      }
    } catch (error) {
      alert("resetList Error : " + error);
    }
    //alert(JSON.stringify(new_resultList));
  };

  if (!loadDataStatus) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab 2</IonTitle>
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
            <IonTitle>Tab 2</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonButton color="danger" onClick={() => deleteAll()}>
            Delete All
          </IonButton>
          <IonButton color="primary" onClick={() => fetchSampleData()}>
            fetch test
          </IonButton>
          <IonSearchbar
            onIonChange={(e) => resetList(e.detail.value)}
            animated={true}
            placeholder="Search..."
          ></IonSearchbar>
          <IonList>
            <IonItem>All activites records:</IonItem>

            {FilterList?.map((result, index) => {
              return (
                <IonItem>
                  <IonCard button={true}>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonText color="dark">
                              Ref No. {result.ref_no}
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonText color="dark">Status: </IonText>
                            <IonText
                              color={getStatusColor(result.eform_status)}
                            >
                              {getStatusText(result.eform_status)}
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonText color="dark">
                              Created By: {result.created_by}
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonText>Proj Code: {result.proj_code}</IonText>
                          </IonCol>
                          <IonCol>
                            <IonText>Date: {result.created_date}</IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab2;
