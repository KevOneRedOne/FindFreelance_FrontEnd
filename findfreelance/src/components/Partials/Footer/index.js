import React from 'react';
import styles from './index.module.scss';
import Logo from '@/../public/images/logo/letter-f.png';

const Index = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer_slice}>
            <div className={styles.footer_infos}>
                <div className={styles.logo}>
                    <img src={Logo.src} alt="FindFreelance" />
                    <h2>FindFreelance</h2>
                </div>
                <div className={styles.address}>
                    <p>5 avenue Anatole France, 75007 Paris</p>
                    <br />
                    <p>01 02 03 04 05</p>
                    <br />
                    <a href="/"> Nous contacter</a>
                </div>
                <div className={styles.network_icons}>
                    <div className={styles.icon}>
                        <a href="#">
                            <img src="/images/icons/facebook.png" alt="facebook" />
                        </a>
                    </div>
                    <div className={styles.icon}>
                        <a href="#">
                            <img src="/images/icons/twitter.png" alt="twitter" />
                        </a>
                    </div>
                    <div className={styles.icon}>
                        <a href="#">
                            <img src="/images/icons/instagram.png" alt="instagram" />
                        </a>
                    </div>
                    <div className={styles.icon}>
                        <a href="#">
                            <img src="/images/icons/linkedin.png" alt="linkedin" />
                        </a>
                    </div>
                </div>
            </div>
            <section className={styles.footer_links_section}>
                <div className={styles.footer_links_column}>
                    <div className={styles.links_column_title}>
                        <h6>Entreprise</h6>
                    </div>
                    <div className={styles.links_column_content}>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Pourquoi nous ?</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Marketplace de freelances</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Solution de gestion de freelances</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Fonctionnalités produit</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Demande de démo</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.footer_links_section}>
                <div className={styles.footer_links_column}>
                    <div className={styles.links_column_title}>
                        <h6>Freelance</h6>
                    </div>
                    <div className={styles.links_column_content}>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Pourquoi nous ?</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Community & Programmes</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Solution de gestion de contrat client</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>FindFreelance Academy</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Partenaires</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.footer_links_section}>
                <div className={styles.footer_links_column}>
                    <div className={styles.links_column_title}>
                        <h6>Ressources</h6>
                    </div>
                    <div className={styles.links_column_content}>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Articles</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Guides</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Parcours de Freelance</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Aide</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.footer_links_section}>
                <div className={styles.footer_links_column}>
                    <div className={styles.links_column_title}>
                        <h6>FindFreelance </h6>
                    </div>
                    <div className={styles.links_column_content}>
                        <div className={styles.links_column_content_subtitle}>
                            <p>À propos</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Rubrique Presse</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Protections des données</p>
                        </div>
                        <div className={styles.links_column_content_subtitle}>
                            <p>Nous rejoindre</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      <div className={styles.footer_copyright}>
        © 2023 FINDFREELANCE ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Index;
