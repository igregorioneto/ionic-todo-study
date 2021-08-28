import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public list: List;

  constructor(
    private readonly data: DataService,
    private alertCtrl: AlertController
  ) {
    // const tasks: Task[] = [];

    // tasks.push(new Task('Passear com o cachorro', false));
    // tasks.push(new Task('Ir ao supermercado', false));
    // tasks.push(new Task('Cortar o cabelo', true));

    // this.list = new List('Minha Lista de Tarefas', tasks);

    // this.data.save(this.list);
    this.list = this.data.get();
  }

  addTask(task: Task) {
    this.data.save(this.list);
  }

  removeTask(task: Task) {
    const index = this.list.tasks.indexOf(task);
    this.list.tasks.splice(index, 1);
    this.data.save(this.list);
  }

  toggleDone(task: Task) {
    if (!task.done) {
      task.done = true;
    } else {
      task.done = false;
    }
    this.data.save(this.list);
  }

  async showAddTask() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar nova tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Qual sua tarefa?'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Adicionar',
          handler: (data) => {
            this.list.tasks.push(new Task(data.task, false));
            this.data.save(this.list);
          }
        }
      ]
    });

    await alert.present();
  }
}

