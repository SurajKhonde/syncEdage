import i18n from 'i18n';
import path from 'path';

i18n.configure({
    locales: ["en","hn"],
    directory: path.join(__dirname, "lang"),
    defaultLocale: "en",
    header: "accept-language",
    autoReload: true,
    syncFiles: true, 
    objectNotation: true,
})
export default i18n;
