import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Movie} from '../../../../classes/movies/Movie';
import {MoviesService} from '../../services/movies.service';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-movies-recently-played',
  templateUrl: './movies-recently-played.component.html',
  styleUrls: ['./movies-recently-played.component.scss']
})
export class MoviesRecentlyPlayedComponent implements OnInit, OnDestroy {
  @Input() wrap: boolean;
  @Input() more: boolean;
  @Input() count: number;

  movies: Movie[];
  globalListenScrollFunc: Function;
  pageNr = 1;
  delta = 1860;  // inductief berekend

  constructor(
    private moviesService: MoviesService,
    private stateService: StateService,
    private renderer: Renderer2,
  ) { }

  getMovies() {
    this.moviesService.getRecentlyPlayedMovies(this.pageNr, this.count).subscribe(
      (films: Movie[]) => this.movies = films
    );
  }

  nextPage() {
    // console.log('in next page!');
    this.pageNr++;
    this.moviesService.getRecentlyPlayedMovies(this.pageNr, this.count).subscribe(
      (films: Movie[]) => this.movies = this.movies.concat(films)
    );
  }

  handleScrollable(e) {
    const el = e.srcElement.scrollingElement;
    if (el.scrollTop > el.scrollHeight - this.delta) {
      this.nextPage();
    }
  }

  ngOnDestroy() {
    if (!this.more) {
      this.globalListenScrollFunc();
    }
  }

  initStandalone() {
    this.globalListenScrollFunc = this.renderer.listen(
      'document', 'scroll', (event) =>
        this.handleScrollable(event)
    );
    this.stateService.setTitle('Aan het bekijken');
  }

  ngOnInit() {
    if (!this.count) {
      this.count = 20;
    }
    this.getMovies();
    if (!this.more) {
      this.initStandalone();
    }
  }

}
