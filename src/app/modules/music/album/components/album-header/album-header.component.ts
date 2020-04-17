import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '../../../../../classes/music/List';
import {Album} from '../../../../../classes/music/Album';

@Component({
  selector: 'app-album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss']
})
export class AlbumHeaderComponent implements OnInit {

  @Input() list: List;
  @Input() album: Album;
  @Input() navBackwards;
  @Input() navForwards;

  @Output() toList = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() forward = new EventEmitter();
  @Output() reload = new EventEmitter();
  @Output() updateimage = new EventEmitter();

  emitToList() {
    this.toList.emit();
  }

  emitBack() {
    this.back.emit();
  }

  emitForward() {
    this.forward.emit();
  }

  emitReload(result) {
    this.reload.emit(result);
  }

  emitUpdateImage(url) {
    // console.log(url);
    this.updateimage.emit(url);
  }

  constructor() { }

  ngOnInit() {
  }

}
