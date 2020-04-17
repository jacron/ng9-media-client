import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MusicService} from '../../services/music.service';
import {Album} from '../../../../classes/music/Album';
import {SearchParams} from '../../../../classes/music/SearchParams';
import {ListService} from '../../services/list.service';
import {StorageService} from '../../../../services/storage.service';
import {KeyValue} from '@angular/common';
import {ChoiceService} from '../../services/choice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChipsService} from '../../chips/services/chips-service';
import {List} from '../../../../classes/music/List';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model = null;
  q = null;
  myControl = new FormControl();
  queryControl = new FormControl();
  chips: any[] = [];
  albums: Album[];
  params: SearchParams;
  facets: any[];
  list: List;

  @ViewChild('query') qv;
  @ViewChild('typeahead') th;

  constructor(
    private musicService: MusicService,
    private listService: ListService,
    private storageService: StorageService,
    private stateService: StateService,
    private choiceService: ChoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private chipsService: ChipsService,
  ) {
    route.params.subscribe((params: SearchParams) => {
      if (params) {
        console.log(params);
        this.fetchThings(params);
        this.params = params;
        this.storageService.storeSearchParameters(params);
        this.makeChips(params);
      }
    });
  }

  private _filter(items: any[], value: any, displayField: string): any[] {
    if (!value || typeof value !== 'string' || value.length === 0 ||
      !items) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return items.filter((option: any) => {
      const str: string = <string>option[displayField];
      return str.toLowerCase().includes(filterValue);
    });
  }

  afterGetIems(results, type) {
    const facet = this.facets[type];
    const filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(results, value, facet.displayField))
      );
    this.model = {
      placeholder: facet.name,
      filteredItems,
      displayField: facet.displayField,
      cls: facet.cls,
      type,
    };
    setTimeout(() => {
      this.th.nativeElement.focus();
    });
  }

  clearQuery() {
    this.queryControl.setValue('');
    this.qv.nativeElement.focus();
  }

  add(facet) {
    const type = facet.value;
    this.q = false;
    switch (type) {
      case 'composer':
        this.musicService.getComposers('typeahead').subscribe(
            results => this.afterGetIems(results, type));
        break;
      case 'performer':
        this.musicService.getPerformers('typeahead').subscribe(
            results => this.afterGetIems(results, type));
        break;
      case 'pop':
        this.musicService.getPerformersGenre('pop').subscribe(
          results => this.afterGetIems(results, type));
        break;
      case 'collection':
        this.musicService.getCollections().subscribe(
          results => this.afterGetIems(results, type));
        break;
      case 'tag':
        this.musicService.getTags().subscribe(
          results => this.afterGetIems(results, type));
        break;
      case 'instrument':
        this.musicService.getInstruments().subscribe(
          results => this.afterGetIems(results, type));
        break;
      case 'title':
        this.model = false;
        this.q = true;
        setTimeout(() => {
          this.qv.nativeElement.focus();
        });
        break;
    }
  }

  displayFn(val) {
    if (!this.model) {
      return null;
    }
    return val ? val[this.model.displayField] : val;
  }

  clear() {
    this.myControl.setValue(null);
  }

  clearChips() {
    this.chips = [];
    this.albums = [];
  }

  remove(chip) {
    this.chips = this.chips.filter(chippie =>
      chippie.type != chip.type && chippie.id != chip.id);
    this.getAlbums();
  }

  normParams(): SearchParams {
    const params = {
      idcomp: -1,
      idperf: -1,
      idcoll: -1,
      idtag: -1,
      idinstrument: -1,
      search: '',
    };
    this.chips.forEach(chip => {
      const facet = this.facets[chip.type];
      params[facet.idfield] = chip.id;
    });
    this.params = params;
    return params;
  }

  afterFetch(albums) {
    // console.log(albums);
    this.albums = albums;

    // voor blader-functie in details pagina
    const list = this.listService.initialize(
      albums, this.params, '/home');
    this.storageService.storeList(list);
  }

  normSearchParams(params) {
    // voorkom dat de back-end 'undefined' values krijgt
    return {
      idcomp: params.idcomp ? params.idcomp : -1,
      idperf: params.idperf ? params.idperf : -1,
      idcoll: params.idcoll ? params.idcoll : -1,
      idtag: params.idtag ? params.idtag : -1,
      idinstrument: params.idinstrument ? params.idinstrument : -1,
      search: params.search ? params.search : '',
    };
  }

  fetchThings(params: SearchParams) {
    this.albums = [];
    this.musicService.getSearchedAlbums(this.normSearchParams(params)).subscribe(
      (albums: Album[]) => this.afterFetch(albums),
      err => console.error(err),
      () => {}
    );
  }

  makeTitle() {
    let title = '';
    this.chips.forEach(chip => {
      if (title.length) {
        title += ';';
      }
      title += chip.name;
    });
    return title;
  }

  storeTitle() {
    let title =  this.makeTitle();
    if (title.length === 0) {
      title = 'music-client';
    } else {
      // this.storageService.storeListTitle(title);
      // this.musicService.addSearchToHistory(title, this.params);
    }
    if (this.list) {
      document.title = title;
      this.list.title = title;
      this.storageService.storeList(this.list);
      this.stateService.setTitle(title);
    }
  }

  getAlbums() {
    const params: SearchParams = this.normParams();
    // console.log(params);
    this.router.navigate(['/home', params])
      .then(() => this.storeTitle()
      );
  }

  makeChips(params: SearchParams) {
    // console.log('make chips');
    if (this.chips.length) {
      return;
    }
    if (!this.facets) {
      this.facets = this.choiceService.getFacets();
    }
    const newChips = this.chipsService.makeChips(params, this.facets);
    if (newChips) {
      this.chips = newChips;
    }
  }

  submitQuery() {
    const type = 'title';
    const value = this.queryControl.value;
    const facet = this.facets[type];
    this.chips = this.chips.filter(chip => chip.type != type);
    this.chips.push({
      name: value,
      cls: facet.cls,
      id: value,
      type: type,
    });
    this.getAlbums();
    this.q = null;
  }

  makeChip(val) {
    this.chips = this.chips.filter(chip => chip.type != this.model.type);
    this.chips.push({
      name: val[this.model.displayField],
      cls: this.model.cls,
      id: val.ID,
      type: this.model.type,
    });
    this.getAlbums();
    this.model = null;
  }

  rankOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number =>
    a.value.rank - b.value.rank

  ngOnInit() {
    if (!this.facets) {
      this.facets = this.choiceService.getFacets();
    }
    this.stateService.setTitle('Muziek (klassiek)');
  }

}
