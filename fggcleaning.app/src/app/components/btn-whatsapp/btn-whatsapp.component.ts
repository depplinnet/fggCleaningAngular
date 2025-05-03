import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

export interface DialogData {
  message: string;
  name: string;
}

@Component({
  selector: 'app-btn-whatsapp',
  standalone: true, // Si es un componente standalone
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './btn-whatsapp.component.html',
  styleUrl: './btn-whatsapp.component.css'
})
export class BtnWhatsappComponent {

  public nombreBoton = 'Contact';
  public whatsappNumber = signal('573053000000');

  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(Sheet);
  }




  

  
}



@Component({
  selector: 'sheet',
  templateUrl: 'sheet.html',
  styleUrl: 'btn-whatsapp.component.css',
  imports: [MatListModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule
  ],
})
export class Sheet {

  private _bottomSheetRef =
    inject<MatBottomSheetRef<Sheet>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public preguntaName = "What's your name ?";
  public preguntaPhone = "What's your Phone ?";
  public preguntaEmail = "What's your Email ?";

  public message = signal('');
  public name = model('');
  public phone = model('');
  public email = model('');

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
        this.name.set(result.name);
        this.phone.set(result.phone);
        this.email.set(result.email);
        console.log('Dialog result:', result);
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
    MatBottomSheetModule,
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
