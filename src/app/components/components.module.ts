import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NgChartsModule } from 'ng2-charts';
import { ListComponent } from './task/list/list.component';
import { MaterialModule } from '../material/material.module';
import { NavigationComponent } from '../navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddComponent } from './task/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowComponent } from './task/show/show.component';


@NgModule({
  declarations: [HomeComponent, ListComponent, NavigationComponent, AddComponent, ShowComponent],
  imports: [
    CommonModule, NgChartsModule, MaterialModule, AppRoutingModule, ReactiveFormsModule
  ],
  exports: [HomeComponent, NgChartsModule, NavigationComponent, AppRoutingModule, ReactiveFormsModule, MaterialModule]
})
export class ComponentsModule { }
