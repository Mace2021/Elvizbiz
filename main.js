(function ($) {
  // DOM ready
  $(function () {
    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".nav-dropdown").toggle();
      // Close one dropdown when selecting another
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $("html").click(function () {
      $(".nav-dropdown").hide();
    });
    // Toggle open and close nav styles on click
    $("#nav-toggle").click(function () {
      $("nav ul").slideToggle();
    });
    // Hamburger to X toggle
    $("#nav-toggle").click(function () {
      this.classList.toggle("active");
    });
  });
})(jQuery);
const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
 const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
 scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
 const lock = LockService.getScriptLock()
 lock.tryLock(10000)

 try {
   const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
   const sheet = doc.getSheetByName(sheetName)

   const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
   const nextRow = sheet.getLastRow() + 1

   const newRow = headers.map(function(header) {
     return header === 'Date' ? new Date() : e.parameter[header]
   })

   sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

   return ContentService
     .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
     .setMimeType(ContentService.MimeType.JSON)
 }

 catch (e) {
   return ContentService
     .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
     .setMimeType(ContentService.MimeType.JSON)
 }

 finally {
   lock.releaseLock()
 }
}
