$(document).ready(function() {
  const displayData = (records, number) => {
    let data = records.slice(0, number);
    data.forEach(item => {
      $("table").append(`<tr class='data'>
        <td>${item.firstname}</td>
        <td>${item.lastname}</td>
        <td>${item.email}</td>
        <td>${item.location}</td>
        <td>${item.phone}</td>
        <td><b>Communication:</b> ${item.address.communication} 
          <br><b>Permanent:</b> ${item.address.permanent}
        </td>
        <td class='options'><button>Edit</button></td>
        <td class='options'><button class='delete' id=${item.id}>Delete</button></td>
      </tr>`);
    });
  };

  const deleteRecord = e => {
    const id = e.target.id;

    $(`#${id}`)
      .parents("tr")
      .remove();

    const records = JSON.parse(localStorage.getItem("data"));
    const newRecords = records.filter(item => item.id !== Number(id));

    localStorage.setItem("data", JSON.stringify(newRecords));
  };

  let displayNumber = 10;
  let newStudent = {};

  $.get("dummy-data.json", function(result) {
    result.forEach((item, index) => {
      item.id = index;
    });

    localStorage.setItem("data", JSON.stringify(result));

    displayData(result, displayNumber);

    $(".delete").click(deleteRecord);
  });

  $("select").change(() => {
    $(".data").remove();
    displayNumber = Number($("select").val());

    const data = JSON.parse(localStorage.getItem("data"));
    displayData(data, displayNumber);

    $(".delete").click(deleteRecord);
  });

  $(".add").change(e => {
    newStudent[e.target.name] = e.target.value;
  });

  $("form").submit(e => {
    e.preventDefault();
    $(".add").val("");
    const data = JSON.parse(localStorage.getItem("data"));
    data.push(newStudent);
    localStorage.setItem("data", JSON.stringify(data));
    newStudent = {};

    $(".data").remove();

    displayData(data, displayNumber);
    $(".delete").click(deleteRecord);
  });
});
