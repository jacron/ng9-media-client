import { Component, OnInit } from '@angular/core';
import {Album} from '../../../../classes/music/Album';
import {MusicService} from '../../services/music.service';
import {ActivatedRoute} from '@angular/router';
import {Person} from '../../../../classes/music/Person';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-pop-list',
  templateUrl: './pop-list.component.html',
  styleUrls: ['./pop-list.component.scss']
})
export class PopListComponent implements OnInit {
  albums: Album[];
  performer: Person;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private stateService: StateService,
  ) {
    route.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      this.fetchThings(params);
    }
  }

  afterGetPerformer(performer, count) {
    this.performer = performer;
    const {FirstName, LastName} = this.performer;
    const title = `${FirstName} ${LastName} (${count})`;
    this.stateService.setTitle(title);
  }

  afterGetAlbums(albums, id) {
    this.albums = albums;
    this.musicService.getPerformerById(id).subscribe(
      performer => this.afterGetPerformer(performer, albums.length)
    )
  }

  fetchThings(params) {
    this.albums = [];
    const id = params.id;
    this.musicService.getPerformerAlbums(id).subscribe(
      (albums: Album[]) => this.afterGetAlbums(albums, id),
      err => console.error(err),
      () => {}
    );
  }

  ngOnInit() {
  }

}
