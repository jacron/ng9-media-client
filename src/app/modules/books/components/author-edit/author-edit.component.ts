import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {
  @Input() author: Author;
  @Output() close = new EventEmitter();
  @Output() authorChange = new EventEmitter();

  editAuthor = false;
  formGroup: FormGroup;
  options: FormOption[];
  wiki;

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) {
  }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  edit() {
    this.editAuthor = !this.editAuthor;
  }

  closeEdit() {
    this.close.emit();
  }

  afterSave(id, author: Author) {
    this.author = author;
    this.toastr.success('opgeslagen!', this.author.last);
    this.authorChange.emit(author);
    this.close.emit('saved');
  }

  save() {
    const a: Author = this.formGroup.value;

    const author: Author = {
      id: this.author.id,
      first: a.first,
      last: a.last,
      born: a.born,
      died: a.died,
      country: a.country,
      imgurl: a.imgurl,
      url: a.url,
      genre: a.genre,
    };
    this.booksService.saveAuthor(author).subscribe(
      response => this.afterSave(response, author)
    )
  }

  initForm() {
    this.options = [
      {
        name: 'first',
        label: 'Voornaam',
      },
      {
        name: 'last',
        validators: [Validators.required],
        label: 'Achternaam',
      },
      {
        name: 'born',
        label: 'Geboren',
      },
      {
        name: 'died',
        label: 'Overleden',
      },
      {
        name: 'imgurl',
        label: 'Afbeeldingsurl',
      },
      {
        name: 'country',
        label: 'Land',
      },
      {
        name: 'url',
        label: 'Url',
      },
    ];
    const controls = {};
    this.options.forEach(option => {
      controls[option.name] = new FormControl(this.author[option.name], option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  ngOnInit() {
    this.initForm();
  }

}
