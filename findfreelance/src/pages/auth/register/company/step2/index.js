import Link from "next/link";
import styles from "./../index.module.scss";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";
import Logo from "@/../public/images/logo/letter-f.png";
import image from "@/../public/images/company.jpg";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import companies from "@/utils/selectOptions/companies";

const Index = () => {

    return (
        <>
            <main className={styles.signup_layout}>
                <div className={styles.signup_layout__form}>
                    <div className={styles.signup_layout__form__header}>
                        <Link href={'/'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                        <p><Link href={'/auth/login'}>Se connecter</Link></p>
                    </div>
                    <div className={styles.signup_layout__form__content}>
                        <Title Level="h2" title="Votre entreprise" />
                        <form onSubmit={(e) => {console.log(e)}}>
                            <div className={styles.signup_layout__form__company}>
                                <Input
                                    label={"Raison sociale"}
                                    type="text"
                                    name={"companyName"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                                <Select
                                    label={"Type d'entreprise"}
                                    name={"companyType"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                    options={companies}
                                />
                            </div>
                            <Input
                                label={"SIRET (14 chiffres)"}
                                type="number"
                                name={"siret"}
                                max={99999999999999}
                                isRequired={true}
                                onChange={(e) => {console.log(e)}}
                            />

                            <Input
                                label={"Capital Social"}
                                type="number"
                                name={"siret"}
                                max={999999999999}
                                isRequired={true}
                                onChange={(e) => {console.log(e)}}
                            />
                            <div className={styles.signup_layout__form__content_user_address}>
                                <Input
                                    label={"Adresse"}
                                    type="text"
                                    name={"address"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                                <div className={styles.signup_layout__form__content_user_address_zip}>
                                    <Input
                                        label={"Code postal"}
                                        type="text"
                                        name={"postalCode"}
                                        isRequired={true}
                                        onChange={(e) => {console.log(e)}}
                                    />
                                    <Input
                                        label={"Ville"}
                                        type="text"
                                        name={"city"}
                                        isRequired={true}
                                        onChange={(e) => {console.log(e)}}
                                    />
                                </div>
                                <Input
                                    label={"Pays"}
                                    type="text"
                                    name={"country"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                            </div>
                            <div className={styles.signup_layout__form__content_btn}>
                                <Link href={'/auth/register/company/step1'}>Précédent</Link>
                                <Button 
                                    type="submit"
                                    title={"S'incrire"}
                                    className="btn__secondary"
                                    onClick={(e) => {console.log(e)}}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.signin_layout__image}>
                    <img src={image.src} alt="register_freelance" />
                </div>
            </main>
        </>
    )

};

export default Index;
