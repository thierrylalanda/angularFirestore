import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postRef:AngularFirestoreDocument<any>;
  post$: Observable<any>;
  commentsRef:AngularFirestoreCollection<any>;
  comments$: Observable<any>;
  formValue: string;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.postRef = this.firestore.doc('posts/testPost');
    this.commentsRef = this.postRef.collection('comments' ,
    ref => ref.orderBy('createdAt', 'desc'));
    this.post$ = this.postRef.valueChanges();
    this.comments$ = this.commentsRef.valueChanges();
  }
/**
 * Adds comment
 * @description ajouter un commentaire
 */
addComment() {
this.commentsRef.add({content: this.formValue , createdAt : new Date()});
this.formValue = '';
this.loadMore();
  }

  loadMore() {
    this.comments$ = this.commentsRef.valueChanges();
  }
}
