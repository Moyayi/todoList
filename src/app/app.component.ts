import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todoList';

  list : string[] = []
  delay : Function = (ms : number) : Promise<void> => {
    return  new Promise( res => setTimeout(res,ms))
  }
  
  formTodo : FormGroup = new FormGroup({
    todo : new FormControl('')
  })

  constructor(
    private fb : FormBuilder,
    
  ){}
  
  ngOnInit(): void {
    // localStorage.removeItem("todo")
    if( localStorage.getItem("todo") !== null){
      this.list = JSON.parse(localStorage.getItem("todo")!)
      console.log(this.list)
    }
    
  }

  addTodo(  ) : void { 
    this.list.push(this.formTodo.controls['todo'].value)
    localStorage.setItem('todo', JSON.stringify(this.list))
    this.formTodo.get('todo')?.reset()
  }

  todoDone( position : number ) : void {

    console.log(position)
    this.list.splice(position,1)
    localStorage.setItem('todo', JSON.stringify(this.list))
  }
}
