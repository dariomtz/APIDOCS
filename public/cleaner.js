$('#btn-close').on('click', () => {
  $('#new-project-form :text').each((i ,val) => {
    $(val).val('');
  });
});