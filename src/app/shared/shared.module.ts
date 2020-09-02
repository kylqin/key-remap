import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { IconModule } from './ng-zorro-antd-icon.module';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, TranslateModule, FormsModule, NgZorroAntdModule, IconModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NgZorroAntdModule, IconModule]
})
export class SharedModule {}
