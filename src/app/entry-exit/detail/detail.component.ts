import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EntryExit } from 'src/app/models/entry-exit.model';
import { Subscription } from 'rxjs';
import { EntryExitService } from '../../services/entry-exit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  entryExitList: EntryExit[] = [];
  entryExitListSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private entryExitService: EntryExitService) { }

  ngOnInit(): void {
    this.entryExitListSubscription = this.store.select('entryExitInfo').subscribe(({ items }) => {
      this.entryExitList = items;
    });
  }

  ngOnDestroy(): void {
    this.entryExitListSubscription.unsubscribe();
  }

  deleteEntryExit(entryExitId?: string): void {
    this.entryExitService
      .deleteEntryExit(entryExitId ?? '')
      .then(
        () => Swal.fire('Deleted', 'Item deleted', 'success'),
        () => Swal.fire('Error', 'Item could not be deleted', 'error')
      );
  }

}
