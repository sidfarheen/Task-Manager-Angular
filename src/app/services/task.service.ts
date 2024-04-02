import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITaskTypeOperation, ITypePercentage } from '../interface/task.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpclient: HttpClient) { }
  getTaskList(): Observable<Array<ITask>> {
    return this.httpclient
      .get<ITask[]>('http://localhost:8080/api/v1/task')
      .pipe(map((d: Array<ITask>) => d));
  }
  getTaskById(id: string): Observable<ITask>{
      return this.httpclient.get<ITask>(`http://localhost:8080/api/v1/task/${id}`).pipe(map((d:ITask) => d));
  }

  getTypeOperations(): Array<ITaskTypeOperation>{
    return [{type:'done'}, {type:'todo'}, {type:'pending'}]
  }
  
  postTaskList(task: ITask) : Observable<ITask> {
    return this.httpclient.post<ITask>('http://localhost:8080/api/v1/task',task)
    .pipe(map((d : ITask) => d ));
  }

  updateTask(task:ITask, id:string): Observable<ITask>{
        return this.httpclient.put<ITask>(`http://localhost:8080/api/v1/task/${id}`, task).pipe(map((d:ITask)=> d));
  }

  deleteTask(id: string) {
    return this.httpclient.delete(`http://localhost:8080/api/v1/task/${id}`);
  }

  getTypePercentage():Observable<Array<ITypePercentage>>{
    return this.httpclient
    .get<ITypePercentage[]>(`http://localhost:8080/api/v1/task/vData/percentagecounttype`)
    .pipe(map((d: Array<ITypePercentage>)=> d));
  }
}
