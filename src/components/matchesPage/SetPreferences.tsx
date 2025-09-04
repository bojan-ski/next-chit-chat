import { JSX } from "react";
import { fetchPreferencesAction, saveMemberPreferencesAction } from "@/actions/preferencesAction";
import { MemberPreferences } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormWrapper from "../FormWrapper";
import FormSelect from "../FormSelect";
import FormSlider from "../FormSlider";
import FormCheckbox from "../FormCheckbox";
import FormInput from "../FormInput";

async function SetPreferences(): Promise<JSX.Element> {
    const userPreferences: MemberPreferences | null = await fetchPreferencesAction();

    return (
        <section className='mb-5 pb-5 border-b border-[#E5C6AC]'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='text-sm font-semibold rounded-md text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white cursor-pointer'>
                        Set Member Preferences
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-[425px] md:max-w-4xl bg-white border-0" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className='text-3xl font-bold mb-5'>
                            Set Member Preferences
                        </DialogTitle>
                    </DialogHeader>

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
                                defaultValue={userPreferences?.preferredGender ? userPreferences?.preferredGender : ''}
                            />

                            {/* age range */}
                            <div className="md:mt-3">
                                <FormSlider
                                    name={"ageRange"}
                                    min={18}
                                    max={80}
                                    step={1}
                                    defaultValue={[userPreferences?.minAge || 18, userPreferences?.maxAge || 80]}
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
                                defaultChecked={userPreferences?.isSmoker ?? false}
                            />

                            {/* is vegan */}
                            <FormCheckbox
                                name={"isVegan"}
                                label={true}
                                labelText={"Vegan"}
                                defaultChecked={userPreferences?.isVegan ?? false}
                            />

                            {/* has pets vegan */}
                            <FormCheckbox
                                name={"hasPets"}
                                label={true}
                                labelText={"Has Pets"}
                                defaultChecked={userPreferences?.hasPets ?? false}
                            />

                            {/* alcohol */}
                            <FormCheckbox
                                name={"drinksAlcohol"}
                                label={true}
                                labelText={"Drinks Alcohol"}
                                defaultChecked={userPreferences?.drinksAlcohol ?? false}
                            />

                            {/* exercise */}
                            <FormCheckbox
                                name={"doesExercise"}
                                label={true}
                                labelText={"Does Exercise"}
                                defaultChecked={userPreferences?.doesExercise ?? false}
                            />
                        </div>

                        {/* cities */}
                        <FormInput
                            name="cities"
                            type="text"
                            label={true}
                            labelText={"Preferred Cities (comma separated)"}
                            placeholder="e.g. New York, Los Angeles"
                            defaultValue={userPreferences?.preferredCities.join(', ')}
                        />

                        {/* states */}
                        <FormInput
                            name="states"
                            type="text"
                            label={true}
                            labelText={"Preferred States (comma separated)"}
                            placeholder="e.g. NY, CA"
                            defaultValue={userPreferences?.preferredStates.join(', ')}
                        />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default SetPreferences