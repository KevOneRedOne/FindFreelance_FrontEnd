import styles from "./index.module.scss";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import companies from "@/utils/selectOptions/companies.js";

const Index = ({companyForm, handleChange}) => {
    return (
        <>
            <div className={styles.signup_layout__form__company}>
                <Input
                    label={"Raison sociale"}
                    type="text"
                    name={"socialReason"}
                    isRequired={true}
                    onChange={handleChange}
                    value={companyForm?.socialReason}
                />
                <Select
                    label={"Type d'entreprise"}
                    name={"socialStatus"}
                    isRequired={true}
                    onChange={handleChange}
                    options={companies}
                    value={companies.value ? companies.value : companies[0].value}
                />
            </div>
            <Input
                label={"SIRET (14 chiffres)"}
                type="number"
                name={"siret"}
                max={99999999999999}
                isRequired={true}
                onChange={handleChange}
                value={companyForm?.siret}
            />
            <Input
                label={"Capital Social"}
                type="number"
                name={"socialCapital"}
                isRequired={true}
                onChange={handleChange}
                value={companyForm?.socialCapital}
            />
            <div className={styles.signup_layout__form__content_user_address}>
                <Input
                    label={"Adresse"}
                    type="text"
                    name={"street"}
                    isRequired={true}
                    onChange={handleChange}
                    value={companyForm?.address?.street}
                />
                <div className={styles.signup_layout__form__content_user_address_zip}>
                    <Input
                        label={"Code postal"}
                        type="text"
                        name={"zipCode"}
                        isRequired={true}
                        onChange={handleChange}
                        value={companyForm?.address?.zipCode}
                    />
                    <Input
                        label={"Ville"}
                        type="text"
                        name={"city"}
                        isRequired={true}
                        onChange={handleChange}
                        value={companyForm?.address?.city}
                    />
                </div>
                <Input
                    label={"Pays"}
                    type="text"
                    name={"country"}
                    isRequired={true}
                    onChange={handleChange}
                    value={companyForm?.address?.country}
                />
            </div>

        </>
    );
};

export default Index;