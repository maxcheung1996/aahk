import { IonButton, IonButtons, IonCheckbox, IonContent, IonDatetime, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { add, addOutline } from 'ionicons/icons';
import { TextFieldTypes } from '@ionic/core';

const sampleFormData = {
  fields: [{
    alias: "TEXT",
    fieldName: "username",
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
    option: []
  },
  {
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
    option: []
  },
  {
    alias: "TEXT",
    fieldName: "Password",
    defaultValues: "",
    required: false,
    pattern: undefined,
    type: "password",
    value: "",
    readOnly: false,
    placeHolder: "",
    disabled: false,
    clearInput: true,
    description: "let us to hack into your account",
    option: []
  },
  {
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
    option: []
  },
  {
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
    option: []
  },
  {
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
    option: []
  },
  {
    alias: "SELECT",
    fieldName: "Supplier",
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
    option: ["SOCAM", "PEL", "SOBC", "SHUION"]
  },
  {
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
    option: []
  },
  {
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
    option: ["running", "swimming", "table tennis", "basketball", "volleyball"]
  }]
}

const Tab1: React.FC = () => {
  const { setValue, control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => { alert(JSON.stringify(data)) };
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
                let fieldTypes: TextFieldTypes
                switch (fields.type) {
                  case "text":
                    fieldTypes = "text"
                    break;
                  case "number":
                    fieldTypes = "number"
                    break;
                  case "email":
                    fieldTypes = "email"
                    break;
                  case "password":
                    fieldTypes = "password"
                    break;
                  case "date":
                    fieldTypes = "date"
                    break;
                  case "time":
                    fieldTypes = "time"
                    break;
                }


                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className='input-label' position="stacked">{fields.fieldName}</IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{ required: fields.required, pattern: fields.pattern }}
                        render={({ field }) => <IonInput className='text-input' type={fieldTypes} value={field.value} onIonChange={e => setValue(fields.fieldName, e.detail.value!)} readonly={fields.readOnly} placeholder={fields.placeHolder} disabled={fields.disabled} clearInput={fields.clearInput} />}
                      />
                      <IonLabel className='input-description' color='medium' position="stacked">{fields.description}</IonLabel>
                      <IonLabel color='danger'>{errors.TextField && "Required to fill in! "}</IonLabel>
                    </IonGrid>
                  </IonItem>
                )
              } else if (fields.alias == "SELECT") {
                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className='input-label' position="stacked">{fields.fieldName}</IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{ required: fields.required, pattern: fields.pattern }}
                        render={({ field }) => <IonSelect placeholder={fields.placeHolder} value={field.value} onIonChange={e => setValue(fields.fieldName, e.detail.value)}>
                          {fields.option.map((options, i) => {
                            return (
                              <IonSelectOption value={options}>{options}</IonSelectOption>
                            )
                          })}
                        </IonSelect>}
                      />
                      <IonLabel className='input-description' color='medium' position="stacked">{fields.description}</IonLabel>
                      <IonLabel color='danger'>{errors.TextField && "Required to fill in! "}</IonLabel>
                    </IonGrid>
                  </IonItem>
                )
              } else if (fields.alias == "CHECKBOX") {
                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className='input-label' position="stacked">{fields.fieldName}</IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{ required: fields.required, pattern: fields.pattern }}
                        render={({ field }) =>
                          <IonCheckbox
                            checked={field.value}
                            onIonChange={e => {
                              setValue(fields.fieldName, e.detail.checked)
                            }}
                          />
                        }
                      />
                      <IonLabel className='input-description' color='medium' position="stacked">{fields.description}</IonLabel>
                      <IonLabel color='danger'>{errors.TextField && "Required to fill in! "}</IonLabel>
                    </IonGrid>
                  </IonItem>
                )
              } else if (fields.alias == "RADIOGROUP") {
                return (
                  <IonItem>
                    <IonGrid>
                      <IonLabel className='input-label' position="stacked">{fields.fieldName}</IonLabel>
                      <Controller
                        name={fields.fieldName}
                        control={control}
                        defaultValue={fields.defaultValues}
                        rules={{ required: fields.required, pattern: fields.pattern }}
                        render={({ field }) =>
                          <IonRadioGroup
                            onIonChange={e => setValue(fields.fieldName, e.detail.value)}
                          >
                            {fields.option.map((options, i) => {
                              return (
                                <IonItem>
                                  <IonLabel>{options}</IonLabel>
                                  <IonRadio value={options} />
                                </IonItem>
                              )
                            })
                            }
                          </IonRadioGroup>
                        }
                      />
                      <IonLabel className='input-description' color='medium' position="stacked">{fields.description}</IonLabel>
                      <IonLabel color='danger'>{errors.TextField && "Required to fill in! "}</IonLabel>
                    </IonGrid>
                  </IonItem>
                )
              }
            })
            }
          </IonList>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonButton className='fab-button' type="submit"><IonIcon className='fab-icon' icon={addOutline} /></IonButton>
          </IonFab>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
