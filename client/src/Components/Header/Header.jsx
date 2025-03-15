import styles from './Header.module.scss';

const Header = () => {
    return(
        <header className={`${styles.header}`}>
            <p>Gestionnaire de mot de passe</p>

        </header>
    )
}

export default Header;