import styles from "./index.module.scss";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import indicatifs from "@/utils/selectOptions/indicatifs.js";

const Index = ({userForm, handleChange}) => {
    return (
        <>
            <div className={styles.signup_layout__form__content_user_data}>
                <Input
                    label={"Nom"}
                    type="text"
                    name={"lastName"}
                    isRequired={true}
                    onChange={(e) => handleChange(e)}
                    value={userForm?.lastName}
                />
                <Input
                    label={"Prénom"} 
                    type="text"
                    name={"firstName"}
                    isRequired={true}
                    onChange={(e) => handleChange(e)}
                    value={userForm?.firstName}
                />
            </div>
            <div className={styles.signup_layout__form__content_user_number}>
                <Select 
                    label={"Indicateur Tél."}
                    name={"indicatif"}
                    isRequired={true}
                    onChange={(e) => {console.log(e)}}
                    options={indicatifs}
                />
                <Input
                    label={"Tel. Professionnel"}
                    type="tel"
                    name={"phoneNumber"}
                    maxlength={10}
                    isRequired={true}
                    onChange={(e) => handleChange(e)}
                    value={userForm?.phoneNumber}
                />
            </div>
            <div className={styles.signup_layout__form__content_user_email}>
                <Input
                    label={"Email Professionnel"}
                    type="email"
                    name={"email"}
                    isRequired={true}
                    onChange={(e) => handleChange(e)}
                    value={userForm?.email}
                />
                <div className={styles.signup_layout__form__content_user_pwd}>
                    <Input
                        label={"Mot de passe"}
                        type="password"
                        name={"password"}
                        isRequired={true}
                        onChange={(e) => handleChange(e)}
                        value={userForm?.password}
                    />
                    <Input
                        label={"Confirmer mot de passe"}
                        type="password"
                        name={"confirmPassword"}
                        isRequired={true}
                        onChange={(e) => {handleChange(e)}}
                        value={userForm?.repetedPassword}
                    />
                </div>
            </div>
            <div className={styles.signup_layout__form__content_user_address}>
                <Input
                    label={"Adresse"}
                    type="text"
                    name={"street"}
                    isRequired={true}
                    onChange={(e) => handleChange(e)}
                    value={userForm?.address?.street}
                />
                <div className={styles.signup_layout__form__content_user_address_zip}>
                    <Input
                        label={"Code postal"}
                        type="text"
                        name={"zipCode"}
                        isRequired={true}
                        onChange={(e) => handleChange(e)}
                        value={userForm?.address?.zipCode}
                    />
                    <Input
                        label={"Ville"}
                        type="text"
                        name={"city"}
                        isRequired={true}
                        onChange={(e) => handleChange(e)}
                        value={userForm?.address?.city}
                    />
                </div>
                <Input
                    label={"Pays"}
                    type="text"
                    name={"country"}
                    isRequired={true}
                    onChange={(e) => handleChange(e)}
                    value={userForm?.address?.country}
                />
            </div>
        </>
    );
};

export default Index;