import styles from "./index.module.scss";
import Title from "@/components/UI/Title";
import Logo from "../../../../public/images/logo/letter-f.png";
import Image from "../../../../public/images/BusinessPeople.jpg";
import chevronRight from "../../../../public/images/icons/chevronRight.png";
import Button from "@/components/UI/Button";


const Index = () => {

    return (
        <>
            <main className={styles.signup_layout}>
                <div className={styles.signup_layout__form}>
                    <div className={styles.signup_layout__form__header}>
                        <img src={Logo.src} loading="lazy" alt=""/>
                        {/* TODO: trouver une solution pour la redirection */}
                        <Button type="button" title="Se connecter" className="btn__primary" onClick={() => router.push("/auth/login")} />
                    </div>

                    <div className={styles.signup_layout__form__content}>
                        <Title Level="h2" title="Quelle est votre situation ?" />
                        <br />
                        <div className={styles.signup_layout__form__content__cards}>
                            <div className={styles.signup_layout__form__content__card}>
                                {/* TODO : Terminer le style des cartes */}
                                <img src="//dam.malt.com/signup/identity-client-v2" loading="lazy" alt=""/>
                                <div className="joy-choice-card__content">
                                    <div className="joy-choice-card__title">
                                        Entreprise</div>
                                    <div className="joy-choice-card__subtitle">
                                        Je recherche des freelances</div>
                                </div>
                                <img className={styles.arrow} src={chevronRight.src} loading="lazy" alt=""/>
                            </div>
                            <div className={styles.signup_layout__form__content__card}>
                                <img src="//dam.malt.com/signup/identity-freelancer-v2" loading="lazy" alt=""/>
                                <div className="joy-choice-card__content">
                                    <div className="joy-choice-card__title">
                                        Freelance</div>
                                    <div className="joy-choice-card__subtitle">
                                        Je crée mon profil</div>
                                </div>
                                <img className={styles.arrow} src={chevronRight.src} loading="lazy" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.signup_layout__image}>
                    <img src={Image.src} loading="lazy" alt=""/>
                </div>

            </main>
        </>
    )
}   

export default Index;
