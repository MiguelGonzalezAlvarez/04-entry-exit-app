import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styleUrls: ['./entry-exit.component.css']
})
export class EntryExitComponent {
  entryExitForm: FormGroup;
  entryExitType: String = 'entry';

  constructor(private fb: FormBuilder) {
    this.entryExitForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  saveEntryExit(): void {
    if (this.entryExitForm.invalid) return;
    
    console.log(this.entryExitForm.value);
  }

}
