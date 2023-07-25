@extends('include.header')
@section('title')
Les Commandes
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
      <th>Service</th>
      <th>Nom-Prénom Professionnel</th>
      <th>Nom-Prénom Particulier</th>
      <th>Email-Tel Professionnel</th>
      <th>Email-Tel Particulier</th>
      <th>Date Realisation</th>
      <th>Date Confirmation</th>
      <th>Prix</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    @foreach ($orders as $order)
    <tr>
        <td>{{$order->subServiceName}}</td>
        <td>{{$order->pl}}-{{$order->pf}}</td>
        <td>{{$order->pal}}-{{$order->pal}}</td>
        <td>{{$order->pe}}-{{$order->pt}}</td>
        <td>{{$order->pae}}-{{$order->pat}}</td>
        <td>{{$order->dateDelivery}}</td>
        <td>{{$order->dateConfiramtion}}</td>
        <td>{{$order->subServicePrice}}</td>
        @if ($order->orderStatus == 0)
            <td style="color:yellowgreen">Pas Encore Accépter </tD>
        @else
        @if ($order->orderStatus == 1)
            <td style="color:blue">Accepteé</td>
        @else
            @if ($order->orderStatus == -1)
            <td style="color:red">Anuleé</td>
            @else
                <td style="color:green">Confirmeé</td>
            @endif
        @endif

        @endif
        @if ($order->orderStatus != 2)
            <td><form action="/confirmercommande" method="post">{{csrf_field() }}<input type="hidden" name="idOrder" value="{{$order->idOrder}}"><button type="submit" class="btn btn-primary">Confirmer</button></form></td>
        @endif


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

