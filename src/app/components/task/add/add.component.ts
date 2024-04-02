import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ITaskTypeOperation } from '../../../interface/task.interface';

@Component({
  selector: 'app-add', 
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  taskType:Array<ITaskTypeOperation> =[];

  constructor(private fb: FormBuilder, private taskService:TaskService, private router:Router) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required]
    })
     this.taskType = this.taskService.getTypeOperations();
  }

  addTask(){
   this.taskService.postTaskList(this.taskForm.value).subscribe((d)=> { console.log(d);
  this.router.navigateByUrl("/");}
   ,   error => {
    console.error(error);
   });
  }

}
