
//@OnlyCurrentDoc

function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Import CSV data 👉️")
    .addItem("Import from URL", "importCSVFromUrl")
    .addItem("Import from Drive", "importCSVFromDrive")
    .addToUi();
}

// Displays an alert as a Toast message
function displayToastAlert(message) {
  SpreadsheetApp.getActiveSpreadsheet().toast(message, "⚠️ Alert"); 
}

// Opens the custom dialog for column selection and row range
function openColumnSelectionDialog() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile("columnSelection")
    .setWidth(400)
    .setHeight(400)
    .setTitle("Select Columns and Rows");
    
  // Show the dialog
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Select Columns and Rows to Import');
}

// Placeholder function to import CSV files from a URL
function importCSVFromUrl() {
  var url = promptUserForInput("Please enter the URL of the CSV file:");
  openColumnSelectionDialog();
}

// Placeholder function to import CSV files from Google Drive
function importCSVFromDrive() {
  var fileName = promptUserForInput("Please enter the name of the CSV file to import from Google Drive:");
  var files = findFilesInDrive(fileName);
  if (files.length === 0) {
    displayToastAlert("No files with name \"" + fileName + "\" were found in Google Drive.");
    return;
  } else if (files.length > 1) {
    displayToastAlert("Multiple files with name " + fileName + " were found. This program does not support picking the right file yet.");
    return;
  }
  var file = files[0];
  openColumnSelectionDialog(file.getId()); // Pass the file ID to the dialog
}

// Prompts the user for input and returns their response
function promptUserForInput(promptText) {
  var ui = SpreadsheetApp.getUi();
  var prompt = ui.prompt(promptText);
  var response = prompt.getResponseText();
  return response;
}

// Returns files in Google Drive that have a certain name
function findFilesInDrive(filename) {
  var files = DriveApp.getFilesByName(filename);
  var result = [];
  while(files.hasNext())
    result.push(files.next());
  return result;
}

// Insert a new sheet and write a 2D array of data in it
function writeDataToSheet(data) {
  var ss = SpreadsheetApp.getActive();
  sheet = ss.insertSheet();
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  return sheet.getName();
}

function submitColumns(selectedColumns, rowRange) {
  // Process the data based on selected columns and row range
  var url = promptUserForInput("Please enter the URL of the CSV file:");
  var contents = Utilities.parseCsv(UrlFetchApp.fetch(url));

  // Find the starting row based on the selected column name
  var startRow = 1;
  var columnIndex = contents[0].indexOf(selectedColumns[0]);
  if (columnIndex !== -1) {
    // Use the column index to determine the starting row
    for (var i = 1; i < contents.length; i++) {
      if (contents[i][columnIndex]) {
        startRow = i + 1;
        break;
      }
    }
  }

  // Process the data based on selected columns and row range
  var selectedData = [];
  var endRow;

  if (!rowRange || rowRange.trim() === "") {
    // If rowRange is not provided, import all rows
    endRow = contents.length;
  } else {
    endRow = parseInt(rowRange.split('-')[1], 10);
  }

  if (!isNaN(startRow) && !isNaN(endRow) && startRow >= 1 && endRow <= contents.length) {
    // Include column names as the first row in selectedData
    var columnNames = [];
    for (var j = 0; j < selectedColumns.length; j++) {
      var columnIndex = contents[0].indexOf(selectedColumns[j]);
      if (columnIndex !== -1) {
        columnNames.push(contents[0][columnIndex]);
      }
    }
    selectedData.push(columnNames);

    for (var i = startRow - 1; i < endRow; i++) {
      var rowData = [];
      for (var j = 0; j < selectedColumns.length; j++) {
        var columnIndex = contents[0].indexOf(selectedColumns[j]);
        if (columnIndex !== -1) {
          rowData.push(contents[i][columnIndex]);
        }
      }
      selectedData.push(rowData);
    }

    // Write the selected data to the sheet
    var sheetName = writeDataToSheet(selectedData);
    displayToastAlert("The CSV file was successfully imported into " + sheetName + ".");
  } else {
    // Handle the case where rowRange is invalid or empty
    if (!rowRange || rowRange.trim() === "") {
      displayToastAlert("No row range specified. Importing all rows.");
    } else {
      displayToastAlert("Invalid row range. Please specify a valid range (e.g., 2-8).");
    }
    
    // Import all rows, including column names
    selectedData = contents;
    var sheetName = writeDataToSheet(selectedData);
    displayToastAlert("The CSV file was successfully imported into " + sheetName + ".");
  }
}
