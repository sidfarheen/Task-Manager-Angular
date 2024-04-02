import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  ChartOptions, ChartType } from 'chart.js';
import { ChartDataItem, ITypePercentage } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
 
  
  public typeData: Array<ITypePercentage> = [];

  public doughnutChartOptions: ChartOptions = {
      responsive: true
  };



  public doughnutChartType: ChartType = 'doughnut';
   
  chartData:Array<any> =[];
  labels:any[]=[];
  date :number[]=[];
  chartData2: ChartDataItem[] = [];
  constructor(private taskService: TaskService, private cd:ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
    
  }

  getTypePercentage() {
    const data: number[] = [];
      this.labels = [];
      let _chartData:Array<any> = new Array(this.chartData.length);
      this.typeData = [];
      const backgroundColor:string [] = [
        '#81B622',
        '#BA0F30',
        '#ffff00'
      ];
      this.taskService.getTypePercentage().subscribe(
      (d) => {
        this.typeData = d;
        d.forEach((type: ITypePercentage) => {
          data.push(type.count ); 
          this.labels.push(type.type);
        });
        _chartData.push({data, backgroundColor});
        this.chartData2 = _chartData
        console.log(this.chartData2)
        console.log(this.labels)
      },
      (error) => {
        console.error(error);
      }
    ); 

    
  }
  
  ngOnInit(): void {
  
    this.getTypePercentage();
  }

  refreshEmitter(){
      this.getTypePercentage();
  }

  getTypePercentage2() {
   
    
  }

}
