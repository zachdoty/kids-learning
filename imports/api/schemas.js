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
    audio: {
        type: Object,
        label: "Text Audio",
        defaultValue: {data: null},
        optional: true,
        blackbox: true
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
        defaultValue: 'choices',
        optional: true,
    },
    text: {
        type: String,
        label: "Text",
    },
    code: {
        type: String,
        label: "Text",
        optional: true,
    },
    answer: {
        type: String,
        label: "Answer",
        optional: true,
    },
    audio: {
        type: Object,
        label: "Text Audio",
        defaultValue: {data: null},
        optional: true,
        blackbox: true
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
    audio: {
        type: Object,
        label: "Title Audio",
        defaultValue: {data: null},
        optional: true,
        blackbox: true
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
        defaultValue: true,
        optional: true
    },
});

schemas.Answers = new SimpleSchema({
    "_id": {
        type: String,
        autoValue: () => {
            return Random.id()
        }
    },
    cardId: {
        type: String,
        label: "Card Id",
    },
    userId: {
        type: String,
        label: "User Id",
    },
    questionId: {
        type: String,
        label: "Question Id",
    },
    answerId: {
        type: String,
        label: "Answer Id",
    },
    answerObj: {
        type: Object,
        label: "Answer Obj",
        optional: true,
        blackbox: true
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
});

export const Schemas = schemas;
