import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { 
  MAT_DIALOG_DATA, // Se usa en lialog
  MatDialog, 
  MatDialogActions, 
  MatDialogClose, 
  MatDialogContent, 
  MatDialogRef, 
  MatDialogTitle 
} from '@angular/material/dialog'; // Solo necesitamos MatDialog aquí
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  message: string;
  name: string;
}

@Component({
  selector: 'app-btn-whatsapp',
  standalone: true, // Si es un componente standalone
  imports: [ 
    MatFormFieldModule, 
    MatInputModule, FormsModule, 
    MatButtonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './btn-whatsapp.component.html',
  styleUrl: './btn-whatsapp.component.css'
})
export class BtnWhatsappComponent {

  public pregunta = "What's your name ?";

  readonly message = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '90%',
      height: '600px',
      data: { name: this.name(), message: this.message() },
      // La configuración global para hasBackdrop (u otras) se aplicará aquí por defecto.
      // Si necesitas una configuración diferente para este diálogo en particular,
      // puedes agregarla aquí (ej: hasBackdrop: true).
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.message.set(result);
      }
    });
  }
}







@Component({
  selector: 'dialog',
  standalone: true, // Si es un componente standalone
  templateUrl: 'dialog.html',
  styleUrl: 'btn-whatsapp.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class Dialog {
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly message = model(this.data.message);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
