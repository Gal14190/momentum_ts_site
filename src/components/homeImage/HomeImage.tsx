import classes from './homeImage.module.css'
import hebrew from '../../assets/images/momentumHe.png'
import english from '../../assets/images/momentumEn.png'
import { useState } from 'react'

const HomeImage = () => {

    const [lang, setLang] = useState<"he" | "en">("en")

    return (<div className={classes.container}>
        <button
            className={classes.switchButton}
            onClick={() => setLang(lang === "he" ? "en" : "he")}
        >
            {lang === "he" ? "🇺🇸 English" : "🇮🇱 עברית"}
        </button>
        <img
            src={lang === "he" ? hebrew : english}
            alt={lang === "he" ? "Hebrew Website" : "English Website"}
            className={classes.image}
            loading='lazy'
        />
    </div>)
}

export default HomeImage
