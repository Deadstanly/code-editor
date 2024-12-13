import { Component } from '@angular/core';
import {CodeEditorComponent} from '../components/code-editor/code-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CodeEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'code-editor';
}
