import { JSX } from "react";
import { saveMemberPreferencesAction } from "@/actions/preferencesAction";
import FormWrapper from "@/components/FormWrapper";
import FormSelect from "@/components/FormSelect";
import FormSlider from "@/components/FormSlider";
import FormCheckbox from "@/components/FormCheckbox";
import FormInput from "@/components/FormInput";

export default function PreferencesFormClient(): JSX.Element {
    return (
        <div className='max-w-4xl mx-auto my-10'>
            <h2 className="text-3xl font-bold mb-6">
                Set Your Preferences
            </h2>

            <FormWrapper
                action={saveMemberPreferencesAction}
                buttonLabel='Save'
                pendingLabel='Saving...'
            >
                <div className="grid md:grid-cols-2 gap-4">
                    {/* gender */}
                    <FormSelect
                        name="preferredGender"
                        required={true}
                    />

                    {/* age range */}
                    <div className="md:mt-3">
                        <FormSlider
                            name={"ageRange"}
                            min={18}
                            max={80}
                            step={1}
                        />
                    </div>
                </div>

                {/* Lifestyle checkboxes */}
                <div className="mb-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* is smoker */}
                    <FormCheckbox
                        name={"isSmoker"}
                        label={true}
                        labelText={"Smoker"}
                    />

                    {/* is vegan */}
                    <FormCheckbox
                        name={"isVegan"}
                        label={true}
                        labelText={"Vegan"}
                    />

                    {/* has pets vegan */}
                    <FormCheckbox
                        name={"hasPets"}
                        label={true}
                        labelText={"Has Pets"}
                    />

                    {/* alcohol */}
                    <FormCheckbox
                        name={"drinksAlcohol"}
                        label={true}
                        labelText={"Drinks Alcohol"}
                    />

                    {/* exercise */}
                    <FormCheckbox
                        name={"doesExercise"}
                        label={true}
                        labelText={"Does Exercise"}
                    />
                </div>

                {/* cities */}
                <FormInput
                    name="cities"
                    type="text"
                    label={true}
                    labelText={"Preferred Cities (comma separated)"}
                    placeholder="e.g. New York, Los Angeles"
                />

                {/* states */}
                <FormInput
                    name="states"
                    type="text"
                    label={true}
                    labelText={"Preferred States (comma separated)"}
                    placeholder="e.g. NY, CA"
                />
            </FormWrapper>
        </div >
    );
}