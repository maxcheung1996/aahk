import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Forms.css';
import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';
import { camera } from 'ionicons/icons';
import { sqlite } from '../../App';
import { sqlExecuteStatement, sqlQuery } from '../../database';
import { createTablesNoEncryption, deleteAllPhotoSQL } from '../../Utils/noEncryptionUtils';

const PHOTO_STORAGE = 'photos';

interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

interface PhotoObject {
  id: string;
  fileName: string;
  base64: string;
  last_modified: string;
}






const Forms: React.FC = () => {
  const [resultList, SetResultList] = useState<Array<PhotoObject>>();
  const [loadDataStatus, SetLoadDataStatus] = useState<Boolean>(false);
  const fileName = new Date().getTime() + '.jpeg';
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const getPhoto = async () => {
    let resp = await sqlQuery("aahk", `SELECT * FROM com_file;`)
    SetResultList(resp.values)
    SetLoadDataStatus(true)
  }

  useEffect(() => {
    getPhoto()
  }, [])

  const deleteAllPhoto = async () => {
    await sqlExecuteStatement("aahk", deleteAllPhotoSQL)
    getPhoto()
  }

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const savedFileImage = await savePicture(photo, fileName);
    const newPhotos = [
      savedFileImage,
      ...photos,
    ];
    setPhotos(newPhotos);
    getPhoto();
  };

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    const base64Data = await base64FromPath(photo.webPath!);
    let isDBConnected = await sqlite.isConnection("aahk")
    if (isDBConnected.result) {
      await sqlExecuteStatement("aahk", createTablesNoEncryption)
      await sqlExecuteStatement("aahk", `INSERT INTO com_file (fileName, base64) VALUES ("${fileName}","${base64Data}");`)
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string');
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  if (!loadDataStatus) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Forms</IonTitle>
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
            <IonTitle>Forms</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Forms</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow>
              <IonButton color="success" onClick={() => getPhoto()}>Reload Photo list</IonButton>
              <IonButton color="danger" onClick={() => deleteAllPhoto()}>Delete All Photo</IonButton>
            </IonRow>
          </IonGrid>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
          <IonGrid>
            <IonRow>
              {/* {photos.map((photo, index) => (
                <IonCol size="6" key={index}>
                  <IonImg src={photo.webviewPath} />
                </IonCol>
              ))} */}
              {resultList?.map((v, i) => {
                return (
                  <IonCol size="6" key={i}>
                    <IonImg src={v.base64} />
                  </IonCol>
                  // <IonItem>
                  //   <IonImg src={v.base64}></IonImg>
                  //   <IonLabel>{v.base64}</IonLabel>
                  // </IonItem>
                )
              })}
            </IonRow>
          </IonGrid>
          <IonList>
            {/* {resultList?.map((v, i) => {
              return (
                <IonItem>
                  <IonImg src={v.base64}></IonImg>
                  <IonLabel>{v.base64}</IonLabel>
                </IonItem>
              )
            })} */}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
};

export default Forms;
