$(function () {
  getItems();
  titleNav();
  $('#result-serach').hide();

  function titleNav(){
    const titleNav = $('#title-nav');
    let textTitleNav = ['T','i','e','n','d','a'];
    let template = '';
    for (let i = 0; i < textTitleNav.length; i++) {
      setTimeout(()=>{
        console.log(i);
        template += textTitleNav[i];
        titleNav.text(template);
      },10000);
    }
  }

  gsap.to('.alert',{
    scale: 0,
    duration: 0,
    rotate: 80
  })
  function alert(m){
    $('#alert').text(m);
    let dev = gsap.timeline();
    dev.to('.alert',{
      scale: 1,
      duration: 2,
      rotate: 0,
      ease: 'ease.out'
    })
    dev.to('.alert',{
      delay: 2,
      scale: 0,
      duration: 1,
      rotate: 80,
      ease: 'ease.in'
    })
  }
  /*
   * FUNCTION AJAX
   * SHOW ITEMS
  */
  function getItems(){
    $.ajax({
      url: '/get',
      success: function(response){
        let items = response;
        let template = '';
        items.forEach(key => {
          template += `
            <tr class='row-item'>
              <td class='id'>${key.id}</td>
              <td>
                <input type='text' value='${key.name}' class='name form-control'>
              </td>
              <td>
                <input type='text' value='${key.price}' class='price form-control'>
              </td>
              <td>
                <button class='col-5 btn btn-danger delete-items bi-trash-fill'></button>
                <button class='col-5 btn btn-success update-items bi-pencil-fill'></button>
              </td>
            </tr>
          `;
        })
        $('#table-body').html(template);
        let now = gsap.timeline();
        now.from('.row-item', {
          stagger: 0.5,
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: 'elastic.out(.8, .5)'
        })
      }
    })
  }
  /*
   * FUNCTION AJAX
   * SEARCH INTES (title)
  */
  $('#inputs-search').keyup(function(){
    $.ajax({
      url: '/search',
      method: 'POST',
      data: { name: $(this).val() },
      success: function(response){
        const names = response;
        let template = '';
        if(names.length < 1){
          template = `
          <li class='text-danger lead'>
            <i class='bi-x-circle'></i>
            <span>No se Obtuvieron resultados</span>
          </li>
          `
        } else{
          names.forEach((item, i) => {
            template += `
            <li class='text-success lead'>
            <i class='bi-check-circle'></i>
            <span>${item}</span>
            </li>
            `;
          });
        }
        $('#result-serach-list').html(template);
        $('#result-serach').slideDown();
      }
    })
  })
  /*
   * FUNCTION AJAX
   * ADD ITEMS
  */
  $('#addItem').submit((e)=>{
    e.preventDefault();
    let newItemName = $('#newItemName');
    let newItemPrice = $('#newItemPrice');
     $.ajax({
       url: '/add',
       method: 'POST',
       data: {
         name: newItemName.val(),
         price: newItemPrice.val()
       },
       success: function(response){
         alert(response);
         getItems();
       }
     })
  })
  /*
   * FUNCTION AJAX
   * UPDATE ITEM
  */
  $('#table-body').on('click', '.update-items', function(){
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let name = row.find('.name');
    let price = row.find('.price');
    $.ajax({
      url: '/get/' + id,
      method: 'PUT',
      data: {
        name: name.val(),
        price: price.val()
       },
      success: function (response){
        getItems();
        alert(response);
      }
    })
  })
  /*
   * FUNCTION AJAX
   * DELETE ITEM
  */
  $('#table-body').on('click', '.delete-items', function(){
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    $.ajax({
      url: '/get/' + id,
      method: 'DELETE',
      success: function (response){
        getItems();
        alert(response);
      }
    })
  })
})
