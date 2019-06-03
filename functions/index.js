const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.aggregateComments = functions.firestore
       .document('posts/{postId}/comments/{commentId}')
       .onWrite(event => {

        const commentId = event.params.commentId;
        const postId = event.params.postId;

        const docRef = admin.firestore().collection('posts').doc(postId)

        return docRef.collection('comments').orderBy('createdAt', 'desc')
               .get()
               .then(querySnapshot => {
                   const commentCount = querySnapshot.size
                   const recentComments = []
                   querySnapshot.forEach(doc => {
                       recentComments.push(doc.data())
                   });
                   recentComments.splice(5);
                   const lastActivity = recentComments[0].createdAt
                   const data = {commentCount, recentComments, lastActivity}
                   return docRef.update(data)
               })
               .catch(err => console.log(err));
       });