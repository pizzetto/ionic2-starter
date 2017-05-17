import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Blog } from '../models/blog';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the BlogService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BlogService {
    data;
    private blogUrl = 'http://postazamba.shakazamba.com/api/v1/blog/';

    constructor(private http: Http) {
        console.log('Hello BlogService Provider');
    }

    load() {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get('http://postazamba.shakazamba.com/api/v1/blog/index/megliopossibile-5')
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

    loadBlog(blogSlug: string): Observable<Blog> {
        return this.http.get(this.blogUrl + 'index/' + blogSlug)
            // ...and calling .json() on the response to return data
            .map(res => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    loadBlogs(): Observable<Blog[]> {
        return this.http.get(this.blogUrl + 'all')
            // ...and calling .json() on the response to return data
            .map(res => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



}
