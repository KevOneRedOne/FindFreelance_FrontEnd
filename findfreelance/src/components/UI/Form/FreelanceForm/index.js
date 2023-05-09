import styles from "./index.module.scss";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import socialStatus from "@/utils/selectOptions/freelance.js";

const Index = ({FreelanceForm, handleChange}) => {

    return (
        <>
            <div className={styles.signup_layout__form__company}>
                <Select
                    label={"Statut social"}
                    name={"socialStatus"}
                    isRequired={true}
                    onChange={handleChange}
                    options={socialStatus}
                    value={FreelanceForm?.socialStatus}
                />
            </div>
            <Input
                label={"Raison sociale"}
                type="text"
                name={"socialReason"}
                isRequired={true}
                onChange={handleChange}
                value={FreelanceForm?.socialReason}
            />
            <div className={styles.signup_layout__form__company}>
                <Input
                    label= {"Année d'expérience"}
                    type="number"
                    name={"yearsOfExperience"}
                    isRequired={true}
                    onChange={handleChange}
                    value={FreelanceForm?.yearsOfExperience}
                />
                <Input
                    label= {"Honoraire journalier"}
                    type="number"
                    name={"dailyRate"}
                    isRequired={true}
                    onChange={handleChange}
                    value={FreelanceForm?.dailyRate}
                />
            </div>
        </>
    )
}

export default Index;