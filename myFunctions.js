$(document).ready(function () {
  function isValidAppName(name) {
    return /^[A-Za-z]+$/.test(name);
  }

  function isValidCompanyName(name) {
    return /^[A-Za-z\s]+$/.test(name);
  }

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  if ($('#appForm').length) {
    $('#mediaType').on('change', function () {
      if ($(this).val() === '') {
        $('#mediaPathGroup').hide();
      } else {
        $('#mediaPathGroup').show();
      }
    }).trigger('change');

    $('#appForm').on('submit', function (e) {
      e.preventDefault();

      const name = $('#appName').val().trim();
      const company = $('#companyName').val().trim();
      const url = $('#appURL').val().trim();
      const free = $('input[name="pricing"]:checked').val();
      const field = $('#appField').val();
      const desc = $('#appDesc').val().trim();
      const mediaType = $('#mediaType').val();
      const mediaPath = $('#mediaPath').val().trim();

      if (!isValidAppName(name)) {
        alert(' اسم التطبيق يجب أن يكون أحرف إنكليزية فقط بدون فراغات.');
        return;
      }

      if (!isValidCompanyName(company)) {
        alert(' اسم الشركة يجب أن تكون أحرف إنكليزية فقط.');
        return;
      }

      if (!isValidURL(url)) {
        alert(' الرابط الإلكتروني غير صالح.');
        return;
      }

      if (!free || !field || !desc) {
        alert(' يرجى تعبئة جميع الحقول المطلوبة.');
        return;
      }

      const appData = { name, company, url, field, free, desc, mediaType, mediaPath };
      apps.push(appData);

      window.location.href = 'apps.html';
    });

    $('#resetBtn').on('click', function () {
      window.location.href = 'apps.html';
    });
  }

  if ($('#appsTable').length) {
    const apps = JSON.parse(sessionStorage.getItem('dd')) || [];

    apps.forEach((app, index) => {
      const newRow = `
        <tr>
          <td>${app.name}</td>
          <td>${app.company}</td>
          <td>${app.field}</td>
          <td>${app.free}</td>
          <td><input type="checkbox" class="toggleDetails" data-id="userApp${index}"></td>
        </tr>
      `;
      $('#appsTable tbody').append(newRow);
    });

    const appDetails = {
      whatsapp: `
        <strong> الموقع الإلكتروني:</strong> <a href="http://www.whatsapp.com" target="_blank">whatsapp</a><br>
        <strong> شرح مختصر:</strong> تطبيق تواصل اجتماعي نستخدمه للتواصل مع الاشخاص بدون قيود.<br>
        <img src="pic/whatsapp.jpg"  width="200">
      `,
      facebook: `
        <strong> الموقع الإلكتروني:</strong> <a href="http://www.facebook.com" target="_blank">facebook</a><br>
        <strong> شرح مختصر:</strong> تطبيق تواصل اجتماعي يهدف لمشاركة اليوميات ويمكن اسننخداممه كإعلام<br>
        <img src="pic/facebook.png" width="200">
      `,
      instagram: `
        <strong> الموقع الإلكتروني:</strong> <a href="http://www.instagram.com" target="_blank">instagram</a><br>
        <strong> شرح مختصر:</strong> تطبيق تواصل اجتماعي يهدف لمشاركة اليوميات ويمكن اسننخداممه كإعلام و صناعة محتوى<br>
        <img src="pic/instagram.png"  width="200">
      `,
      thread: `
        <strong> الموقع الإلكتروني:</strong> <a href="http://www.threads.com" target="_blank">thread</a><br>
        <strong> شرح مختصر:</strong> تطبيق تواصل اجتماعي يهدف لمشاركة اليوميات على شكل تغريدات<br>
        <img src="pic/thread.png"  width="200">
      `,
      X: `
        <strong> الموقع الإلكتروني:</strong> <a href="https://www.x.com" target="_blank">X</a><br>
        <strong> شرح مختصر:</strong> تطبيق تواصل اجتماعي يهدف الاخبار عن طريق تغريدات<br>
        <img src="pic/X_.png"  width="200">
      `
    };

    $(document).on('change', '.toggleDetails', function () {
      const appId = $(this).data('id');
      const currentRow = $(this).closest('tr');

      $('.detailsRow').remove();
      $('.toggleDetails').not(this).prop('checked', false);

      if ($(this).is(':checked') && appDetails[appId]) {
        const detailsHtml = `
          <tr class="detailsRow">
            <td colspan="5">
              <div class="detailsContent">${appDetails[appId]}</div>
            </td>
          </tr>
        `;
        currentRow.after(detailsHtml);
      } else if ($(this).is(':checked') && appId.startsWith('userApp')) {
        const index = parseInt(appId.replace('userApp', ''));
        const app = apps[index];

        let mediaHtml = '';
// _______________

        const detailsHtml = `
          <tr class="detailsRow">
            <td colspan="5">
              <div class="detailsContent">
                <strong> الموقع الإلكتروني:</strong> <a href="${app.url}" target="_blank">${app.url}</a><br>
                <strong> شرح مختصر:</strong> ${app.desc}<br>
                ${mediaHtml}
              </div>
            </td>
          </tr>
        `;
        currentRow.after(detailsHtml);
      }
    });
  }
});
