<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input type="text" placeholder="Insert a task" class="form-control"
                                           v-model="task.title"/>
                                </div>
                                <div class="form-group">
                                <textarea cols="30" rows="10" class="form-control"
                                          placeholder="Insert a description"
                                          v-model="task.description"></textarea>
                                </div>
                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="task of tasks">
                            <td>{{task.title}}</td>
                            <td>{{task.description}}</td>
                            <td>
                                <button v-on:click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                                <button @click="updateTask(task._id)" class="btn btn-secondary">Edit</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  class Task {
    constructor(title, description) {
      this.title = title;
      this.description = description
    }
  }

  export default {
    data() {
      return {
        task: new Task(),
        tasks: [],
        edit: false,
        taskToEdit: ''
      }
    },
    created() {
      this.getTasks()
    },
    methods: {
      getTasks() {
        fetch('https://scissors-app.herokuapp.com/api/tasks')
          .then(res => res.json())
          .then(data => this.tasks = data)
      },
      sendTask() {
        if (this.edit === false) {
          fetch('https://scissors-app.herokuapp.com/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.task),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              this.getTasks();
              this.task = new Task();
            });
        }
        else {
          fetch('https://scissors-app.herokuapp.com/api/tasks/' + this.taskToEdit, {
            method: 'PUT',
            body: JSON.stringify(this.task),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
          })
            .then(res => res.json())
            .then(data => {
              this.getTasks();
              this.edit = false;
              this.task = new Task()
            });
        }
      },
      deleteTask(id) {
        fetch('https://scissors-app.herokuapp.com/api/tasks/' + id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => this.getTasks());
      },
      updateTask(id) {
        fetch('https://scissors-app.herokuapp.com/api/tasks/' + id)
          .then(res => res.json())
          .then(data => {
            this.task = new Task(data.title, data.description);
            this.edit = true;
            this.taskToEdit = id
          });
      }
    }
  }
</script>