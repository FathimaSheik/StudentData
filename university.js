const mongoose = require('mongoose');

// Connect to MongoDB server and specify the database
mongoose.connect('mongodb://127.0.0.1:27017/university')
    .then(() => console.log('Database is connected'))
    .catch((e) => console.log('Not connected', e));

// Define schema for academic records
const academicRecordsSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    grades: [
        {
            subject: String,
            grade: String
        }
    ]
});

// Define schema for co-curricular activities
const coCurricularActivitiesSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    activityType: String,
    duration: String,
    achievements: String
});

// Create models for collections
const AcademicRecordsCollection = mongoose.model('AcademicRecordsCollection', academicRecordsSchema);
const CoCurricularActivitiesCollection = mongoose.model('CoCurricularActivitiesCollection', coCurricularActivitiesSchema);

// Create documents for academic records and co-curricular activities
const studentAcademicRecord = new AcademicRecordsCollection({
    studentID: '101',
    name: 'Abhi',
    grades: [
        { subject: 'English', grade: 'A' },
        { subject: 'Hindi', grade: 'B' },
        { subject: 'Telugu', grade: 'A+' }
    ]
});

const studentActivity = new CoCurricularActivitiesCollection({
    studentID: '107',
    name: 'Surya',
    activityType: 'Dancing',
    duration: '5 Years',
    achievements: 'Gold Medal'
});

// Save documents into the database
studentAcademicRecord.save()
    .then(() => console.log('Student academic record saved'))
    .catch(error => console.error('Error saving academic record:', error));

studentActivity.save()
    .then(() => console.log('Student activity saved'))
    .catch(error => console.error('Error saving activity:', error));

// CRUD Operations

// Read operation
AcademicRecordsCollection.find({ studentID: '101' })
    .then(records => console.log('Academic Records:', records))
    .catch(error => console.error('Error finding academic records:', error));

CoCurricularActivitiesCollection.find({ studentID: '107' })
    .then(activities => console.log('Co-curricular Activities:', activities))
    .catch(error => console.error('Error finding activities:', error));

// Update operation
AcademicRecordsCollection.updateOne({ studentID: '101', 'grades.subject': 'English' }, { $set: { 'grades.$.grade': 'A+' } })
    .then(() => console.log('Academic record updated'))
    .catch(error => console.error('Error updating academic record:', error));

// Delete operation
CoCurricularActivitiesCollection.deleteOne({ studentID: '107', activityType: 'Dancing' })
    .then(() => console.log('Co-curricular activity deleted'))
    .catch(error => console.error('Error deleting activity:', error));
