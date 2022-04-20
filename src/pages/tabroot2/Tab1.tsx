import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { add, addOutline } from "ionicons/icons";
import { TextFieldTypes } from "@ionic/core";
import { sqlExecuteStatement } from "../../database";
import { sqlite } from "../../App";
import { _uuid } from "../../Common/commonjs";
import { useHistory } from "react-router-dom";

const sampleFormData = {
  fields: [
    {
      eform_result_guid: "0479EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "2F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "1",
      alias: "TEXT",
      fieldName: "created_by",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "text",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "your username to display",
      option: [],
    },
    {
      eform_result_guid: "0479EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "4F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "3",
      alias: "TEXT",
      fieldName: "project_code",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "text",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "let us to hack into your account",
      option: [],
    },
    {
      eform_result_guid: "0779EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "7F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "7",
      alias: "SELECT",
      fieldName: "eform_status",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "Select a supplier from this list?",
      option: ["WF_IN_PROGRESS", "IN_PROGRESS", "PROCESSING", "REJECT"],
    },
    {
      eform_result_guid: "0479EF78-BA73-4DD3-BFG2-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "6F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "5",
      alias: "TEXT",
      fieldName: "Date",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "date",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "What date is it?",
      option: [],
    },
    {
      eform_result_guid: "0479EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "3F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "2",
      alias: "TEXT",
      fieldName: "Email",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "email",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "use to send email to you",
      option: [],
    },
    {
      eform_result_guid: "0479EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "5F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "4",
      alias: "TEXT",
      fieldName: "Age",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "number",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "just for our interest",
      option: [],
    },
    {
      eform_result_guid: "0479EF98-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "2F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "6",
      alias: "TEXT",
      fieldName: "Time",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "time",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "What time is now?",
      option: [],
    },
    {
      eform_result_guid: "0579EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "8F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "8",
      alias: "CHECKBOX",
      fieldName: "Need us to contact you?",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "We are happy to talk to you!",
      option: [],
    },
    {
      eform_result_guid: "0479EF78-BA73-4DD3-BFE6-CFB8CE486E60",
      eform_define_guid: "B47DEC19-2060-4D8B-8E96-083BCC109774",
      eform_quest_guid: "9F8DDAA5-68DF-4C19-98DC-F8A1F2375182",
      eform_result_main_guid: "C678760B-CC9B-4C58-B845-B17C0102F66F",
      sort: "9",
      alias: "RADIOGROUP",
      fieldName: "Please select one sport to do:",
      defaultValues: "",
      required: false,
      pattern: undefined,
      type: "",
      value: "",
      readOnly: false,
      placeHolder: "",
      disabled: false,
      clearInput: true,
      description: "We are happy to talk to you!",
      option: [
        "running",
        "swimming",
        "table tennis",
        "basketball",
        "volleyball",
      ],
    },
  ],
};

const Tab1: React.FC = () => {
  const history = useHistory();

  const {
    setValue,
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    let isConnected = await sqlite.isConnection("aahk");
    if (isConnected.result) {
      await sqlExecuteStatement(
        "aahk",
        `INSERT INTO eform_result_main (
          eform_result_main_guid,
          eform_define_guid,
          ref_no,
          proj_code,
          proj_guid,
          is_deleted,
          eform_status,
          created_by,
          created_date
          ) VALUES (
            "${_uuid()}",
           "B47DEC19-2060-4D8B-8E96-083BCC109774",
           "${data.project_code}/AAHK/${
          Math.floor(Math.random() * 90000) + 10000
        }",
           "${data.project_code}",
           "AC983B28-7185-43CF-AF53-00187912BC08",
           "N",
           "${data.eform_status}",
           "${data.created_by}",
           "${data.Date}"
           );`
      );
    }
    alert(JSON.stringify(data));

    // history.push("/tabroot2/tab2");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList>
            {sampleFormData.fields.map((fields, i) => {
              let fieldName = fields.fieldName;
              if (fields.alias == "TEXT") {
                let fieldTypes: TextFieldTypes;
                switch (fields.type) {
                  case "text":
                    fieldTypes = "text";
                    break;
                  case "number":
                    fieldTypes = "number";
                    break;
                  case "email":
                    fieldTypes = "email";
                    break;
                  case "password":
                    fieldTypes = "password";
                    break;
                  case "date":
                    fieldTypes = "date";
                    break;
                  case "time":
                    fieldTypes = "time";
                    break;
                }

                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className="input-label" position="stacked">
                        {fields.fieldName}
                      </IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{
                          required: fields.required,
                          pattern: fields.pattern,
                        }}
                        render={({ field }) => (
                          <IonInput
                            className="text-input"
                            type={fieldTypes}
                            value={field.value}
                            onIonChange={(e) =>
                              setValue(fields.fieldName, e.detail.value!)
                            }
                            readonly={fields.readOnly}
                            placeholder={fields.placeHolder}
                            disabled={fields.disabled}
                            clearInput={fields.clearInput}
                          />
                        )}
                      />
                      <IonLabel
                        className="input-description"
                        color="medium"
                        position="stacked"
                      >
                        {fields.description}
                      </IonLabel>
                      <IonLabel color="danger">
                        {errors.TextField && "Required to fill in! "}
                      </IonLabel>
                    </IonGrid>
                  </IonItem>
                );
              } else if (fields.alias == "SELECT") {
                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className="input-label" position="stacked">
                        {fields.fieldName}
                      </IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{
                          required: fields.required,
                          pattern: fields.pattern,
                        }}
                        render={({ field }) => (
                          <IonSelect
                            placeholder={fields.placeHolder}
                            value={field.value}
                            onIonChange={(e) =>
                              setValue(fields.fieldName, e.detail.value)
                            }
                          >
                            {fields.option.map((options, i) => {
                              return (
                                <IonSelectOption value={options}>
                                  {options}
                                </IonSelectOption>
                              );
                            })}
                          </IonSelect>
                        )}
                      />
                      <IonLabel
                        className="input-description"
                        color="medium"
                        position="stacked"
                      >
                        {fields.description}
                      </IonLabel>
                      <IonLabel color="danger">
                        {errors.TextField && "Required to fill in! "}
                      </IonLabel>
                    </IonGrid>
                  </IonItem>
                );
              } else if (fields.alias == "CHECKBOX") {
                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className="input-label" position="stacked">
                        {fields.fieldName}
                      </IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{
                          required: fields.required,
                          pattern: fields.pattern,
                        }}
                        render={({ field }) => (
                          <IonCheckbox
                            checked={field.value}
                            onIonChange={(e) => {
                              setValue(fields.fieldName, e.detail.checked);
                            }}
                          />
                        )}
                      />
                      <IonLabel
                        className="input-description"
                        color="medium"
                        position="stacked"
                      >
                        {fields.description}
                      </IonLabel>
                      <IonLabel color="danger">
                        {errors.TextField && "Required to fill in! "}
                      </IonLabel>
                    </IonGrid>
                  </IonItem>
                );
              } else if (fields.alias == "RADIOGROUP") {
                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className="input-label" position="stacked">
                        {fields.fieldName}
                      </IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{
                          required: fields.required,
                          pattern: fields.pattern,
                        }}
                        render={({ field }) => (
                          <IonRadioGroup
                            onIonChange={(e) =>
                              setValue(fields.fieldName, e.detail.value)
                            }
                          >
                            {fields.option.map((options, i) => {
                              return (
                                <IonItem>
                                  <IonLabel>{options}</IonLabel>
                                  <IonRadio value={options} />
                                </IonItem>
                              );
                            })}
                          </IonRadioGroup>
                        )}
                      />
                      <IonLabel
                        className="input-description"
                        color="medium"
                        position="stacked"
                      >
                        {fields.description}
                      </IonLabel>
                      <IonLabel color="danger">
                        {errors.TextField && "Required to fill in! "}
                      </IonLabel>
                    </IonGrid>
                  </IonItem>
                );
              }
            })}
          </IonList>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonButton className="fab-button" type="submit">
              <IonIcon className="fab-icon" icon={addOutline} />
            </IonButton>
          </IonFab>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
