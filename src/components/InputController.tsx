import { IonInput, IonLabel } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";

const InputController: React.FC = () => {

    const { setValue, control, formState: { errors } } = useForm();

    return (
        <>
            {/* <IonLabel className='input-label' position="stacked">TextField</IonLabel>
            <Controller
                name="TextField"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: undefined }}
                render={({ field }) => <IonInput className='text-input' type='text' value={field.value} onIonChange={e => setValue("TextField", e.detail.value!)} readonly={false} placeholder="" disabled={false} clearInput={true} autocomplete='off' />}
            />
            <IonLabel className='input-description' color='medium' position="stacked">sample description...</IonLabel>
            <IonLabel color='danger'>{errors.TextField && "Required to fill in! "}</IonLabel> */}
        </>
    )
}

export default InputController;