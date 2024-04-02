import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITask, ITaskTypeOperation } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  taskType: Array<ITaskTypeOperation> = [];
  taskData: ITask;
  constructor(
    public dialogRef: MatDialogRef<ShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskData = data;
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.taskType = this.taskService.getTypeOperations();
   
    this.showTask();
  }

  updateTask() {
    this.taskForm.value
    this.taskService.updateTask(this.taskForm.value, this.data.id).subscribe((d)=> {console.log(d);
    this.dialogRef.close();
  }, error=> console.error(error));

  }

  showTask() {
    this.taskService.getTaskById(this.taskData.id).subscribe( 
     (d: ITask) =>
      {
          this.taskForm.controls['title'].setValue(d.title);
          this.taskForm.controls['type'].setValue(d.type);
          this.taskForm.controls['dueDate'].setValue(new Date(d.dueDate).toISOString());
          this.taskForm.controls['description'].setValue(d.description);
      },
      error => {
        console.error(error);
      }
    )
  }

  onDeleteTask() {
    this.taskService.deleteTask(this.data.id).subscribe(
      (d) => {
        console.log(d);
        this.dialogRef.close();
      },
      (error) => console.error(error)
    );
  }
}
