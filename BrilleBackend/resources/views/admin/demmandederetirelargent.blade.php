@extends('include.header')
@section('title')
    Demmande
@endsection
@section('container')
<div class="container">
    <input type="text" id="search" placeholder="Search.." style="width: 100%; padding: 12px 20px; margin: 15px 0; box-sizing: border-box;margin-top:100px">
@if (Session::has('message'))
<div class="alert alert-success">
    {{Session::get('message')}}
</div>
@endif
<table id="myTable" class="styled-table">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
      <th>Banque</th>
      <th>Type Compte</th>
      <th>Numero Compte</th>
      <th>Total</th>
      <th>Status</th>
      <th>Confirmer</th>
    </tr>
  </thead>
  <tbody>
    @foreach ($users as $user)
    <tr>
        <td>{{$user->userLname}}</td>
        <td>{{$user->userFname}}</td>
        <td>{{$user->email}}</td>
        <td>{{$user->bankName}}</td>
        <td>{{$user->typeCompt}}</td>
        <td>{{$user->numCompt}}</td>

        <td>{{$user->totalWithdraw}} $</td>
        <td>{{$user->statusWithdraw}}</td>

        <td style="color: green"><form action="/cofirmerwithdraw" method="post">{{ csrf_field() }}<input type="hidden" name="idWithdraw" value="{{$user->idWithdraw}}"><button class="btn btn-primary" type="submit">Confirmer</button></form></td>


    </tr>
    @endforeach


    <!-- Add more rows as needed -->
  </tbody>
</table>
<div id="pagination"></div>
</div>



<script>

document.getElementById('search').addEventListener('keyup', function() {
    let searchValue = this.value.toLowerCase();
    let tableRows = document.getElementById('myTable').getElementsByTagName('tbody')[0].rows;
    for (let i = 0; i < tableRows.length; i++) {
        let match = false;  // Use this flag to mark if we found a match
        for (let j = 0; j < tableRows[i].cells.length; j++) {
            let cellContent = tableRows[i].cells[j].innerText.toLowerCase();
            if (cellContent.indexOf(searchValue) > -1) {
                match = true;  // If we found a match in any cell, mark it as true
                break;
            }
        }
        tableRows[i].style.display = match ? '' : 'none';  // If we found a match in any cell, display the row, otherwise hide it
    }
});
// pagination
let currentPage = 1;
let rowsPerPage = 5;

function renderTable() {
  let table = document.getElementById('myTable');
  let rows = table.tBodies[0].rows;
  let totalPages = Math.ceil(rows.length / rowsPerPage);

  // Limit the maximum visible rows
  for(let i = 0; i < rows.length; i++){
      rows[i].style.display = (i < rowsPerPage * currentPage && i >= rowsPerPage * (currentPage - 1)) ? '' : 'none';
  }

  // Render the pagination buttons
  let pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for(let i = 1; i <= totalPages; i++){
      let btn = document.createElement('button');
      btn.innerHTML = i;
      btn.onclick = function(){
          currentPage = i;
          renderTable(); // render the table again whenever a pagination button is clicked
      };
      pagination.appendChild(btn);
  }

}

// Initial render of table
renderTable();
</script>

@endsection
