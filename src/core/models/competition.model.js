class CompetitionModel {
    constructor(id, name, country) {
        this._id = id;
        this._name = name;
        this._country = country;

        Object.freeze(this);
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getCountry() {
        return this._country;
    }

    toObject() {
        return Object.assign({}, {
            id: this.getId(),
            name: this.getName(),
            country: this.getCountry().toObject()
        });
    }
}

export { CompetitionModel };
