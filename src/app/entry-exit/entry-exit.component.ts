import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntryExitService } from '../services/entry-exit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styleUrls: ['./entry-exit.component.css']
})
export class EntryExitComponent {
  entryExitForm: FormGroup;
  entryExitType = 'entry';

  constructor(private fb: FormBuilder, private EntryExitService: EntryExitService) {
    this.entryExitForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  saveEntryExit(): void {
    if (this.entryExitForm.invalid) return;

    const { description, amount } = this.entryExitForm.value;
    const entryExit = { description, amount, type: this.entryExitType };

    this.EntryExitService.createEntryExit(entryExit)
      .then(
        () => {
          Swal.fire('Register added', description, 'success');
          this.entryExitForm.reset();
        },
        (error) => Swal.fire('Error', error.message, 'error')
      );
  }

}
