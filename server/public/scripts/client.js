console.log('js is working');

const app = angular.module('ToDoApp',[]);
app.controller('ToDoController', ['$http', function($http){
    console.log('controller is working');
    const self = this;
    self.tasks = [];
    self.addTask = function(task){
        console.log('clicked');
        $http({
            url: '/task',
            method: 'POST',
            data: task
        }).then(function(response){
            console.log('made it to POST',response);
            self.getTasks();
            self.task = null;
        }).catch(function(error){
            swal("Don't forget to fill everything out!");
            console.log('error in POST', error);
            
        })
        
    }
    self.getTasks = function(){
        $http({
            url: '/task',
            method: 'GET'
        }).then(function(response){
            console.log('made it to GET');
            console.log(response.data);
            self.tasks = response.data  
        }).catch(function(error){
            console.log('error in POST', error);
        })
    }
    self.getTasks();
   
    self.deleteTask = function (id) {
        console.log('id of task to delete', id);
        swal({
            title: "Are you sure?",
            text: "If you haven't done this you will probably forget... Otherwise great job you little go getter!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Great job! You finished a task!", {
                icon: "success",
              });
              $http({
                url: `/task/${id}`,
                method: 'DELETE'
            }).then(function (response) {
                self.getTasks();
                console.log(response);
            }).catch(function (error) {
                console.log('error response', error);
            })
            } else {
              swal("Good, you wouldn't wanna forget this!");
            }
          });
        }
      
        self.completeTask = function(task){
            $http({
                url: `/task/${task._id}`,
                method: 'PUT',
                data: {completed: !task.completed}
            }).then(function(response){
                console.log('PUT', response);
                self.getTasks();
    
            }).catch(function(error){
                console.log('error in PUT', error);
                
            })
          
        } 
        self.editTask = function(task){
            task.showEdit = !task.showEdit;
            console.log('data before being sent', task);
            $http({
                url: `/task/${task._id}`,
                method: 'PUT',
                data: task
            }).then(function(res){
                console.log('PUT Response', res);
                self.getTasks();
            }).catch(function(error){
                console.log('in PUT Error', error);
            })
        }
        self.setEdit = function(task){
            task.showEdit = !task.showEdit;
        }
 
}])
