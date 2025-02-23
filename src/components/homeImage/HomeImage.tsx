import React, { useState } from 'react'
import classes from './homeImage.module.css'
import hebrew from '../../assets/images/momentumHe.jpg'
import english from '../../assets/images/momentumEn.jpg'

const HomeImage = () => {
    const [lang, setLang] = useState<"he" | "en">("en")

    return (
        <div className={classes.container}>
            <img
                src={lang === "he" ? hebrew : english}
                alt={lang === "he" ? "Hebrew Website" : "English Website"}
                className={classes.image}
            />
            <button className={classes.switchButton} onClick={() => setLang(lang === "he" ? "en" : "he")}>
                {lang === "he" ? "🇺🇸 English" : "🇮🇱 עברית"}
            </button>
        </div>
    )
}

export default HomeImage
