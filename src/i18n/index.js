export default function i18n (locale) {
    // json
    return require(`./locales/${locale}/index`).default
}
