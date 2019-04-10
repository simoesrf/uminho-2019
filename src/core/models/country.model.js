class CountryModel {
    constructor(id, name, locale, language, flag) {
        this._id = id;
        this._name = name;
        this._locale = locale;
        this._language = language;
        this._flag = flag;

        Object.freeze(this);
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getLocale() {
        return this._locale;
    }

    getLanguage() {
        return this._language;
    }

    getFlag() {
        return this._flag;
    }

    toObject() {
        return Object.assign({}, {
            id: this.getId(),
            name: this.getName(),
            locale: this.getLocale(),
            language: this.getLanguage(),
            flag: this.getFlag()
        });
    }
}

export { CountryModel };
