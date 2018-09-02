import SimpleSchema from 'simpl-schema';
const schemas = {};


schemas.Option = new SimpleSchema({
    "_id": {
        type: String,
        autoValue: () => {
            return Random.id()
        }
    },
    text: {
        type: String,
        label: "Text",
    },
    isCorrect: {
        type: Boolean,
        label: "Correct Option",
        defaultValue: false,
        optional: true
    },
    order: {
        type: Number,
        label: "Order",
        optional: true
    }
});

schemas.Question = new SimpleSchema({
    "_id": {
        type: String,
        autoValue: () => {
            return Random.id()
        }
    },
    type: {
        type: String,
        label: "Type",
    },
    text: {
        type: String,
        label: "Text",
    },
    options: {
        type: Array,
        label: "Options",
        optional: true
    },
    "options.$": {
        type: schemas.Option
    },
});

schemas.Card = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                };
            } else {
                this.unset();
            }
        }
    },
    questions: {
        type: Array,
        label: "Questions",
        optional: true
    },
    "questions.$": {
        type: schemas.Question
    },
    isLive: {
        type: Boolean,
        label: "Live",
        defaultValue: false,
        optional: true
    },
});

export const Schemas = schemas;