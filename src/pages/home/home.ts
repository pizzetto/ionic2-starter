import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Blog } from '../../models/blog';

import { BlogService } from '../../providers/blog-service';

@IonicPage({
    name: 'home',
    segment: 'home'
})
@Component({
    selector: 'page-home',

    templateUrl: 'home.html',
    providers: [BlogService]
})
export class HomePage implements OnInit {
    ngOnInit(): void {
        this.loadBlog();
    }
    public blog: Blog[];

    constructor(public navCtrl: NavController,
        public blogService: BlogService,
        private navParams: NavParams) {

    }

    loadBlog() {
        this.blogService.loadBlogs().subscribe(data => {
            this.blog = data;
        });
    }

}
