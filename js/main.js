const yupTechnology = new Company("Company","Baku");

onload = () => {
     viewHTML();
     createTable();
}

const viewHTML = () => {

     const containerDivStart = `<main class="container">`;

     const h1 = `<h1 class="text-center display-4">${yupTechnology.name} - ${yupTechnology.branch}</h1>`

     const btnAdd = `
          <div class="float-end mb-4">
               <button class="btn btn-outline-info btn-sm" data-bs-toggle="modal" data-bs-target="#addModal">Əlavə Et</button>
          </div>
     `;

     const table = `
          <table class="table"></table>
     `;

     const addModal = createModal();

     const updateModal = editModal();

     const containerDivEnd = `</main>`;

     const html = containerDivStart + h1 + btnAdd + table + addModal + updateModal + containerDivEnd;

     document.body.innerHTML = html;
}

const createTable = () => {
     const emp = yupTechnology.getEmp();

     let table = `
          <tr>
               <th>S/N</th>
               <th>Ad Soyad</th>
               <th>Vəzifə</th>
               <th>Maaş</th>
               <th>Əməliyyat</th>
          </tr>
     `;

     for(let i = 0; i < emp.names.length; i++) {
          table += `
               <tr>
                    <td>${ i + 1 }</td>
                    <td>${ emp.names[i] }</td>
                    <td>${ emp.position[i] }</td>
                    <td>${ emp.salary[i] }</td>
                    <td>
                         <button class="btn btn-outline-danger btn-sm" onclick="deleteEmp(${i})">Sil</button>
                         <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editEmp(${i})">Redaktə Et</button>
                    </td>
               </tr>
          `;
     };

     document.querySelector("table").innerHTML = table;

}

const createModal = () => {

     const modal = `
          <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div class="modal-dialog">
                    <div class="modal-content">
                         <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Yeni işçi əlavə et</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                              <form>
                              <div class="mb-3">
                                   <label for="name" class="col-form-label">Ad Soyad:</label>
                                   <input type="text" class="form-control" id="name" />
                              </div>
                              <div class="mb-3">
                                   <label for="position" class="col-form-label">Vəzif:</label>
                                   <input type="text" class="form-control" id="position" />
                              </div>
                              <div class="mb-3">
                                   <label for="salary" class="col-form-label">Maaş:</label>
                                   <input type="number" class="form-control" id="salary" step="0.01" />
                              </div>
                              </form>
                         </div>
                         <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bağla</button>
                              <button type="button" class="btn btn-primary" onclick="addEmp()">Əlavə Et</button>
                         </div>
                    </div>
               </div>
          </div>
     `;

     return modal;

}

const addEmp = () => {

     const name = document.getElementById("name").value;
     const position = document.getElementById("position").value;
     const salary = document.getElementById("salary").value;

     yupTechnology.addEmp(name,position,salary);
     
     let modal = document.getElementById("addModal")

     let addModal = bootstrap.Modal.getOrCreateInstance(modal);

     addModal.hide();

     createTable();

}

const deleteEmp = (id) => {

     swal({
          title: "Diqqət?",
          text: "Silinən informasiya geri qaytarılmır!",
          icon: "warning",
          buttons: ["İmtina et!", "Qəbul et!"],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            yupTechnology.deleteEmp(id);
            createTable();
          } else {
            swal("İmtina edildi!");
          }
        });
}

const editModal = () => {

     const modal = `
          <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div class="modal-dialog">
                    <div class="modal-content">
                         <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Redaktə et</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                              <form>
                              <input type="hidden" id="edit-id" />
                              <div class="mb-3">
                                   <label for="edit-name" class="col-form-label">Ad Soyad:</label>
                                   <input type="text" class="form-control" id="edit-name" />
                              </div>
                              <div class="mb-3">
                                   <label for="edit-position" class="col-form-label">Vəzif:</label>
                                   <input type="text" class="form-control" id="edit-position" />
                              </div>
                              <div class="mb-3">
                                   <label for="edit-salary" class="col-form-label">Maaş:</label>
                                   <input type="number" class="form-control" id="edit-salary" step="0.01" />
                              </div>
                              </form>
                         </div>
                         <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bağla</button>
                              <button type="button" class="btn btn-primary" onclick="editDataEmp()">Əlavə Et</button>
                         </div>
                    </div>
               </div>
          </div>
     `;

     return modal;

}

const editEmp = (id) => {

     const emp = yupTechnology.viewEmp(id);

     document.getElementById("edit-id").value = id;
     document.getElementById("edit-name").value = emp.names;
     document.getElementById("edit-position").value = emp.position;
     document.getElementById("edit-salary").value = emp.salary;

}

const editDataEmp = () => {

     const id = document.getElementById("edit-id").value;
     const name = document.getElementById("edit-name").value;
     const position = document.getElementById("edit-position").value;
     const salary = document.getElementById("edit-salary").value; 

     yupTechnology.editEmp(id,name,position,salary);
 
     let modal = document.getElementById("editModal");

     let editDataEmp = bootstrap.Modal.getOrCreateInstance(modal);

     editDataEmp.hide();
     
     createTable();

}