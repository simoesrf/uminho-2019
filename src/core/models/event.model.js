const EVENT_STATUS = {
    OPEN: "OPEN",
    CLOSED: "CLOSED",
};

class EventModel {
    constructor(id, name, status, startTime, competition) {
        this._id = id;
        this._name = name;
        this._status = status;
        this._startTime = new Date(startTime);
        this._competition = competition;

        Object.freeze(this);
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getStatus() {
        return this._status;
    }

    getStartTime() {
        return this._startTime;
    }

    getCompetition() {
        return this._competition;
    }

    toObject() {
        return Object.assign({}, {
            id: this.getId(),
            name: this.getName(),
            status: this.getStatus(),
            startTime: this.getStartTime().toISOString(),
            competition: this.getCompetition().toObject()
        });
    }
}

export { EventModel, EVENT_STATUS };
