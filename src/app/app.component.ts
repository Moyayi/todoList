import { AfterViewChecked, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{
  title = 'todoList';
  firstInteraction : boolean = false;
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
    }

  }

  ngAfterViewChecked(): void {
    let theLast = (this.list.length - 1).toString()
    let testing = document.getElementById(theLast)
  
    this.effectNewElement(testing!)

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Se ha cambiado el DOM")
  }

  addTodo(  ) : void {
    this.firstInteraction = true;
    this.list.push(this.formTodo.controls['todo'].value)
    localStorage.setItem('todo', JSON.stringify(this.list))
    this.formTodo.get('todo')?.reset()
  }

  async todoDone( position : number ) : Promise<void> {
    this.firstInteraction = false;
    let elementDeleted = document.getElementById(position.toString())
    elementDeleted?.classList.add("deleteTodo")
    await this.delay(1500)
    elementDeleted?.classList.remove("deleteTodo")
    this.list.splice(position,1)
    localStorage.setItem('todo', JSON.stringify(this.list))
  }

  async effectNewElement(element : HTMLElement) : Promise<void>{
    
    if(this.firstInteraction){
      element.classList.add("addedNewTodo")
      await this.delay(1500)
      element.classList.remove("addedNewTodo")
    }
    return ;
  }
}
