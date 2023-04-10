const Joi = require('joi')
const mongoose = require('mongoose')

const QuestionnaireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: ""
    }
});

const Questionnaire = mongoose.model('questionnaires', QuestionnaireSchema);

exports.Questionnaire = Questionnaire;