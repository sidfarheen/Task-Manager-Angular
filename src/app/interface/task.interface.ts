interface ITask {
    id:string,
    title:string,
    type:string,
    dueDate:Date,
    description:string
}

interface ITaskTypeOperation{
    type:string;
}

interface ITypePercentage{
    count: number;
    type:string;
}
interface ChartDataItem {
    data: number[];
    backgroundColor: string[];
}




export{ITask, ITaskTypeOperation, ITypePercentage, ChartDataItem};
