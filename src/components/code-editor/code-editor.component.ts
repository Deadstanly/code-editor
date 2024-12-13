import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CodeEditorService} from '../../services/code-editor.service';
import {Subject, takeUntil, tap} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzSelectModule,
    NzTypographyModule,
    MonacoEditorModule,
    NzButtonModule
  ],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();

  public code: string = '';
  public language: string = 'python';
  public result: Record<string, string> = {
    result: '',
    result_code: ''
  };
  public error: string = '';

  public editorOptions = {
    theme: 'vs-dark',
    language: this.language,
  };
  constructor(private codeEditorService: CodeEditorService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public switchLanguage(lang: string) {
    this.language = lang;
    this.editorOptions.language = lang;
    this.code = '';
  }
  public runCode(): void {
    this.codeEditorService
      .checkCode(this.language, this.code)
      .pipe(
        tap((res: Record<string, string>[]) => {
          if (res.length > 0) {
            const result = res[0];
            this.result = {
              result: result['result'] || '',
              result_code: result['result_code'] || ''
            };
            this.error = '';
          } else {
            this.result = {
              result: '',
              result_code: ''
            };
            this.error = 'Код выполнен неправильно';
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

}
