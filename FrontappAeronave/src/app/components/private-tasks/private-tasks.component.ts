import { Component, OnInit } from '@angular/core';
import {TasksService}from '../../services/tasks.service';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {
  tasksp=<any[]>([]);
  travel = {
    id:'',
    ubicacion: '',
    llegada:'',
    salida:'',
    pasajeros:''
  }
  id=0;
constructor(private tasksservices:TasksService, private authservice:AuthService) { }
 travelP(){
  this.authservice.travelP(this.travel)
  .subscribe(
    res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    }
  )
}
delete(i: any){
  this.id= this.tasksp[i]._id;
  console.log(this.tasksp[i]._id)
  this.authservice.delete(this.id)
  
  .subscribe(
    res=>{
      console.log(res);

    },
    err=>{
      console.log(err);
    }
  )
}

ngOnInit() {
  this.tasksservices.getPrivateTasks()
  .subscribe(
    res=>{
    this.tasksp=res; 
    console.log(this.tasksp)
    },
    err=> {console.log(err);
    }
  )
}
}


