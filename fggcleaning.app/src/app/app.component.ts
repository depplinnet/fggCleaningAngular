import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BtnWhatsappComponent } from './components/btn-whatsapp/btn-whatsapp.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BtnWhatsappComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fggcleaning.app';
}
