import { NgModule } from '@angular/core';
import { CommonModule as angularCommon } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommonRoutingModule } from './common-routing.module';

@NgModule({
  imports: [angularCommon, CommonRoutingModule, MainPageComponent]
})
export class CommonModule {}
