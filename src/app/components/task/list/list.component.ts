import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/app/interface/task.interface'
import { MatDialog } from '@angular/material/dialog';
import { ShowComponent } from '../show/show.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasks: Observable<Array<ITask>> = new Observable<Array<ITask>>;
  @Output() refreshEmitter = new EventEmitter<boolean>();
  constructor(private taskService: TaskService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.tasks = this.taskService.getTaskList();
  }

  onOpenDialog(task: ITask) {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasks();
      this.refreshEmitter.emit(true);
    });
  }

}
