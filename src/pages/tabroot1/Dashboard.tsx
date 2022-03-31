import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import { deleteDatabase } from 'workbox-core/_private';
import { sqlite, existingConn } from '../../App';
import { createSchemaContacts, setContacts } from '../../Utils/encryptedSetUtils';
import { createTablesNoEncryption, dropTablesTablesNoEncryption, importTwoUsers } from '../../Utils/noEncryptionUtils';
import './Dashboard.css';
import { Dialog } from '@capacitor/dialog';

// SQLITE IMPORTS


const Dashboard: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const errMess = useRef("");
  const showAlert = async (message: string) => {
    await Dialog.alert({
      title: 'Error Dialog',
      message: message,
    });
  };

  useEffect(() => {
    const testtwodbs = async (): Promise<Boolean> => {
      setLog((log) => log.concat("* Starting testTwoDBS *\n"));
      try {

        // test the plugin with echo
        let res: any = await sqlite.echo("Hello from echo");
        if (res.value !== "Hello from echo") {
          errMess.current = `Inject Sqlite Fail"`;
          return false;
        }
        setLog((log) => log.concat("> Inject Sqlite Plugin Successful\n"));


        let closeresp = await sqlite.closeAllConnections();

        // initialize the connection
        const db = await sqlite
          .createConnection("testNew", false, "no-encryption", 1);

        let resp = await sqlite.isConnection("testNew")
        setLog((log) => log.concat("Is connenction!" + resp.result + "\n"));
        resp = await sqlite.isConnection("testNew2")
        setLog((log) => log.concat("Is connenction!" + resp.result + "\n"));

        // check if the databases exist 
        // and delete it for multiple successive tests
        await deleteDatabase(db);

        // open db testNew
        await db.open();

        setLog((log) => log.concat("> open 'NoEncryption' successful\n"));

        // Drop tables if exists
        res = await db.execute(dropTablesTablesNoEncryption);
        setLog((log) => log.concat(" Execute1 successful\n"));
        // create tables in db if not exists
        let ret = await db.execute(createTablesNoEncryption);
        setLog((log) => log.concat(" Execute2 successful\n"));


        // create synchronization table
        ret = await db.createSyncTable();
        if (ret.changes.changes < 0) {
          errMess.current = `CreateSyncTable changes < 0`;
          return false;
        }

        // set the synchronization date
        const syncDate: string = "2020-11-25T08:30:25.000Z";
        await db.setSyncDate(syncDate);

        // add two users in db
        ret = await db.execute(importTwoUsers);
        if (ret.changes.changes !== 2) {
          errMess.current = `Execute importTwoUsers changes != 2`;
          return false;
        }
        setLog((log) => log.concat(" Execute3 successful\n"));

        // select all users in db
        ret = await db.query("SELECT * FROM users;");
        if (ret.values.length !== 2 || ret.values[0].name !== "Whiteley" ||
          ret.values[1].name !== "Jones") {
          errMess.current = `Query not returning 2 values`;
          return false;
        }
        setLog((log) => log.concat(" select * successful! \n"));
        setLog((log) => log.concat(" user count: " + ret.values.length + "\n"));
        setLog((log) => log.concat(" select first user: " + ret.values[0].name + "\n"));
        setLog((log) => log.concat("* Ending testTwoDBS *\n"));
        existingConn.setExistConn(true);
        return true;
      } catch (err: any) {
        errMess.current = `${err.message}`;
        return false;
      }
    }
    if (sqlite.isAvailable) {
      testtwodbs().then(async res => {
        if (res) {
          setLog((log) => log
            .concat("\n* The set of tests was successful *\n"));
        } else {
          setLog((log) => log
            .concat("\n* The set of tests failed *\n"));
          await showAlert(errMess.current);
        }
      });
    } else {
      sqlite.getPlatform().then((ret: { platform: string; }) => {
        setLog((log) => log.concat("\n* Not available for " +
          ret.platform + " platform *\n"));
      });
    }
  }, [errMess]);

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
        <pre>
          <p>{log}</p>
        </pre>
        {errMess.current.length > 0 && <p>{errMess.current}</p>}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
