import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../classes/book/book';
import {BooksService} from '../../services/books.service';
import {FormOption} from '../../../../classes/shared/FormOption';
import {Router} from '@angular/router';
import {Author} from '../../../../classes/book/author';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnChanges {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();
  @Input() discard: boolean;
  @Input() save: boolean;

  formGroup: FormGroup;
  options: FormOption[];
  filteredItems;
  authorSelectable = false;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.book) {
      this.initForm();
    }
  }

  selectAuthor(author: Author) {
    // console.log(e);
    this.formGroup.controls.author_id.setValue(author.id);
    this.formGroup.controls.author.setValue(author.first + ' ' + author.last);
  }

  afterSave(id, book: Book) {
    this.book = book;
    if (this.discard) {
      if (id) {
        this.router.navigate(['books', id]).then();
        // this.bookChange.emit(null);
      }
    } else {
      console.log(book);
      this.bookChange.emit(book);
      this.toastr.success('Het boek is opgeslagen!', this.book.title);
    }
  }

  store() {
    const b: Book = this.formGroup.value;

    const book: Book = {
      id: this.book.id,
      title: b.title,
      subtitle: b.subtitle,
      imgurl: b.imgurl,
      notes: b.notes,
      pubinfo: b.pubinfo,
      author: b.author,
      author_id: b.author_id,
      isbn: b.isbn,
      isbn13: b.isbn13,
      tags: b.tags,
      genre: b.genre,
      date: b.date,
      translator: b.translator,
      original_title: b.original_title,
    };
    this.booksService.saveBook(book).subscribe(
      response => this.afterSave(response, book)
    )
  }

  initForm() {
    const controls = {};
    this.options = [
      {
        name: 'genre',
        label: 'Genre'
      },
      {
        name: 'date',
        label: 'Date'
      },
      {
        name: 'isbn',
        label: 'isbn'
      },
      {
        name: 'isbn13',
        label: 'isbn13'
      },
      {
        name: 'title',
        label: 'Titel',
        validators: [Validators.required]
      },
      {
        name: 'subtitle',
        label: 'Subtitel'
      },
      {
        name: 'original_title',
        label: 'Originele titel'
      },
      {
        name: 'imgurl',
        label: 'URL voor afbeelding'
      },
      {
        name: 'notes',
        label: 'Aantekeningen',
      },
      {
        name: 'pubinfo',
        label: 'Uitgever'
      },
      {
        name: 'author_id',
        label: 'auteur id'
      },
      {
        name: 'author',
        label: 'auteur'
      },
      {
        name: 'translator',
        label: 'Vertaler'
      }
    ];
    this.options.forEach(option => {
      controls[option.name] = new FormControl(this.book[option.name], option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  ngOnInit() {
    this.initForm();
  }

}
