class Company {
     constructor(name,branch) {
          this.name = name;
          this.branch = branch;
     }

     emp = {
          names : ["Ağabala Quluzadə", "Rüstəm Hüseynov", "Nigar Əliyeva"],
          position : ["Full Stack", "Front End", "Front End"],
          salary : [2000,1500,2500]
     };

     getEmp() {
          return this.emp;
     }

     addEmp(name,position,salary) {
          this.emp.names.push(name);
          this.emp.position.push(position);
          this.emp.salary.push(salary);
     }

     deleteEmp(id) {
          this.emp.names.splice(id,1);
          this.emp.position.splice(id,1);
          this.emp.salary.splice(id,1);
     }

     viewEmp(id) {
          let viewEmp = {
               names : this.emp.names[id],
               position : this.emp.position[id],
               salary : this.emp.salary[id]
          };
          return viewEmp;
     }

     editEmp(id,name,position,salary) {
          this.emp.names[id] = name;
          this.emp.position[id] = position;
          this.emp.salary[id] = salary;
     }

}