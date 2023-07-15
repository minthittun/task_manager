import { action, makeAutoObservable, observable, runInAction } from 'mobx';

export default class TaskStore {
  
  assigneOptions = [
    { id: 1, name: "Mg Mg" },
    { id: 2, name: "David" },
    { id: 3, name: "Hla Hla" }
  ];

  tasks = [
    { id: "111111111111111111", task: 'Meet with CEO', description: '', assigne: 1 },
    { id: "222222222222222222", task: 'Sale team KPI', description: '', assigne: 2 },
    { id: "333333333333333333", task: 'Dashboard development', description: '', assigne: 3 },
  ];

  selectedObject = null;

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(obj){
    const index = this.tasks.findIndex(item => item.id === obj.id);
    this.tasks.splice(index, 1);
  }

  updateTask(id, field, value) {

    const updatedData = this.tasks.map(item => {
      if (item.id === id) {
        return { ...item, [field]: field === 'assigne' ? parseInt(value) : value };
      }
      return item;
    });
    this.tasks = updatedData;

  }

  setSelectedObject(task) {
    //this.selectedObject = task;
    this.selectedObject = { ...task };

  }

  updateSelectedObject(key, value) {
    this.selectedObject[key] = value;
  }

}